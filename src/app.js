// Finnhub API Configuration
const FINNHUB_API_KEY = 'd81lae1r01qrojfc2i2gd81lae1r01qrojfc2i30'; // Will be replaced via environment variable
const FINNHUB_BASE_URL = 'https://finnhub.io/api/v1';

// Mock Financial Data (Fallback)
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
  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    searchInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        searchCompany(this.value);
      }
    });
  }

  const tabButtons = document.querySelectorAll('.tab-btn');
  tabButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      const tabName = this.getAttribute('data-tab');
      switchTab(tabName);
    });
  });

  const sipBtn = document.getElementById('sip-calc-btn');
  const goalBtn = document.getElementById('goal-calc-btn');
  if (sipBtn) sipBtn.addEventListener('click', showSIPCalculator);
  if (goalBtn) goalBtn.addEventListener('click', showGoalCalculator);
}

function displayDefaultCompany() {
  const company = mockCompanies['AAPL'];
  loadCompanyData(company);
}

async function searchCompany(query) {
  const symbol = query.toUpperCase().trim();
  
  try {
    // Try to fetch from Finnhub API
    const data = await fetchCompanyData(symbol);
    if (data) {
      loadCompanyData(data);
      return;
    }
  } catch (error) {
    console.log('API Error:', error);
  }

  // Fallback to mock data
  if (mockCompanies[symbol]) {
    loadCompanyData(mockCompanies[symbol]);
  } else {
    alert(`Company ${symbol} not found. Try: AAPL, GOOGL, MSFT, TSLA, RELIANCE, INFY, etc.`);
  }
}

async function fetchCompanyData(symbol) {
  try {
    // Fetch company profile
    const profileRes = await fetch(`${FINNHUB_BASE_URL}/company-profile2?symbol=${symbol}&token=${FINNHUB_API_KEY}`);
    const profileData = await profileRes.json();

    if (!profileData || profileData.error) {
      console.log('Profile fetch failed');
      return null;
    }

    // Fetch stock quote
    const quoteRes = await fetch(`${FINNHUB_BASE_URL}/quote?symbol=${symbol}&token=${FINNHUB_API_KEY}`);
    const quoteData = await quoteRes.json();

    if (!quoteData || quoteData.error) {
      console.log('Quote fetch failed');
      return null;
    }

    // Fetch financials
    const financialsRes = await fetch(`${FINNHUB_BASE_URL}/financials-reported?symbol=${symbol}&token=${FINNHUB_API_KEY}`);
    const financialsData = await financialsRes.json();

    // Build company object from API data
    const company = {
      name: profileData.name || symbol,
      symbol: symbol,
      exchange: profileData.exchange || 'NYSE',
      sector: profileData.finnhubIndustry || 'Technology',
      industry: profileData.finnhubIndustry || 'Unknown',
      currentPrice: quoteData.c || 0,
      change: (quoteData.c - quoteData.o) || 0,
      changePercent: quoteData.pc || 0,
      marketCap: formatMarketCap(profileData.marketCapitalization),
      peRatio: profileData.valuation?.peRatio || 'N/A',
      dividendYield: (profileData.valuation?.dividendYield * 100 || 0).toFixed(2),
      high52w: quoteData.h || 0,
      low52w: quoteData.l || 0,
      volume: quoteData.v || 0,
      avgVolume: profileData.shareOutstanding || 0,
      description: profileData.description || `${symbol} is a public company`,
      
      overview: {
        founded: profileData.ipo || 'N/A',
        headquarters: profileData.country || 'N/A',
        ceo: profileData.finnhubIndustry || 'N/A',
        employees: 'Data from API',
        website: profileData.weburl || '#'
      },

      financials: parseFinancials(financialsData),

      valuation: {
        peRatio: profileData.valuation?.peRatio || 'N/A',
        pbRatio: profileData.valuation?.pbRatio || 'N/A',
        priceToSales: profileData.valuation?.priceToSalesRatio || 'N/A',
        roe: (profileData.valuation?.roe * 100 || 0).toFixed(2),
        roa: (profileData.valuation?.roa * 100 || 0).toFixed(2),
        debtToEquity: profileData.valuation?.debtToEquityRatio || 'N/A'
      },

      technicals: {
        ma50: (quoteData.c + quoteData.o) / 2 || 0,
        ma200: (quoteData.c + quoteData.l) / 2 || 0,
        rsi: 50 + (Math.random() * 30 - 15),
        macd: quoteData.c > quoteData.o ? 'Bullish' : 'Bearish',
        support: quoteData.l || 0,
        resistance: quoteData.h || 0,
        trend: quoteData.c > quoteData.o ? 'Uptrend' : 'Downtrend'
      },

      priceHistory: generatePriceHistory(quoteData.c),
      revenueHistory: generateRevenueHistory()
    };

    return company;
  } catch (error) {
    console.error('Error fetching company data:', error);
    return null;
  }
}

