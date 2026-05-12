// Mock Financial Data for Companies
const mockCompanies = {
  'AAPL': {
    name: 'Apple Inc.',
    symbol: 'AAPL',
    exchange: 'NASDAQ',
    sector: 'Technology',
    industry: 'Consumer Electronics',
    currentPrice: 182.52,
    change: 2.45,
    changePercent: 1.36,
    marketCap: '2.8T',
    peRatio: 28.5,
    dividendYield: 0.42,
    high52w: 199.62,
    low52w: 124.17,
    volume: 42856000,
    avgVolume: 46238000,
    description: 'Apple Inc. is a technology company that designs, manufactures, and markets smartphones, personal computers, tablets, wearables, and accessories worldwide.',
    
    overview: {
      founded: 1976,
      headquarters: 'Cupertino, California',
      ceo: 'Tim Cook',
      employees: '164,000',
      website: 'www.apple.com'
    },

    financials: {
      incomeStatement: [
        { period: '2023', revenue: '383.3B', grossProfit: '114.3B', operatingIncome: '114.3B', netIncome: '96.99B', eps: '6.05' },
        { period: '2022', revenue: '394.3B', grossProfit: '113.2B', operatingIncome: '119.4B', netIncome: '99.8B', eps: '6.61' },
        { period: '2021', revenue: '365.8B', grossProfit: '114.3B', operatingIncome: '124.3B', netIncome: '94.7B', eps: '5.61' }
      ],
      balanceSheet: [
        { period: '2023', totalAssets: '352.8B', totalLiabilities: '288.6B', shareholders: '64.2B', cash: '29.9B', debt: '106.9B' },
        { period: '2022', totalAssets: '346.9B', totalLiabilities: '287.9B', shareholders: '59B', cash: '23.6B', debt: '109.1B' }
      ],
      cashFlow: [
        { period: '2023', operatingCF: '110.5B', investingCF: '-10.9B', financingCF: '-109.3B', freeCashFlow: '99.6B' },
        { period: '2022', operatingCF: '122.2B', investingCF: '-10.7B', financingCF: '-104.8B', freeCashFlow: '111.5B' }
      ]
    },

    valuation: {
      peRatio: 28.5,
      pbRatio: 42.3,
      priceToSales: 23.4,
      roe: 85.3,
      roa: 27.5,
      debtToEquity: 1.66
    },

    technicals: {
      ma50: 175.20,
      ma200: 169.45,
      rsi: 65.2,
      macd: 'Bullish',
      support: 178.50,
      resistance: 188.75,
      trend: 'Uptrend'
    },

    priceHistory: [
      { date: 'Mon', price: 178.5 },
      { date: 'Tue', price: 180.2 },
      { date: 'Wed', price: 179.8 },
      { date: 'Thu', price: 181.5 },
      { date: 'Fri', price: 182.52 }
    ],

    revenueHistory: [
      { year: '2019', revenue: 260.2 },
      { year: '2020', revenue: 274.5 },
      { year: '2021', revenue: 365.8 },
      { year: '2022', revenue: 394.3 },
      { year: '2023', revenue: 383.3 }
    ]
  },

  'GOOGL': {
    name: 'Alphabet Inc.',
    symbol: 'GOOGL',
    exchange: 'NASDAQ',
    sector: 'Technology',
    industry: 'Internet Services',
    currentPrice: 140.25,
    change: 1.75,
    changePercent: 1.27,
    marketCap: '1.85T',
    peRatio: 22.4,
    dividendYield: 0.0,
    high52w: 151.94,
    low52w: 102.21,
    volume: 23145000,
    avgVolume: 24589000,
    description: 'Alphabet Inc. is a technology conglomerate that operates Google, one of the world\'s largest search engines, and various other technology products and services.',
    
    overview: {
      founded: 1998,
      headquarters: 'Mountain View, California',
      ceo: 'Sundar Pichai',
      employees: '186,779',
      website: 'www.google.com'
    },

    financials: {
      incomeStatement: [
        { period: '2023', revenue: '307.4B', grossProfit: '173.2B', operatingIncome: '61.5B', netIncome: '59.9B', eps: '4.67' },
        { period: '2022', revenue: '282.8B', grossProfit: '161.9B', operatingIncome: '60.5B', netIncome: '59.9B', eps: '4.74' },
        { period: '2021', revenue: '257.6B', grossProfit: '147.1B', operatingIncome: '79.3B', netIncome: '76.0B', eps: '5.70' }
      ],
      balanceSheet: [
        { period: '2023', totalAssets: '402.4B', totalLiabilities: '170.0B', shareholders: '232.4B', cash: '86.6B', debt: '13.7B' },
        { period: '2022', totalAssets: '402.4B', totalLiabilities: '175.8B', shareholders: '226.6B', cash: '110.9B', debt: '14.1B' }
      ],
      cashFlow: [
        { period: '2023', operatingCF: '96.2B', investingCF: '-27.8B', financingCF: '-60.1B', freeCashFlow: '68.4B' },
        { period: '2022', operatingCF: '107.0B', investingCF: '-45.1B', financingCF: '-47.7B', freeCashFlow: '61.9B' }
      ]
    },

    valuation: {
      peRatio: 22.4,
      pbRatio: 4.2,
      priceToSales: 5.8,
      roe: 15.2,
      roa: 11.3,
      debtToEquity: 0.06
    },

    technicals: {
      ma50: 138.50,
      ma200: 135.75,
      rsi: 58.5,
      macd: 'Neutral',
      support: 135.00,
      resistance: 145.50,
      trend: 'Uptrend'
    },

    priceHistory: [
      { date: 'Mon', price: 138.50 },
      { date: 'Tue', price: 138.75 },
      { date: 'Wed', price: 139.25 },
      { date: 'Thu', price: 140.00 },
      { date: 'Fri', price: 140.25 }
    ],

    revenueHistory: [
      { year: '2019', revenue: 161.9 },
      { year: '2020', revenue: 182.5 },
      { year: '2021', revenue: 257.6 },
      { year: '2022', revenue: 282.8 },
      { year: '2023', revenue: 307.4 }
    ]
  },

  'MSFT': {
    name: 'Microsoft Corporation',
    symbol: 'MSFT',
    exchange: 'NASDAQ',
    sector: 'Technology',
    industry: 'Software & IT Services',
    currentPrice: 415.33,
    change: 3.45,
    changePercent: 0.84,
    marketCap: '3.1T',
    peRatio: 34.2,
    dividendYield: 0.75,
    high52w: 420.00,
    low52w: '310.21',
    volume: 18956000,
    avgVolume: 20145000,
    description: 'Microsoft Corporation develops, manufactures, licenses, and supports a wide range of products and services related to computing.',
    
    overview: {
      founded: 1975,
      headquarters: 'Redmond, Washington',
      ceo: 'Satya Nadella',
      employees: '221,000',
      website: 'www.microsoft.com'
    },

    financials: {
      incomeStatement: [
        { period: '2023', revenue: '211.9B', grossProfit: '95.3B', operatingIncome: '88.1B', netIncome: '72.4B', eps: '9.68' },
        { period: '2022', revenue: '198.3B', grossProfit: '88.1B', operatingIncome: '69.9B', netIncome: '72.7B', eps: '9.73' },
        { period: '2021', revenue: '168.1B', grossProfit: '74.4B', operatingIncome: '69.9B', netIncome: '69.9B', eps: '9.27' }
      ],
      balanceSheet: [
        { period: '2023', totalAssets: '411.9B', totalLiabilities: '289.1B', shareholders: '122.8B', cash: '80.4B', debt: '58.5B' },
        { period: '2022', totalAssets: '411.9B', totalLiabilities: '284.3B', shareholders: '127.6B', cash: '103.6B', debt: '54.0B' }
      ],
      cashFlow: [
        { period: '2023', operatingCF: '108.9B', investingCF: '-63.5B', financingCF: '-41.6B', freeCashFlow: '45.4B' },
        { period: '2022', operatingCF: '110.4B', investingCF: '-44.1B', financingCF: '-30.0B', freeCashFlow: '66.3B' }
      ]
    },

    valuation: {
      peRatio: 34.2,
      pbRatio: 12.5,
      priceToSales: 14.3,
      roe: 25.3,
      roa: 17.6,
      debtToEquity: 0.48
    },

    technicals: {
      ma50: 410.75,
      ma200: 380.25,
      rsi: 62.8,
      macd: 'Bullish',
      support: 405.00,
      resistance: 425.00,
      trend: 'Uptrend'
    },

    priceHistory: [
      { date: 'Mon', price: 410.50 },
      { date: 'Tue', price: 412.25 },
      { date: 'Wed', price: 413.50 },
      { date: 'Thu', price: 414.75 },
      { date: 'Fri', price: 415.33 }
    ],

    revenueHistory: [
      { year: '2019', revenue: 125.8 },
      { year: '2020', revenue: 143.0 },
      { year: '2021', revenue: 168.1 },
      { year: '2022', revenue: 198.3 },
      { year: '2023', revenue: 211.9 }
    ]
  }
};

