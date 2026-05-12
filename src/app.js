import MarketDataService from './services/MarketDataService.js';

const STOCKS_TO_WATCH = ['AAPL', 'GOOGL', 'MSFT', 'TSLA', 'AMZN', 'NVDA'];

let allStocks = [];

document.addEventListener('DOMContentLoaded', async () => {
    await loadRealPrices();
    setupSearch();
});

async function loadRealPrices() {
    const grid = document.getElementById('stocksGrid');
    grid.innerHTML = '<div class="stock-card loading"><p>Loading real prices...</p></div>';

    try {
        const prices = await MarketDataService.getMultiplePrices(STOCKS_TO_WATCH);
        
        allStocks = prices.map(price => {
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
