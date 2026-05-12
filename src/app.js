const STOCKS = [
    {symbol: 'AAPL', name: 'Apple', price: 182.50, change: 2.5},
    {symbol: 'GOOGL', name: 'Google', price: 140.25, change: -1.2},
    {symbol: 'MSFT', name: 'Microsoft', price: 378.91, change: 3.1},
    {symbol: 'TSLA', name: 'Tesla', price: 242.84, change: -2.8},
    {symbol: 'AMZN', name: 'Amazon', price: 175.43, change: 1.9},
    {symbol: 'NVDA', name: 'NVIDIA', price: 876.42, change: 5.2}
];

let allStocks = STOCKS;

document.addEventListener('DOMContentLoaded', () => {
    displayStocks(allStocks);
    document.getElementById('searchInput').addEventListener('input', handleSearch);
});

function displayStocks(stocks) {
    const grid = document.getElementById('stocksGrid');
    grid.innerHTML = '';
    stocks.forEach(stock => {
        const changeClass = stock.change >= 0 ? 'change-up' : 'change-down';
        const sym = stock.change >= 0 ? '📈' : '📉';
        const card = document.createElement('div');
        card.className = 'stock-card';
        card.innerHTML = '<div class="stock-symbol">' + stock.symbol + '</div><div class="stock-name">' + stock.name + '</div><div class="stock-price">$' + stock.price.toFixed(2) + '</div><div class="stock-change ' + changeClass + '">' + sym + ' ' + stock.change.toFixed(2) + '%</div>';
        grid.appendChild(card);
    });
}

function handleSearch(e) {
    const q = e.target.value.toUpperCase();
    const f = allStocks.filter(s => s.symbol.includes(q));
    displayStocks(f.length > 0 ? f : allStocks);
}