let currentCompany = null;
let currentTab = 'overview';
let charts = {};

// Initialize
document.addEventListener('DOMContentLoaded', function() {
  setupEventListeners();
  displayDefaultCompany();
});

function setupEventListeners() {
  // Search functionality
  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    searchInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        searchCompany(this.value);
      }
    });
  }

  // Tab switching
  const tabButtons = document.querySelectorAll('.tab-btn');
  tabButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      const tabName = this.getAttribute('data-tab');
      switchTab(tabName);
    });
  });

  // Financial calculator buttons
  const sipBtn = document.getElementById('sip-calc-btn');
  const goalBtn = document.getElementById('goal-calc-btn');
  if (sipBtn) sipBtn.addEventListener('click', showSIPCalculator);
  if (goalBtn) goalBtn.addEventListener('click', showGoalCalculator);
}

function displayDefaultCompany() {
  const company = mockCompanies['AAPL'];
  loadCompanyData(company);
}

function searchCompany(query) {
  const symbol = query.toUpperCase().trim();
  if (mockCompanies[symbol]) {
    loadCompanyData(mockCompanies[symbol]);
  } else {
    alert(`Company ${symbol} not found. Try: AAPL, GOOGL, MSFT`);
  }
}

function loadCompanyData(company) {
  currentCompany = company;
  
  // Update header
  const header = document.querySelector('.company-header');
  if (header) {
    header.innerHTML = `
      <div class="header-top">
        <div>
          <h1>${company.name}</h1>
          <p class="symbol-exchange">${company.symbol} • ${company.exchange}</p>
        </div>
        <div class="price-info">
          <div class="current-price">₹${company.currentPrice.toFixed(2)}</div>
          <div class="price-change ${company.change >= 0 ? 'positive' : 'negative'}">
            ${company.change >= 0 ? '+' : ''}${company.change.toFixed(2)} (${company.changePercent >= 0 ? '+' : ''}${company.changePercent.toFixed(2)}%)
          </div>
        </div>
      </div>
      <div class="header-meta">
        <div class="meta-item">
          <span class="meta-label">Sector</span>
          <span class="meta-value">${company.sector}</span>
        </div>
        <div class="meta-item">
          <span class="meta-label">Industry</span>
          <span class="meta-value">${company.industry}</span>
        </div>
      </div>
    `;
  }

  // Update quick stats
  const quickStats = document.querySelector('.quick-stats');
  if (quickStats) {
    quickStats.innerHTML = `
      <div class="stat-item">
        <div class="stat-label">Market Cap</div>
        <div class="stat-value">${company.marketCap}</div>
      </div>
      <div class="stat-item">
        <div class="stat-label">P/E Ratio</div>
        <div class="stat-value">${company.peRatio.toFixed(2)}</div>
      </div>
      <div class="stat-item">
        <div class="stat-label">Dividend Yield</div>
        <div class="stat-value">${company.dividendYield.toFixed(2)}%</div>
      </div>
      <div class="stat-item">
        <div class="stat-label">52W High</div>
        <div class="stat-value">₹${company.high52w}</div>
      </div>
      <div class="stat-item">
        <div class="stat-label">52W Low</div>
        <div class="stat-value">₹${company.low52w}</div>
      </div>
      <div class="stat-item">
        <div class="stat-label">Volume</div>
        <div class="stat-value">${(company.volume / 1000000).toFixed(1)}M</div>
      </div>
    `;
  }

  // Load default tab
  switchTab('overview');
}

