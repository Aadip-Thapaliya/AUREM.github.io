const currencySymbols = {
  USD: '$',
  EUR: '€',
  INR: '₹',
  GBP: '£',
  JPY: '¥'
};

const currencyLocales = {
  USD: 'en-US',
  EUR: 'de-DE',
  INR: 'en-IN',
  GBP: 'en-GB',
  JPY: 'ja-JP'
};

document.getElementById('currencySelector').addEventListener('change', function () {
  const selectedCurrency = this.value;
  const prices = document.querySelectorAll('.price');

  prices.forEach(priceElement => {
    const amount = parseFloat(priceElement.getAttribute('data-amount'));
    const formatted = new Intl.NumberFormat(currencyLocales[selectedCurrency], {
      style: 'currency',
      currency: selectedCurrency
    }).format(amount);

    priceElement.textContent = formatted;
  });
});
