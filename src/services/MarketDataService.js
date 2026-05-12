class MarketDataService {
    constructor() {
        this.apiKey = import.meta.env.VITE_POLYGON_API_KEY;
        this.baseUrl = 'https://api.polygon.io/v1';
        this.cache = {};
        this.cacheTimeout = 60000;
    }

    async getStockPrice(symbol) {
        const cacheKey = `price_${symbol}`;
        
        if (this.cache[cacheKey] && Date.now() - this.cache[cacheKey].time < this.cacheTimeout) {
            return this.cache[cacheKey].data;
        }

        try {
            const response = await fetch(
                `${this.baseUrl}/last/quote/${symbol}?apiKey=${this.apiKey}`
            );
            
            if (!response.ok) {
                throw new Error(`API error: ${response.status}`);
            }
            
            const data = await response.json();
            
            if (data.status === 'OK' && data.result) {
                const quote = data.result;
                const priceData = {
                    symbol: symbol,
                    price: quote.last || 0,
                    bid: quote.bid || 0,
                    ask: quote.ask || 0,
                    timestamp: quote.last_updated
                };
                
                this.cache[cacheKey] = {
                    data: priceData,
                    time: Date.now()
                };
                
                return priceData;
            }
        } catch (error) {
            console.error(`Error fetching ${symbol}:`, error);
            return null;
        }
    }

    async getMultiplePrices(symbols) {
        const prices = await Promise.all(
            symbols.map(symbol => this.getStockPrice(symbol))
        );
        return prices.filter(p => p !== null);
    }
}

export default new MarketDataService();