function switchTab(tabName) {
  currentTab = tabName;

  // Update active tab button
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');

  // Update tab content
  const contentArea = document.querySelector('.detail-content');
  
  if (tabName === 'overview') {
    showOverviewTab(contentArea);
  } else if (tabName === 'financials') {
    showFinancialsTab(contentArea);
  } else if (tabName === 'valuation') {
    showValuationTab(contentArea);
  } else if (tabName === 'technicals') {
    showTechnicalsTab(contentArea);
  }
}

function showOverviewTab(container) {
  if (!currentCompany) return;
  
  const company = currentCompany;
  container.innerHTML = `
    <div class="tab-content">
      <div class="section">
        <h3>About</h3>
        <p>${company.description}</p>
      </div>

      <div class="section">
        <h3>Company Overview</h3>
        <div class="overview-grid">
          <div class="overview-item">
            <span class="label">Founded</span>
            <span class="value">${company.overview.founded}</span>
          </div>
          <div class="overview-item">
            <span class="label">Headquarters</span>
            <span class="value">${company.overview.headquarters}</span>
          </div>
          <div class="overview-item">
            <span class="label">CEO</span>
            <span class="value">${company.overview.ceo}</span>
          </div>
          <div class="overview-item">
            <span class="label">Employees</span>
            <span class="value">${company.overview.employees}</span>
          </div>
        </div>
      </div>

      <div class="section">
        <h3>Price Chart (5 Days)</h3>
        <canvas id="priceChart" style="max-height: 300px; margin-top: 20px;"></canvas>
      </div>

      <div class="section">
        <h3>Revenue Trend (5 Years)</h3>
        <canvas id="revenueChart" style="max-height: 300px; margin-top: 20px;"></canvas>
      </div>

      <div class="section">
        <h3>Key Metrics</h3>
        <div class="metrics-grid">
          <div class="metric">
            <span class="metric-label">P/E Ratio</span>
            <span class="metric-value">${company.peRatio.toFixed(2)}</span>
          </div>
          <div class="metric">
            <span class="metric-label">P/B Ratio</span>
            <span class="metric-value">${company.valuation.pbRatio.toFixed(2)}</span>
          </div>
          <div class="metric">
            <span class="metric-label">ROE</span>
            <span class="metric-value">${company.valuation.roe.toFixed(2)}%</span>
          </div>
          <div class="metric">
            <span class="metric-label">ROA</span>
            <span class="metric-value">${company.valuation.roa.toFixed(2)}%</span>
          </div>
        </div>
      </div>
    </div>
  `;

  // Render charts after content is loaded
  setTimeout(() => {
    renderPriceChart();
    renderRevenueChart();
  }, 100);
}

