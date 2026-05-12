var stocks = [{symbol:'AAPL',name:'Apple Inc',price:182.50,change:2.5,pe:28.5,cap:'2.8T',high:190,low:175},{symbol:'GOOGL',name:'Alphabet Inc',price:140.25,change:-1.2,pe:22.1,cap:'1.4T',high:145,low:135},{symbol:'MSFT',name:'Microsoft',price:378.91,change:3.1,pe:32.4,cap:'2.8T',high:385,low:365},{symbol:'TSLA',name:'Tesla Inc',price:242.84,change:-2.8,pe:45.2,cap:'760B',high:250,low:235},{symbol:'AMZN',name:'Amazon Inc',price:175.43,change:1.9,pe:50.3,cap:'1.8T',high:180,low:170},{symbol:'NVDA',name:'NVIDIA',price:876.42,change:5.2,pe:55.1,cap:'2.1T',high:890,low:850}];

var portfolio = { cash: 100000, holdings: [], transactions: [] };
var watchlist = [];

document.addEventListener('DOMContentLoaded', function() {
    setupTabs();
    displayStocks(stocks);
    updateDashboard();
    populateStockSelect();
    document.getElementById('searchInput').addEventListener('input', function(e) {
        var f = stocks.filter(s => s.symbol.includes(e.target.value.toUpperCase()));
        displayStocks(f.length > 0 ? f : stocks);
    });
});

function setupTabs() {
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            var tab = this.getAttribute('data-tab');
            document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
            document.getElementById(tab).classList.add('active');
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            if (tab === 'portfolio') displayHoldings();
            if (tab === 'watchlist') displayWatchlist();
        });
    });
}

function displayStocks(arr) {
    var grid = document.getElementById('stocksGrid');
    grid.innerHTML = '';
    arr.forEach(s => {
        var c = s.change >= 0 ? 'change-up' : 'change-down';
        var e = s.change >= 0 ? '📈' : '📉';
        var d = document.createElement('div');
        d.className = 'stock-card';
        d.innerHTML = '<div class="stock-symbol">' + s.symbol + '</div><div class="stock-name">' + s.name + '</div><div class="stock-price">₹' + s.price.toFixed(2) + '</div><div class="stock-change ' + c + '">' + e + ' ' + s.change.toFixed(2) + '%</div><div style="text-align:right;cursor:pointer;color:#667eea" onclick="viewAnalysis(\'' + s.symbol + '\')">View Analysis →</div>';
        grid.appendChild(d);
    });
}

function updateDashboard() {
    var totalInvested = portfolio.holdings.reduce((sum, h) => sum + (h.quantity * h.buyPrice), 0);
    var currentValue = portfolio.holdings.reduce((sum, h) => sum + (h.quantity * getStockPrice(h.symbol)), 0);
    var gain = currentValue - totalInvested;
    document.querySelectorAll('.stat-value')[0].textContent = '₹' + totalInvested.toLocaleString();
    document.querySelectorAll('.stat-value')[1].textContent = '₹' + currentValue.toLocaleString();
    document.querySelectorAll('.stat-value')[2].textContent = '₹' + gain.toLocaleString();
    document.querySelectorAll('.stat-value')[3].textContent = portfolio.holdings.length;
}

function getStockPrice(symbol) {
    var s = stocks.find(x => x.symbol === symbol);
    return s ? s.price : 0;
}

function getStock(symbol) {
    return stocks.find(s => s.symbol === symbol);
}

function populateStockSelect() {
    var select = document.getElementById('stockSelect');
    stocks.forEach(s => {
        var opt = document.createElement('option');
        opt.value = s.symbol;
        opt.textContent = s.symbol + ' - ' + s.name;
        select.appendChild(opt);
    });
}

function buyStock() {
    var symbol = document.getElementById('stockSelect').value;
    var quantity = parseInt(document.getElementById('quantity').value);
    var price = parseFloat(document.getElementById('price').value);
    var cost = quantity * price;
    if (cost > portfolio.cash) { alert('Insufficient funds!'); return; }
    portfolio.cash -= cost;
    var holding = portfolio.holdings.find(h => h.symbol === symbol);
    if (holding) {
        holding.quantity += quantity;
        holding.buyPrice = (holding.buyPrice * holding.quantity + price * quantity) / (holding.quantity + quantity);
    } else {
        portfolio.holdings.push({symbol, quantity, buyPrice: price});
    }
    alert('Bought ' + quantity + ' shares of ' + symbol);
    updateDashboard();
}

function sellStock() {
    var symbol = document.getElementById('stockSelect').value;
    var quantity = parseInt(document.getElementById('quantity').value);
    var price = parseFloat(document.getElementById('price').value);
    var holding = portfolio.holdings.find(h => h.symbol === symbol);
    if (!holding || holding.quantity < quantity) { alert('Insufficient shares!'); return; }
    holding.quantity -= quantity;
    if (holding.quantity === 0) portfolio.holdings = portfolio.holdings.filter(h => h.symbol !== symbol);
    portfolio.cash += quantity * price;
    alert('Sold ' + quantity + ' shares of ' + symbol);
    updateDashboard();
}

