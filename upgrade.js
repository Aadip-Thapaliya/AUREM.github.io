document.addEventListener("DOMContentLoaded", function () {
  // Simulated portfolio chart data
  const chart = new Chart(document.getElementById("portfolioChart"), {
    type: "bar",
    data: {
      labels: ["AAPL", "AMZN", "GOOGL", "TSLA"],
      datasets: [
        {
          label: "Value in USD",
          data: [3200, 1800, 2400, 1050],
          backgroundColor: "#00ffd1",
          borderColor: "#00ccaa",
          borderWidth: 1,
        },
      ],
    },
    options: {
      plugins: {
        legend: {
          labels: { color: "#fff" }
        }
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

  // Optional: Rotate motivational quote every few seconds
  const quotes = [
    "“Your capital reflects your confidence.”",
    "“The wise invest — not react.”",
    "“Time in the market beats timing the market.”",
    "“Track smart. Grow smarter.”",
  ];

  const quoteElement = document.getElementById("portfolioMessage");
  setInterval(() => {
    quoteElement.textContent = quotes[Math.floor(Math.random() * quotes.length)];
  }, 7000);
}); 