function showFinancialsTab(container) {
  if (!currentCompany) return;
  
  const company = currentCompany;
  const income = company.financials.incomeStatement;
  const balance = company.financials.balanceSheet;
  const cashFlow = company.financials.cashFlow;

  let html = `
    <div class="tab-content">
      <div class="section">
        <h3>Income Statement</h3>
        <table class="data-table">
          <thead>
            <tr>
              <th>Period</th>
              <th>Revenue</th>
              <th>Gross Profit</th>
              <th>Operating Income</th>
              <th>Net Income</th>
              <th>EPS</th>
            </tr>
          </thead>
          <tbody>
  `;
  
  income.forEach(row => {
    html += `
      <tr>
        <td>${row.period}</td>
        <td>₹${row.revenue}</td>
        <td>₹${row.grossProfit}</td>
        <td>₹${row.operatingIncome}</td>
        <td>₹${row.netIncome}</td>
        <td>₹${row.eps}</td>
      </tr>
    `;
  });

  html += `
          </tbody>
        </table>
      </div>

      <div class="section">
        <h3>Balance Sheet</h3>
        <table class="data-table">
          <thead>
            <tr>
              <th>Period</th>
              <th>Total Assets</th>
              <th>Total Liabilities</th>
              <th>Shareholders Equity</th>
              <th>Cash</th>
              <th>Debt</th>
            </tr>
          </thead>
          <tbody>
  `;

  balance.forEach(row => {
    html += `
      <tr>
        <td>${row.period}</td>
        <td>₹${row.totalAssets}</td>
        <td>₹${row.totalLiabilities}</td>
        <td>₹${row.shareholders}</td>
        <td>₹${row.cash}</td>
        <td>₹${row.debt}</td>
      </tr>
    `;
  });

  html += `
          </tbody>
        </table>
      </div>

      <div class="section">
        <h3>Cash Flow Statement</h3>
        <table class="data-table">
          <thead>
            <tr>
              <th>Period</th>
              <th>Operating CF</th>
              <th>Investing CF</th>
              <th>Financing CF</th>
              <th>Free Cash Flow</th>
            </tr>
          </thead>
          <tbody>
  `;

  cashFlow.forEach(row => {
    html += `
      <tr>
        <td>${row.period}</td>
        <td>₹${row.operatingCF}</td>
        <td>₹${row.investingCF}</td>
        <td>₹${row.financingCF}</td>
        <td>₹${row.freeCashFlow}</td>
      </tr>
    `;
  });

  html += `
          </tbody>
        </table>
      </div>
    </div>
  `;

  container.innerHTML = html;
}

