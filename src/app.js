var stocks = [
    {symbol:'AAPL',name:'Apple Inc',price:182.50,change:2.5,high:190,low:175,pe:28.5,cap:'2.8T'},
    {symbol:'GOOGL',name:'Alphabet Inc',price:140.25,change:-1.2,high:145,low:135,pe:22.1,cap:'1.4T'},
    {symbol:'MSFT',name:'Microsoft Corp',price:378.91,change:3.1,high:385,low:365,pe:32.4,cap:'2.8T'},
    {symbol:'TSLA',name:'Tesla Inc',price:242.84,change:-2.8,high:250,low:235,pe:45.2,cap:'760B'},
    {symbol:'AMZN',name:'Amazon Inc',price:175.43,change:1.9,high:180,low:170,pe:50.3,cap:'1.8T'},
    {symbol:'NVDA',name:'NVIDIA Corp',price:876.42,change:5.2,high:890,low:850,pe:55.1,cap:'2.1T'}
];

var ipos = [
    {name:'TechCorp',symbol:'TECH',date:'May 15, 2026',price:'$25-27'},
    {name:'GreenEnergy Inc',symbol:'GREEN',date:'May 20, 2026',price:'$18-20'},
    {name:'CloudSystems',symbol:'CLOUD',date:'June 1, 2026',price:'$30-35'},
    {name:'BioGenesis',symbol:'BIO',date:'June 10, 2026',price:'$22-24'}
];

var charts = {};

document.addEventListener('DOMContentLoaded', function() {
    displayStocks(stocks);
    setupTabs();
    document.getElementById('searchInput').addEventListener('input', handleSearch);
});

function displayStocks(arr) {
    var grid = document.getElementById('stocksGrid');
    grid.innerHTML = '';
    arr.forEach(function(s) {
        var c = s.change >= 0 ? 'change-up' : 'change-down';
        var e = s.change >= 0 ? '📈' : '📉';
        var d = document.createElement('div');
        d.className = 'stock-card';
        d.innerHTML = '<div class="stock-symbol">' + s.symbol + '</div><div class="stock-name">' + s.name + '</div><div class="stock-price">$' + s.price.toFixed(2) + '</div><div class="stock-change ' + c + '">' + e + ' ' + s.change.toFixed(2) + '%</div><div style="text-align:right"><small>Market Cap: ' + s.cap + '</small></div>';
        grid.appendChild(d);
    });
}

function displayCharts(arr) {
    var grid = document.getElementById('chartsGrid');
    grid.innerHTML = '';
    arr.forEach(function(s) {
        var div = document.createElement('div');
        div.className = 'chart-container';
        div.innerHTML = '<h3>' + s.symbol + ' - ' + s.name + '</h3><canvas id="chart-' + s.symbol + '"></canvas>';
        grid.appendChild(div);
        drawChart(s);
    });
}

function drawChart(stock) {
    var prices = [];
    for (var i = 0; i < 30; i++) {
        var variation = (Math.random() - 0.5) * 10;
        prices.push(stock.price + variation);
    }
    
    var ctx = document.getElementById('chart-' + stock.symbol).getContext('2d');
    charts[stock.symbol] = new Chart(ctx, {
        type: 'line',
        data: {
            labels: Array.from({length: 30}, function(_, i) { return 'Day ' + (i+1); }),
            datasets: [{
                label: stock.symbol + ' Price',
                data: prices,
                borderColor: '#667eea',
                backgroundColor: 'rgba(102, 126, 234, 0.1)',
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: { legend: { display: true } },
            scales: { y: { beginAtZero: false } }
        }
    });
}

function displayIPO(ipos) {
    var list = document.getElementById('ipoList');
    list.innerHTML = '';
    ipos.forEach(function(ipo) {
        var div = document.createElement('div');
        div.className = 'ipo-item';
        div.innerHTML = '<div class="ipo-date">' + ipo.date + '</div><div class="ipo-symbol">' + ipo.symbol + ' - ' + ipo.name + '</div><div class="ipo-price">' + ipo.price + '</div><button style="padding:8px 12px; background:#667eea; color:#fff; border:none; border-radius:4px; cursor:pointer;">Watchlist</button>';
        list.appendChild(div);
    });
}

function setupTabs() {
    var buttons = document.querySelectorAll('.tab-btn');
    buttons.forEach(function(btn) {
        btn.addEventListener('click', function() {
            var tabName = this.getAttribute('data-tab');
            showTab(tabName);
        });
    });
}

function showTab(tabName) {
    var contents = document.querySelectorAll('.tab-content');
    contents.forEach(function(c) { c.classList.remove('active'); });
    document.getElementById(tabName).classList.add('active');
    
    var buttons = document.querySelectorAll('.tab-btn');
    buttons.forEach(function(b) { b.classList.remove('active'); });
    document.querySelector('[data-tab="' + tabName + '"]').classList.add('active');
    
    if (tabName === 'charts') {
        displayCharts(stocks);
    } else if (tabName === 'ipo') {
        displayIPO(ipos);
    }
}

function handleSearch(e) {
    var q = e.target.value.toUpperCase();
    var f = stocks.filter(function(s) { return s.symbol.indexOf(q) > -1 || s.name.indexOf(q) > -1; });
    displayStocks(f.length > 0 ? f : stocks);
}