function displayHoldings() {
    var list = document.getElementById('holdings');
    list.innerHTML = portfolio.holdings.length === 0 ? '<p>No holdings yet</p>' : '';
    portfolio.holdings.forEach(h => {
        var stock = getStock(h.symbol);
        var currentPrice = stock.price;
        var gain = (currentPrice - h.buyPrice) * h.quantity;
        var gainPct = ((currentPrice - h.buyPrice) / h.buyPrice * 100).toFixed(2);
        var div = document.createElement('div');
        div.className = 'holding-item';
        div.innerHTML = '<div><strong>' + h.symbol + '</strong></div><div>' + h.quantity + ' units @ ₹' + h.buyPrice.toFixed(2) + '</div><div>₹' + (currentPrice * h.quantity).toLocaleString() + '</div><div style="color:' + (gain >= 0 ? '#10b981' : '#ef4444') + '">' + (gain >= 0 ? '+' : '') + gainPct + '%</div>';
        list.appendChild(div);
    });
}

function addToWatchlist() {
    var search = document.getElementById('watchlistSearch').value.toUpperCase();
    var stock = stocks.find(s => s.symbol === search);
    if (stock && !watchlist.find(w => w.symbol === stock.symbol)) {
        watchlist.push(stock);
        alert('Added to watchlist!');
        document.getElementById('watchlistSearch').value = '';
    }
}

function displayWatchlist() {
    var list = document.getElementById('watchlistItems');
    list.innerHTML = watchlist.length === 0 ? '<p>Watchlist is empty</p>' : '';
    watchlist.forEach(s => {
        var c = s.change >= 0 ? 'change-up' : 'change-down';
        var e = s.change >= 0 ? '📈' : '📉';
        var div = document.createElement('div');
        div.className = 'watchlist-item';
        div.innerHTML = '<div><strong>' + s.symbol + '</strong></div><div>' + s.name + '</div><div>₹' + s.price.toFixed(2) + '</div><div class="stock-change ' + c + '">' + e + ' ' + s.change.toFixed(2) + '%</div>';
        list.appendChild(div);
    });
}

function calculateSIP() {
    var amount = parseFloat(document.getElementById('sipAmount').value);
    var rate = parseFloat(document.getElementById('sipReturn').value) / 12 / 100;
    var months = parseInt(document.getElementById('sipYears').value) * 12;
    var future = amount * (((1 + rate) ** months - 1) / rate) * (1 + rate);
    document.getElementById('sipResult').innerHTML = 'Future Value: ₹' + future.toLocaleString('en-IN', {maximumFractionDigits: 0});
}

function calculateGoal() {
    var goal = parseFloat(document.getElementById('goalAmount').value);
    var rate = parseFloat(document.getElementById('goalReturn').value) / 12 / 100;
    var months = parseInt(document.getElementById('goalMonths').value);
    var monthlyAmount = goal / (((1 + rate) ** months - 1) / rate);
    document.getElementById('goalResult').innerHTML = 'Monthly Amount Needed: ₹' + monthlyAmount.toLocaleString('en-IN', {maximumFractionDigits: 0});
}

function calculateCI() {
    var p = parseFloat(document.getElementById('principal').value);
    var r = parseFloat(document.getElementById('rate').value) / 100;
    var n = parseInt(document.getElementById('years').value);
    var amount = p * ((1 + r) ** n);
    var ci = amount - p;
    document.getElementById('ciResult').innerHTML = 'Amount: ₹' + amount.toLocaleString('en-IN', {maximumFractionDigits: 0}) + '<br>Interest: ₹' + ci.toLocaleString('en-IN', {maximumFractionDigits: 0});
}

function viewAnalysis(symbol) {
    var stock = getStock(symbol);
    document.querySelectorAll('.tab-btn')[5].click();
    document.getElementById('detailSymbol').textContent = symbol + ' - ' + stock.name;
    var html = '<div class="detail-info-item"><h5>Current Price</h5><p>₹' + stock.price.toFixed(2) + '</p></div><div class="detail-info-item"><h5>Change</h5><p>' + stock.change.toFixed(2) + '%</p></div><div class="detail-info-item"><h5>P/E Ratio</h5><p>' + stock.pe + '</p></div><div class="detail-info-item"><h5>Market Cap</h5><p>' + stock.cap + '</p></div><div class="detail-info-item"><h5>52W High</h5><p>₹' + stock.high.toFixed(2) + '</p></div><div class="detail-info-item"><h5>52W Low</h5><p>₹' + stock.low.toFixed(2) + '</p></div>';
    document.getElementById('detailInfo').innerHTML = html;
}