function showValuationTab(container) {
  if (!currentCompany) return;
  
  const company = currentCompany;
  const v = company.valuation;

  const html = `
    <div class="tab-content">
      <div class="section">
        <h3>Valuation Metrics</h3>
        <div class="metrics-table">
          <table class="data-table">
            <tbody>
              <tr>
                <td class="metric-name">Price-to-Earnings (P/E)</td>
                <td class="metric-value">${v.peRatio.toFixed(2)}</td>
                <td class="metric-desc">Lower is often better for value</td>
              </tr>
              <tr>
                <td class="metric-name">Price-to-Book (P/B)</td>
                <td class="metric-value">${v.pbRatio.toFixed(2)}</td>
                <td class="metric-desc">Asset-based valuation metric</td>
              </tr>
              <tr>
                <td class="metric-name">Price-to-Sales (P/S)</td>
                <td class="metric-value">${v.priceToSales.toFixed(2)}</td>
                <td class="metric-desc">Revenue-based valuation</td>
              </tr>
              <tr>
                <td class="metric-name">Return on Equity (ROE)</td>
                <td class="metric-value">${v.roe.toFixed(2)}%</td>
                <td class="metric-desc">Profitability metric</td>
              </tr>
              <tr>
                <td class="metric-name">Return on Assets (ROA)</td>
                <td class="metric-value">${v.roa.toFixed(2)}%</td>
                <td class="metric-desc">Asset efficiency metric</td>
              </tr>
              <tr>
                <td class="metric-name">Debt-to-Equity</td>
                <td class="metric-value">${v.debtToEquity.toFixed(2)}</td>
                <td class="metric-desc">Financial leverage ratio</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="section">
        <h3>Valuation Analysis</h3>
        <div class="analysis-box">
          <p><strong>P/E Ratio Interpretation:</strong> A P/E of ${v.peRatio.toFixed(2)} suggests the stock is trading at ${v.peRatio > 25 ? 'a premium' : 'a reasonable'} valuation compared to earnings.</p>
          <p><strong>ROE:</strong> An ROE of ${v.roe.toFixed(2)}% indicates ${v.roe > 15 ? 'strong' : 'moderate'} profitability.</p>
          <p><strong>Debt Level:</strong> A D/E ratio of ${v.debtToEquity.toFixed(2)} shows ${v.debtToEquity < 1 ? 'low' : 'high'} financial leverage.</p>
        </div>
      </div>
    </div>
  `;

  container.innerHTML = html;
}

