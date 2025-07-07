const API_HOST = "apidojo-yahoo-finance-v1.p.rapidapi.com";
const API_KEY = "caa42ed972msh0009c27bca629bdp103b6ejsn88ec17481d25"; // Your RapidAPI Key
const symbol = "GOOGL";

const priceEl = document.getElementById("price");
const changeEl = document.getElementById("change");
const ctx = document.getElementById("stockChart").getContext("2d");
const buttons = document.querySelectorAll(".chart-buttons button");

let chart;

// Fetch current stock price from Yahoo Finance
async function fetchQuote() {
  const url = `https://${API_HOST}/stock/v2/get-summary?symbol=${symbol}&region=US`;

  const res = await fetch(url, {
    method: "GET",
    headers: {
      "x-rapidapi-host": API_HOST,
      "x-rapidapi-key": API_KEY,
    }
  });

  const data = await res.json();
  const price = data.price?.regularMarketPrice?.raw;
  const change = data.price?.regularMarketChangePercent?.raw;

  return { price, change };
}

// Fetch historical chart data
async function fetchHistorical(range) {
  const url = `https://${API_HOST}/stock/v3/get-chart?interval=1d&symbol=${symbol}&range=${range}&region=US`;

  const res = await fetch(url, {
    method: "GET",
    headers: {
      "x-rapidapi-host": API_HOST,
      "x-rapidapi-key": API_KEY,
    }
  });

  const data = await res.json();

  if (!data.chart || data.chart.error) {
    throw new Error("Failed to fetch historical data");
  }

  const result = data.chart.result[0];
  const timestamps = result.timestamp;
  const closes = result.indicators.adjclose[0].adjclose;

  return { timestamps, closes };
}

function formatDate(ts) {
  const d = new Date(ts * 1000);
  return `${d.getMonth() + 1}/${d.getDate()}`;
}

async function updateChart(range = "1mo") {
  try {
    const { timestamps, closes } = await fetchHistorical(range);

    const labels = timestamps.map(formatDate);
    const prices = closes;

    if (chart) chart.destroy();

    chart = new Chart(ctx, {
      type: "line",
      data: {
        labels,
        datasets: [{
          label: `${symbol} Price`,
          data: prices,
          borderColor: "#00ffd1",
          backgroundColor: "rgba(0, 255, 209, 0.2)",
          fill: true,
          tension: 0.3,
          pointRadius: 0,
        }]
      },
      options: {
        responsive: true,
        scales: {
          x: { display: true },
          y: { display: true, beginAtZero: false }
        },
        plugins: {
          legend: { display: false }
        }
      }
    });
  } catch (err) {
    alert(err.message);
  }
}

async function updatePrice() {
  try {
    const { price, change } = await fetchQuote();

    if (price != null && change != null) {
      priceEl.textContent = `Price: $${price.toFixed(2)}`;
      changeEl.textContent = `Change: ${change >= 0 ? "+" : ""}${change.toFixed(2)}%`;
      changeEl.style.color = change >= 0 ? "#4caf50" : "#f44336";
    } else {
      priceEl.textContent = "Price: N/A";
      changeEl.textContent = "";
    }
  } catch {
    priceEl.textContent = "Price: N/A";
    changeEl.textContent = "";
  }
}

// Button range mappings
const rangeMap = {
  7: "1mo",
  30: "3mo",
  90: "6mo",
  180: "1y"
};

buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    const days = parseInt(btn.getAttribute("data-range"));
    const range = rangeMap[days] || "1mo";
    updateChart(range);
  });
});

async function init() {
  await updatePrice();
  await updateChart("1mo");
}

init();
setInterval(updatePrice, 60000); // refresh price every minute
