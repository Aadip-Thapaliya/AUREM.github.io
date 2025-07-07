document.addEventListener("DOMContentLoaded", function () {
  const API_KEY = "S9XDHEF3TLU3ED9N";

  // Read symbol from query param
  const urlParams = new URLSearchParams(window.location.search);
  const symbol = urlParams.get("symbol") || "AAPL";

  const stockHeader = document.getElementById("stockHeader");
  const stockPriceEl = document.getElementById("stockPrice");
  const stockDesc = document.getElementById("stockDescription");
  const ctx = document.getElementById("stockDetailChart").getContext("2d");

  // Display symbol in banner
  stockHeader.innerHTML = `<h1>${symbol} - Loading...</h1>`;

  // Fetch daily time series data (last 30 days)
  async function fetchDailyData() {
    try {
      const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${symbol}&outputsize=compact&apikey=${API_KEY}`;
      const res = await fetch(url);
      const data = await res.json();

      if (data["Error Message"] || !data["Time Series (Daily)"]) {
        stockHeader.innerHTML = `<h1>${symbol} - Data not found</h1>`;
        stockPriceEl.textContent = "";
        return null;
      }
      return data["Time Series (Daily)"];
    } catch (e) {
      console.error("Error fetching daily data", e);
      stockHeader.innerHTML = `<h1>${symbol} - Error loading data</h1>`;
      stockPriceEl.textContent = "";
      return null;
    }
  }

  // Fetch company overview for description
  async function fetchCompanyOverview() {
    try {
      const url = `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${symbol}&apikey=${API_KEY}`;
      const res = await fetch(url);
      const data = await res.json();
      if (data.Name) {
        return data;
      }
    } catch (e) {
      console.error("Error fetching overview", e);
    }
    return null;
  }

  // Render chart with daily close price
  function renderChart(dailyData) {
    // dailyData is object with date keys, values with fields

    const dates = Object.keys(dailyData).sort((a, b) => new Date(a) - new Date(b));
    const closePrices = dates.map(date => parseFloat(dailyData[date]["4. close"]));

    new Chart(ctx, {
      type: "line",
      data: {
        labels: dates,
        datasets: [{
          label: `${symbol} Close Price`,
          data: closePrices,
          borderColor: "#00ffd1",
          backgroundColor: "rgba(0, 255, 209, 0.3)",
          fill: true,
          tension: 0.2,
          pointRadius: 0
        }]
      },
      options: {
        responsive: true,
        scales: {
          x: {
            display: true,
            title: {
              display: true,
              text: "Date",
              color: "#00ffd1"
            },
            ticks: {
              color: "#00ffd1",
              maxTicksLimit: 10
            }
          },
          y: {
            display: true,
            title: {
              display: true,
              text: "Price (USD)",
              color: "#00ffd1"
            },
            ticks: {
              color: "#00ffd1"
            }
          }
        },
        plugins: {
          legend: {
            labels: {
              color: "#00ffd1"
            }
          },
          tooltip: {
            mode: 'index',
            intersect: false,
          }
        }
      }
    });
  }

  // Fetch and display everything
  async function init() {
    stockHeader.innerHTML = `<h1>${symbol}</h1>`;

    // Fetch daily data
    const dailyData = await fetchDailyData();

    if (!dailyData) {
      stockPriceEl.textContent = "No price data available.";
      return;
    }

    // Show latest close price
    const latestDate = Object.keys(dailyData).sort((a, b) => new Date(b) - new Date(a))[0];
    const latestPrice = dailyData[latestDate]["4. close"];
    stockPriceEl.textContent = `$${parseFloat(latestPrice).toFixed(2)}`;

    renderChart(dailyData);

    // Fetch company overview
    const overview = await fetchCompanyOverview();
    if (overview && overview.Description) {
      stockDesc.textContent = overview.Description;
    } else {
      stockDesc.textContent = "No company description available.";
    }
  }

  init();
});