function showTechnicalsTab(container) {
  if (!currentCompany) return;
  
  const company = currentCompany;
  const tech = company.technicals;

  const html = `
    <div class="tab-content">
      <div class="section">
        <h3>Technical Indicators</h3>
        <div class="technicals-grid">
          <div class="technical-item">
            <span class="tech-label">50-Day MA</span>
            <span class="tech-value">₹${tech.ma50.toFixed(2)}</span>
          </div>
          <div class="technical-item">
            <span class="tech-label">200-Day MA</span>
            <span class="tech-value">₹${tech.ma200.toFixed(2)}</span>
          </div>
          <div class="technical-item">
            <span class="tech-label">RSI (14)</span>
            <span class="tech-value">${tech.rsi.toFixed(1)}</span>
          </div>
          <div class="technical-item">
            <span class="tech-label">MACD</span>
            <span class="tech-value">${tech.macd}</span>
          </div>
          <div class="technical-item">
            <span class="tech-label">Support</span>
            <span class="tech-value">₹${tech.support.toFixed(2)}</span>
          </div>
          <div class="technical-item">
            <span class="tech-label">Resistance</span>
            <span class="tech-value">₹${tech.resistance.toFixed(2)}</span>
          </div>
          <div class="technical-item">
            <span class="tech-label">Trend</span>
            <span class="tech-value trend-${tech.trend.toLowerCase()}">${tech.trend}</span>
          </div>
        </div>
      </div>

      <div class="section">
        <h3>Price Action</h3>
        <canvas id="technicalChart" style="max-height: 300px; margin-top: 20px;"></canvas>
      </div>

      <div class="section">
        <h3>Technical Analysis</h3>
        <div class="analysis-box">
          <p><strong>Moving Averages:</strong> Current price is ${company.currentPrice > tech.ma50 ? 'above' : 'below'} the 50-day MA, indicating a ${company.currentPrice > tech.ma50 ? 'bullish' : 'bearish'} short-term trend.</p>
          <p><strong>RSI:</strong> At ${tech.rsi.toFixed(1)}, the stock is ${tech.rsi > 70 ? 'overbought' : tech.rsi < 30 ? 'oversold' : 'neutral'}.</p>
          <p><strong>Support/Resistance:</strong> Key support at ₹${tech.support.toFixed(2)} and resistance at ₹${tech.resistance.toFixed(2)}.</p>
        </div>
      </div>
    </div>
  `;

  container.innerHTML = html;
  
  setTimeout(() => {
    renderTechnicalChart();
  }, 100);
}

