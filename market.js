document.addEventListener("DOMContentLoaded", () => {
  const stocks = [
    { symbol: "AAPL", name: "Apple Inc.", about: "Consumer electronics & software", page: "apple.html" },
    { symbol: "GOOGL", name: "Alphabet Inc.", about: "Search engine & digital ads", page: "google.html" },
    { symbol: "MSFT", name: "Microsoft Corp.", about: "Software & cloud computing", page: "microsoft.html" },
    { symbol: "AMZN", name: "Amazon.com Inc.", about: "E-commerce & cloud services", page: "amazon.html" },
    { symbol: "TSLA", name: "Tesla Inc.", about: "Electric vehicles & energy", page: "tesla.html" }
  ];

  const stocksList = document.getElementById("stocksList");
  const quoteBox = document.getElementById("motivationalQuote");

  // Function to format prices in USD
  function formatPrice(price) {
    return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(price);
  }

  // Dummy prices and changes (replace with live API if needed)
  const dummyData = {
    AAPL: { price: 213.55, change: 0.52 },
    GOOGL: { price: 179.53, change: 0.50 },
    MSFT: { price: 498.84, change: 1.58 },
    AMZN: { price: 223.41, change: 1.59 },
    TSLA: { price: 315.35, change: -0.10 }
  };

  // Create and display stock cards
  stocks.forEach(stock => {
    const card = document.createElement("div");
    card.className = "stock-card";

    // Fill with stock info
    card.innerHTML = `
      <div class="stock-symbol">${stock.symbol}</div>
      <div class="stock-name">${stock.name}</div>
      <div class="stock-price">${formatPrice(dummyData[stock.symbol].price)}</div>
      <div class="stock-change ${dummyData[stock.symbol].change >= 0 ? "positive" : "negative"}">
        ${dummyData[stock.symbol].change >= 0 ? "+" : ""}${dummyData[stock.symbol].change.toFixed(2)}%
      </div>
      <div class="stock-about">${stock.about}</div>
    `;

    // On click go to respective page
    card.addEventListener("click", () => {
      window.location.href = stock.page;
    });

    stocksList.appendChild(card);
  });

  // Rotate motivational quotes every 8 seconds
  const quotes = [
    "Fortune favors the disciplined.",
    "Patience is profitable.",
    "The market rewards the calm and the calculated.",
    "A true trader trades the data, not emotions.",
    "Welcome to the Arena. Show no fear."
  ];

  setInterval(() => {
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    quoteBox.textContent = `“${randomQuote}”`;
  }, 8000);
});
