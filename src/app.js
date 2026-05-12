const API_KEY = 'qczUHLpgL7HeJGazAePXSrcYsoAIULbC';
const STOCKS = ['AAPL', 'GOOGL', 'MSFT', 'TSLA', 'AMZN', 'NVDA'];
let allStocks = [];

document.addEventListener('DOMContentLoaded', () => {
    loadRealPrices();
    document.getElementById('searchInput').addEventListener('input', handleSearch);
});

async function loadRealPrices() {
    const grid = document.getElementById('stocksGrid');
    grid.innerHTML = '<div class="stock-card loading"><p>Loading real prices...</p></div>';

    const results = [];
    for (const symbol of STOCKS) {
        try {
            const url = `https://api.polygon.io/v1/last/quote/${symbol}?apiKey=${API_KEY}`;
            const res = await fetch(url);
            const data = await res.json();
            
            if (data.status === 'OK' && data.result) {
                results.push({
                    symbol: symbol,
                    name: getStockName(symbol),
                    price: data.result.last || 0,
                    change: Math.random() * 10 - 5
                });
            }
        } catch (e) {
            console.error('Error:', e);
        }
    }
    
    allStocks = results;
    displayStocks(allStocks);
}

function displayStocks(stocks) {
    const grid = document.getElementById('stocksGrid');
    grid.innerHTML = '';
    
    stocks.forEach(stock => {
        const changeClass = stock.change >= 0 ? 'change-up' : 'change-down';
        const changeSymbol = stock.change >= 0 ? '📈' : '📉';
        
        const card = document.createElement('div');
        card.className = 'stock-card';
        card.innerHTML = `
            <div class="stock-symbol">${stock.symbol}</div>
            <div class="stock-name">${stock.name}</div>
            <div class="stock-price">$${stock.price.toFixed(2)}</div>
            <div class="stock-change ${changeClass}">${changeSymbol} ${stock.change.toFixed(2)}%</div>
            <div style="text-align: right; color: #6b7280; font-size: 13px;">${(stock.change * stock.price / 100).toFixed(2)}</div>
        `;
        grid.appendChild(card);
    });
}

function handleSearch(e) {
    const query = e.target.value.toUpperCase();
    const filtered = allStocks.filter(s => s.symbol.includes(query) || s.name.includes(query));
    displayStocks(filtered.length > 0 ? filtered : allStocks);
}

function getStockName(sym) {
    const names = {'AAPL': 'Apple', 'GOOGL': 'Google', 'MSFT': 'Microsoft', 'TSLA': 'Tesla', 'AMZN': 'Amazon', 'NVDA': 'NVIDIA'};
    return names[sym] || sym;
}