function renderPriceChart() {
  const canvas = document.getElementById('priceChart');
  if (!canvas || !currentCompany) return;

  const ctx = canvas.getContext('2d');
  
  // Destroy previous chart if exists
  if (charts.price) {
    charts.price.destroy();
  }

  const data = currentCompany.priceHistory;
  
  charts.price = new Chart(ctx, {
    type: 'line',
    data: {
      labels: data.map(d => d.date),
      datasets: [{
        label: 'Price (₹)',
        data: data.map(d => d.price),
        borderColor: '#667eea',
        backgroundColor: 'rgba(102, 126, 234, 0.1)',
        tension: 0.4,
        fill: true
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: {
          display: true
        }
      },
      scales: {
        y: {
          beginAtZero: false
        }
      }
    }
  });
}

function renderRevenueChart() {
  const canvas = document.getElementById('revenueChart');
  if (!canvas || !currentCompany) return;

  const ctx = canvas.getContext('2d');
  
  if (charts.revenue) {
    charts.revenue.destroy();
  }

  const data = currentCompany.revenueHistory;
  
  charts.revenue = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: data.map(d => d.year),
      datasets: [{
        label: 'Revenue (Billion ₹)',
        data: data.map(d => d.revenue),
        backgroundColor: '#667eea'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: {
          display: true
        }
      },
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}

function renderTechnicalChart() {
  const canvas = document.getElementById('technicalChart');
  if (!canvas || !currentCompany) return;

  const ctx = canvas.getContext('2d');
  
  if (charts.technical) {
    charts.technical.destroy();
  }

  const data = currentCompany.priceHistory;
  const tech = currentCompany.technicals;
  
  charts.technical = new Chart(ctx, {
    type: 'line',
    data: {
      labels: data.map(d => d.date),
      datasets: [
        {
          label: 'Price (₹)',
          data: data.map(d => d.price),
          borderColor: '#667eea',
          backgroundColor: 'rgba(102, 126, 234, 0.1)',
          tension: 0.4,
          fill: true,
          yAxisID: 'y'
        },
        {
          label: '50-Day MA',
          data: Array(data.length).fill(tech.ma50),
          borderColor: '#f59e0b',
          borderDash: [5, 5],
          yAxisID: 'y'
        },
        {
          label: '200-Day MA',
          data: Array(data.length).fill(tech.ma200),
          borderColor: '#ef4444',
          borderDash: [5, 5],
          yAxisID: 'y'
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: {
          display: true
        }
      },
      scales: {
        y: {
          type: 'linear',
          display: true,
          position: 'left',
          beginAtZero: false
        }
      }
    }
  });
}

function showSIPCalculator() {
  const modal = document.createElement('div');
  modal.className = 'modal';
  modal.innerHTML = `
    <div class="modal-content">
      <span class="close" onclick="this.parentElement.parentElement.remove()">&times;</span>
      <h2>SIP Calculator</h2>
      <div class="calculator-form">
        <div class="form-group">
          <label>Monthly Investment (₹)</label>
          <input type="number" id="sip-amount" value="10000" min="1000" step="1000">
        </div>
        <div class="form-group">
          <label>Expected Annual Return (%)</label>
          <input type="number" id="sip-return" value="12" min="1" max="100" step="0.5">
        </div>
        <div class="form-group">
          <label>Time Period (Years)</label>
          <input type="number" id="sip-years" value="10" min="1" max="50">
        </div>
        <button onclick="calculateSIP()" class="btn">Calculate</button>
      </div>
      <div id="sip-result"></div>
    </div>
  `;
  document.body.appendChild(modal);
  modal.style.display = 'flex';
}

function calculateSIP() {
  const amount = parseFloat(document.getElementById('sip-amount').value);
  const rate = parseFloat(document.getElementById('sip-return').value) / 100 / 12;
  const months = parseInt(document.getElementById('sip-years').value) * 12;
  
  const maturityAmount = amount * (((1 + rate) ** months - 1) / rate) * (1 + rate);
  const totalInvestment = amount * months;
  const gains = maturityAmount - totalInvestment;
  
  const result = `
    <div style="margin-top: 20px; padding: 15px; background: #f5f7fa; border-radius: 8px;">
      <p><strong>Total Investment:</strong> ₹${totalInvestment.toFixed(0)}</p>
      <p><strong>Expected Maturity Amount:</strong> ₹${maturityAmount.toFixed(0)}</p>
      <p><strong>Expected Gains:</strong> ₹${gains.toFixed(0)}</p>
    </div>
  `;
  
  document.getElementById('sip-result').innerHTML = result;
}

function showGoalCalculator() {
  const modal = document.createElement('div');
  modal.className = 'modal';
  modal.innerHTML = `
    <div class="modal-content">
      <span class="close" onclick="this.parentElement.parentElement.remove()">&times;</span>
      <h2>Investment Goal Calculator</h2>
      <div class="calculator-form">
        <div class="form-group">
          <label>Target Amount (₹)</label>
          <input type="number" id="goal-amount" value="1000000" min="100000" step="100000">
        </div>
        <div class="form-group">
          <label>Expected Annual Return (%)</label>
          <input type="number" id="goal-return" value="12" min="1" max="100" step="0.5">
        </div>
        <div class="form-group">
          <label>Time Period (Years)</label>
          <input type="number" id="goal-years" value="10" min="1" max="50">
        </div>
        <button onclick="calculateGoal()" class="btn">Calculate</button>
      </div>
      <div id="goal-result"></div>
    </div>
  `;
  document.body.appendChild(modal);
  modal.style.display = 'flex';
}

function calculateGoal() {
  const targetAmount = parseFloat(document.getElementById('goal-amount').value);
  const rate = parseFloat(document.getElementById('goal-return').value) / 100 / 12;
  const months = parseInt(document.getElementById('goal-years').value) * 12;
  
  const sipAmount = targetAmount / (((1 + rate) ** months - 1) / rate) / (1 + rate);
  const totalInvestment = sipAmount * months;
  
  const result = `
    <div style="margin-top: 20px; padding: 15px; background: #f5f7fa; border-radius: 8px;">
      <p><strong>Required Monthly Investment:</strong> ₹${sipAmount.toFixed(0)}</p>
      <p><strong>Total Investment Required:</strong> ₹${totalInvestment.toFixed(0)}</p>
      <p><strong>Target Amount:</strong> ₹${targetAmount.toFixed(0)}</p>
    </div>
  `;
  
  document.getElementById('goal-result').innerHTML = result;
}

// Modal styling
const style = document.createElement('style');
style.textContent = `
  .modal {
    display: none;
    position: fixed;
    z-index: 1000;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4);
    justify-content: center;
    align-items: center;
  }

  .modal-content {
    background-color: #fefeff;
    padding: 30px;
    border-radius: 12px;
    width: 90%;
    max-width: 500px;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
    position: relative;
  }

  .close {
    position: absolute;
    right: 20px;
    top: 20px;
    font-size: 28px;
    font-weight: bold;
    cursor: pointer;
    color: #999;
  }

  .close:hover {
    color: #000;
  }

  .calculator-form {
    margin: 20px 0;
  }

  .form-group {
    margin: 15px 0;
  }

  .form-group label {
    display: block;
    margin-bottom: 5px;
    font-weight: 500;
    color: #1f2937;
  }

  .form-group input {
    width: 100%;
    padding: 10px;
    border: 1px solid #e5e7eb;
    border-radius: 6px;
    font-size: 14px;
  }

  .btn {
    width: 100%;
    padding: 12px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: none;
    border-radius: 6px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    margin-top: 10px;
  }

  .btn:hover {
    opacity: 0.9;
  }

  .analysis-box {
    background: #f5f7fa;
    padding: 15px;
    border-radius: 8px;
    line-height: 1.8;
    color: #374151;
  }

  .trend-uptrend {
    color: #10b981;
    font-weight: 600;
  }

  .trend-downtrend {
    color: #ef4444;
    font-weight: 600;
  }

  .overview-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 15px;
  }

  .overview-item {
    padding: 15px;
    background: #f5f7fa;
    border-radius: 8px;
  }

  .overview-item .label {
    display: block;
    font-size: 12px;
    color: #6b7280;
    margin-bottom: 5px;
  }

  .overview-item .value {
    display: block;
    font-size: 18px;
    font-weight: 600;
    color: #1f2937;
  }

  .technicals-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 15px;
  }

  .technical-item {
    padding: 15px;
    background: #f5f7fa;
    border-radius: 8px;
    text-align: center;
  }

  .tech-label {
    display: block;
    font-size: 12px;
    color: #6b7280;
    margin-bottom: 8px;
  }

  .tech-value {
    display: block;
    font-size: 18px;
    font-weight: 600;
    color: #667eea;
  }

  .metrics-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 15px;
  }

  .metric {
    padding: 15px;
    background: linear-gradient(135deg, #667eea15, #764ba215);
    border-radius: 8px;
    border-left: 3px solid #667eea;
  }

  .metric-label {
    display: block;
    font-size: 12px;
    color: #6b7280;
    margin-bottom: 8px;
  }

  .metric-value {
    display: block;
    font-size: 20px;
    font-weight: 700;
    color: #667eea;
  }

  .metrics-table {
    overflow-x: auto;
  }

  .metrics-table table tr {
    border-bottom: 1px solid #e5e7eb;
  }

  .metric-name {
    font-weight: 600;
    color: #1f2937;
    width: 30%;
  }

  .metric-value {
    font-weight: 700;
    color: #667eea;
    width: 20%;
  }

  .metric-desc {
    color: #6b7280;
    font-size: 13px;
    width: 50%;
  }
`;
document.head.appendChild(style);
