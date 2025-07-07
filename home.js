document.addEventListener("DOMContentLoaded", () => {
  // Default is EUR now
  const preferredCurrency = localStorage.getItem("preferredCurrency") || "EUR";

  function formatPrice(value) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: preferredCurrency,
    }).format(value);
  }

  // Update market snapshot prices
  document.querySelectorAll(".price").forEach(el => {
    const price = parseFloat(el.getAttribute("data-price"));
    el.textContent = formatPrice(price);
  });

  // Update portfolio total
  const portfolioEl = document.getElementById("portfolioValue");
  if (portfolioEl) {
    const portfolioPrice = parseFloat(portfolioEl.getAttribute("data-price"));
    portfolioEl.textContent = formatPrice(portfolioPrice);
  }
});