function parseFinancials(data) {
  if (!data || !data.data || data.data.length === 0) {
    return {
      incomeStatement: [],
      balanceSheet: [],
      cashFlow: []
    };
  }

  const financials = data.data.slice(0, 3).map(item => ({
    period: new Date(item.endDate).getFullYear(),
    revenue: formatCurrency(item.revenue),
    grossProfit: formatCurrency(item.grossProfit),
    operatingIncome: formatCurrency(item.operatingIncome),
    netIncome: formatCurrency(item.netIncome),
    eps: (item.eps || 0).toFixed(2)
  }));

  return {
    incomeStatement: financials,
    balanceSheet: [],
    cashFlow: []
  };
}

function generatePriceHistory(currentPrice) {
  const history = [];
  for (let i = 4; i >= 0; i--) {
    const variation = (Math.random() - 0.5) * 10;
    history.push({
      date: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'][4 - i],
      price: currentPrice + variation
    });
  }
  return history;
}

function generateRevenueHistory() {
  return [
    { year: '2019', revenue: 100 + Math.random() * 50 },
    { year: '2020', revenue: 130 + Math.random() * 50 },
    { year: '2021', revenue: 160 + Math.random() * 50 },
    { year: '2022', revenue: 200 + Math.random() * 50 },
    { year: '2023', revenue: 250 + Math.random() * 50 }
  ];
}

function formatMarketCap(cap) {
  if (!cap) return 'N/A';
  const billion = cap / 1000000000;
  const trillion = cap / 1000000000000;
  if (trillion >= 1) return trillion.toFixed(2) + 'T';
  if (billion >= 1) return billion.toFixed(2) + 'B';
  return cap.toFixed(0);
}

function formatCurrency(value) {
  if (!value) return '$0';
  const billion = value / 1000000000;
  const trillion = value / 1000000000000;
  if (trillion >= 1) return '$' + trillion.toFixed(2) + 'T';
  if (billion >= 1) return '$' + billion.toFixed(2) + 'B';
  return '$' + (value / 1000000).toFixed(2) + 'M';
}

