document.addEventListener("DOMContentLoaded", function () {
  const symbols = ["AAPL", "AMZN", "GOOGL", "TSLA"];
  const apiKey = "d7f6f713d3004cc5b0c62ddba0a28cee";
  const apiUrl = `https://api.twelvedata.com/price?symbol=${symbols.join(",")}&apikey=${apiKey}`;
  const quoteElement = document.getElementById("portfolioMessage");

  const defaultPrices = {
    AAPL: 3200,
    AMZN: 1800,
    GOOGL: 2400,
    TSLA: 1050
  };

  // 🔁 Rotate motivational quotes
  const quotes = [
    "“Your capital reflects your confidence.”",
    "“The wise invest — not react.”",
    "“Time in the market beats timing the market.”",
    "“Track smart. Grow smarter.”"
  ];
  setInterval(() => {
    quoteElement.textContent = quotes[Math.floor(Math.random() * quotes.length)];
  }, 7000);

  // 📊 Fetch real-time stock prices
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      const livePrices = {};
      symbols.forEach(symbol => {
        const price = parseFloat(data[symbol]?.price || defaultPrices[symbol]);
        livePrices[symbol] = price;
      });

      updateHoldingsPrices(livePrices);
      createChart(symbols, Object.values(livePrices));
    })
    .catch(error => {
      console.error("Error fetching portfolio data:", error);
      updateHoldingsPrices(defaultPrices);
      createChart(symbols, Object.values(defaultPrices));
    });

  // ✅ Update holdings list on page
  function updateHoldingsPrices(prices) {
    const priceElements = document.querySelectorAll('.price');
    priceElements.forEach(el => {
      const amount = parseFloat(el.getAttribute('data-amount'));
      const symbol = guessSymbolFromElement(el);
      if (symbol && prices[symbol] !== undefined) {
        el.textContent = typeof formatPrice === "function"
          ? formatPrice(prices[symbol])
          : `$${prices[symbol].toFixed(2)}`;
      } else {
        el.textContent = typeof formatPrice === "function"
          ? formatPrice(amount)
          : `$${amount.toFixed(2)}`;
      }
    });
  }

  // Helper to guess symbol from surrounding text
  function guessSymbolFromElement(el) {
    const text = el.parentElement.textContent;
    for (const sym of symbols) {
      if (text.includes(sym)) return sym;
    }
    return null;
  }

  // 📈 Draw chart
  function createChart(labels, data) {
    const ctx = document.getElementById("portfolioChart").getContext("2d");
    new Chart(ctx, {
      type: "bar",
      data: {
        labels: labels,
        datasets: [{
          label: "Real-Time Value (USD)",
          data: data,
          backgroundColor: "#00ffd1",
          borderColor: "#00ccaa",
          borderWidth: 1,
        }]
      },
      options: {
        plugins: {
          legend: { labels: { color: "#fff" } }
        },
        scales: {
          x: {
            ticks: { color: "#ccc" },
            grid: { color: "#333" }
          },
          y: {
            ticks: { color: "#ccc" },
            grid: { color: "#333" }
          }
        }
      }
    });
  }
});
