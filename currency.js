const fromCurrency = document.getElementById("fromCurrency");
const toCurrency = document.getElementById("toCurrency");
const amountInput = document.getElementById("amount");
const resultBox = document.getElementById("result");
const convertBtn = document.getElementById("convertBtn");

document.addEventListener("DOMContentLoaded", loadCurrencies);
convertBtn.addEventListener("click", convertCurrency);

async function loadCurrencies() {
  try {
    const res = await fetch("https://api.frankfurter.app/currencies");
    const data = await res.json();

    for (const code in data) {
      const desc = data[code];
      const option1 = new Option(`${code} - ${desc}`, code);
      const option2 = new Option(`${code} - ${desc}`, code);
      fromCurrency.add(option1);
      toCurrency.add(option2);
    }

    fromCurrency.value = "USD";
    toCurrency.value = "EUR";
  } catch (error) {
    resultBox.textContent = "Error loading currencies.";
  }
}

async function convertCurrency() {
  const from = fromCurrency.value;
  const to = toCurrency.value;
  const amount = parseFloat(amountInput.value);

  if (isNaN(amount) || amount <= 0) {
    resultBox.textContent = "Please enter a valid amount.";
    return;
  }

  if (from === to) {
    resultBox.textContent = "Please choose different currencies.";
    return;
  }

  try {
    const res = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${from}&to=${to}`);
    const data = await res.json();
    const rate = data.rates[to];

    if (!rate) {
      resultBox.textContent = "Conversion not available.";
    } else {
      resultBox.textContent = `${amount} ${from} = ${rate.toFixed(2)} ${to}`;
    }
  } catch (error) {
    resultBox.textContent = "Conversion failed. Try again later.";
  }
}
