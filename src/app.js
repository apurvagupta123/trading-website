const API_KEY = 'qczUHLpgL7HeJGazAePXSrcYsoAIULbC';
const STOCKS_TO_WATCH = ['AAPL', 'GOOGL', 'MSFT', 'TSLA', 'AMZN', 'NVDA'];

let allStocks = [];

document.addEventListener('DOMContentLoaded', async () => {
    await loadRealPrices();
    setupSearch();
});

async function getStockPrice(symbol) {
    try {
        const response = await fetch(
            `https://api.polygon.io/v1/last/quote/${symbol}?apiKey=${API_KEY}`
        );
        const data = await response.json();
        
        if (data.status === 'OK' && data.result) {
            const quote = data.result;
            return {
                symbol: symbol,
                price: quote.last || 0,
                bid: quote.bid || 0,
                ask: quote.ask || 0
            };
        }
        return null;
    } catch (error) {
        console.error(`Error fetching ${symbol}:`, error);
        return null;
    }
}

async function loadRealPrices() {
    const grid = document.getElementById('stocksGrid');
    grid.innerHTML = '<div class="stock-card loading"><p>Loading real prices...</p></div>';

    try {
        const prices = await Promise.all(
            STOCKS_TO_WATCH.map(symbol => getStockPrice(symbol))
        );
        
        allStocks = prices.filter(p => p !== null).map(price => {
            const previousPrice = price.price * 0.98;
            const change = ((price.price - previousPrice) / previousPrice) * 100;
            
            return {
                symbol: price.symbol,
                name: getStockName(price.symbol),
                price: price.price,
                change: parseFloat(change.toFixed(2))
            };
        });

        loadStocks(allStocks);
    } catch (error) {
        console.error('Error loading prices:', error);
        grid.innerHTML = '<div class="stock-card loading"><p>Error loading prices. Please refresh.</p></div>';
    }
}

function loadStocks(stocks) {
    const grid = document.getElementById('stocksGrid');
    grid.innerHTML = '';

    if (stocks.length === 0) {
        grid.innerHTML = '<div class="stock-card loading"><p>No stocks found</p></div>';
        return;
    }

    stocks.forEach(stock => {
        const card = document.createElement('div');
        card.className = 'stock-card';
        
        const changeClass = stock.change >= 0 ? 'change-up' : 'change-down';
        const changeSymbol = stock.change >= 0 ? '📈' : '📉';
        
        card.innerHTML = `
            <div class="stock-symbol">${stock.symbol}</div>
            <div class="stock-name">${stock.name}</div>
            <div class="stock-price">$${stock.price.toFixed(2)}</div>
            <div class="stock-change ${changeClass}">
                ${changeSymbol} ${stock.change > 0 ? '+' : ''}${stock.change.toFixed(2)}%
            </div>
            <div style="text-align: right; color: #6b7280; font-size: 13px;">
                ${Math.abs(stock.change * stock.price / 100).toFixed(2)}
            </div>
        `;
        
        grid.appendChild(card);
    });
}

function setupSearch() {
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toUpperCase().trim();
        
        if (query === '')
eof