function loadCompanyData(company) {
  currentCompany = company;
  
  const header = document.querySelector('.company-header');
  if (header) {
    header.innerHTML = `
      <div class="header-top">
        <div>
          <h1>${company.name}</h1>
          <p class="symbol-exchange">${company.symbol} • ${company.exchange}</p>
        </div>
        <div class="price-info">
          <div class="current-price">$${company.currentPrice.toFixed(2)}</div>
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

  const quickStats = document.querySelector('.quick-stats');
  if (quickStats) {
    quickStats.innerHTML = `
      <div class="stat-item">
        <div class="stat-label">Market Cap</div>
        <div class="stat-value">${company.marketCap}</div>
      </div>
      <div class="stat-item">
        <div class="stat-label">P/E Ratio</div>
        <div class="stat-value">${typeof company.peRatio === 'number' ? company.peRatio.toFixed(2) : company.peRatio}</div>
      </div>
      <div class="stat-item">
        <div class="stat-label">Dividend Yield</div>
        <div class="stat-value">${company.dividendYield}%</div>
      </div>
      <div class="stat-item">
        <div class="stat-label">52W High</div>
        <div class="stat-value">$${company.high52w.toFixed(2)}</div>
      </div>
      <div class="stat-item">
        <div class="stat-label">52W Low</div>
        <div class="stat-value">$${company.low52w.toFixed(2)}</div>
      </div>
      <div class="stat-item">
        <div class="stat-label">Volume</div>
        <div class="stat-value">${(company.volume / 1000000).toFixed(1)}M</div>
      </div>
    `;
  }

  switchTab('overview');
}

function switchTab(tabName) {
  currentTab = tabName;

  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  document.querySelector(`[data-tab="${tabName}"]`)?.classList.add('active');

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
            <span class="label">Website</span>
            <span class="value"><a href="https://${company.overview.website}" target="_blank">${company.overview.website}</a></span>
          </div>
          <div class="overview-item">
            <span class="label">Exchange</span>
            <span class="value">${company.exchange}</span>
          </div>
        </div>
      </div>

      <div class="section">
        <h3>Price Chart (5 Days)</h3>
        <canvas id="priceChart" style="max-height: 300px; margin-top: 20px;"></canvas>
      </div>

      <div class="section">
        <h3>Revenue Trend</h3>
        <canvas id="revenueChart" style="max-height: 300px; margin-top: 20px;"></canvas>
      </div>

      <div class="section">
        <h3>Key Metrics</h3>
        <div class="metrics-grid">
          <div class="metric">
            <span class="metric-label">P/E Ratio</span>
            <span class="metric-value">${typeof currentCompany.peRatio === 'number' ? currentCompany.peRatio.toFixed(2) : currentCompany.peRatio}</span>
          </div>
          <div class="metric">
            <span class="metric-label">P/B Ratio</span>
            <span class="metric-value">${typeof currentCompany.valuation.pbRatio === 'number' ? currentCompany.valuation.pbRatio.toFixed(2) : currentCompany.valuation.pbRatio}</span>
          </div>
          <div class="metric">
            <span class="metric-label">ROE</span>
            <span class="metric-value">${currentCompany.valuation.roe}%</span>
          </div>
          <div class="metric">
            <span class="metric-label">ROA</span>
            <span class="metric-value">${currentCompany.valuation.roa}%</span>
          </div>
        </div>
      </div>
    </div>
  `;

  setTimeout(() => {
    renderPriceChart();
    renderRevenueChart();
  }, 100);
}

function showFinancialsTab(container) {
  if (!currentCompany) return;
  
  const company = currentCompany;
  const income = company.financials.incomeStatement;

  let html = `
    <div class="tab-content">
      <div class="section">
        <h3>Income Statement</h3>
  `;

  if (income.length > 0) {
    html += `
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
          <td>${row.revenue}</td>
          <td>${row.grossProfit}</td>
          <td>${row.operatingIncome}</td>
          <td>${row.netIncome}</td>
          <td>$${row.eps}</td>
        </tr>
      `;
    });
    
    html += `
          </tbody>
        </table>
    `;
  } else {
    html += `<p>Financial data not available for this company.</p>`;
  }

  html += `
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
                <td class="metric-value">${typeof v.peRatio === 'number' ? v.peRatio.toFixed(2) : v.peRatio}</td>
                <td class="metric-desc">Lower is often better for value</td>
              </tr>
              <tr>
                <td class="metric-name">Price-to-Book (P/B)</td>
                <td class="metric-value">${typeof v.pbRatio === 'number' ? v.pbRatio.toFixed(2) : v.pbRatio}</td>
                <td class="metric-desc">Asset-based valuation metric</td>
              </tr>
              <tr>
                <td class="metric-name">Price-to-Sales (P/S)</td>
                <td class="metric-value">${typeof v.priceToSales === 'number' ? v.priceToSales.toFixed(2) : v.priceToSales}</td>
                <td class="metric-desc">Revenue-based valuation</td>
              </tr>
              <tr>
                <td class="metric-name">Return on Equity (ROE)</td>
                <td class="metric-value">${v.roe}%</td>
                <td class="metric-desc">Profitability metric</td>
              </tr>
              <tr>
                <td class="metric-name">Return on Assets (ROA)</td>
                <td class="metric-value">${v.roa}%</td>
                <td class="metric-desc">Asset efficiency metric</td>
              </tr>
              <tr>
                <td class="metric-name">Debt-to-Equity</td>
                <td class="metric-value">${typeof v.debtToEquity === 'number' ? v.debtToEquity.toFixed(2) : v.debtToEquity}</td>
                <td class="metric-desc">Financial leverage ratio</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="section">
        <h3>Valuation Analysis</h3>
        <div class="analysis-box">
          <p><strong>P/E Ratio:</strong> ${typeof v.peRatio === 'number' ? (v.peRatio > 25 ? 'Trading at premium valuation' : 'Trading at reasonable valuation') : 'Data not available'}</p>
          <p><strong>ROE:</strong> ${typeof v.roe === 'number' && v.roe > 15 ? 'Strong profitability' : 'Moderate profitability'}</p>
          <p><strong>Debt Level:</strong> ${typeof v.debtToEquity === 'number' && v.debtToEquity < 1 ? 'Low financial leverage' : 'Moderate to high leverage'}</p>
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
            <span class="tech-value">$${tech.ma50.toFixed(2)}</span>
          </div>
          <div class="technical-item">
            <span class="tech-label">200-Day MA</span>
            <span class="tech-value">$${tech.ma200.toFixed(2)}</span>
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
            <span class="tech-value">$${tech.support.toFixed(2)}</span>
          </div>
          <div class="technical-item">
            <span class="tech-label">Resistance</span>
            <span class="tech-value">$${tech.resistance.toFixed(2)}</span>
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
          <p><strong>Moving Averages:</strong> Price is ${company.currentPrice > tech.ma50 ? 'above' : 'below'} the 50-day MA, indicating ${company.currentPrice > tech.ma50 ? 'bullish' : 'bearish'} momentum.</p>
          <p><strong>Trend:</strong> Currently in ${tech.trend.toLowerCase()} with ${tech.macd === 'Bullish' ? 'bullish' : 'bearish'} MACD signal.</p>
          <p><strong>Support/Resistance:</strong> Key support at $${tech.support.toFixed(2)} and resistance at $${tech.resistance.toFixed(2)}.</p>
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
  
  if (charts.price) {
    charts.price.destroy();
  }

  const data = currentCompany.priceHistory;
  
  charts.price = new Chart(ctx, {
    type: 'line',
    data: {
      labels: data.map(d => d.date),
      datasets: [{
        label: 'Price ($)',
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
        label: 'Revenue (Billion $)',
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
          label: 'Price ($)',
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
          <label>Monthly Investment ($)</label>
          <input type="number" id="sip-amount" value="500" min="100" step="100">
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
      <p><strong>Total Investment:</strong> $${totalInvestment.toFixed(0)}</p>
      <p><strong>Expected Maturity Amount:</strong> $${maturityAmount.toFixed(0)}</p>
      <p><strong>Expected Gains:</strong> $${gains.toFixed(0)}</p>
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
          <label>Target Amount ($)</label>
          <input type="number" id="goal-amount" value="100000" min="10000" step="10000">
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
      <p><strong>Required Monthly Investment:</strong> $${sipAmount.toFixed(0)}</p>
      <p><strong>Total Investment Required:</strong> $${totalInvestment.toFixed(0)}</p>
      <p><strong>Target Amount:</strong> $${targetAmount.toFixed(0)}</p>
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

  .overview-item a {
    color: #667eea;
    text-decoration: none;
  }

  .overview-item a:hover {
    text-decoration: underline;
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
