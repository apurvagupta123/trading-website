const MOCK_STOCKS = [
    { symbol: 'AAPL', name: 'Apple Inc', price: 182.50, change: 2.5 },
    { symbol: 'GOOGL', name: 'Alphabet Inc', price: 140.25, change: -1.2 },
    { symbol: 'MSFT', name: 'Microsoft Corp', price: 378.91, change: 3.1 },
    { symbol: 'TSLA', name: 'Tesla Inc', price: 242.84, change: -2.8 },
    { symbol: 'AMZN', name: 'Amazon Inc', price: 175.43, change: 1.9 },
    { symbol: 'NVDA', name: 'NVIDIA Corp', price: 876.42, change: 5.2 },
];

document.addEventListener('DOMContentLoaded', () => {
    loadStocks(MOCK_STOCKS);
    setupSearch();
});

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
        `;
        
        grid.appendChild(card);
    });
}

function setupSearch() {
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toUpperCase().trim();
        
        if (query === '') {
            loadStocks(MOCK_STOCKS);
            return;
        }
        
        const filtered = MOCK_STOCKS.filter(stock => 
            stock.symbol.includes(query) || stock.name.toUpperCase().includes(query)
        );
        
        loadStocks(filtered);
    });
}
