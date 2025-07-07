// === Save and load Display Name ===
function saveName() {
  const name = document.getElementById("nameInput").value.trim();
  if (name) {
    localStorage.setItem("displayName", name);
    alert(`Welcome, ${name}! Your name is saved.`);
  } else {
    alert("Please enter a valid name.");
  }
}

// === Toggle Dark Mode ===
function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
  const isDarkMode = document.body.classList.contains("dark-mode");
  localStorage.setItem("darkMode", isDarkMode);
}

// === Save Currency ===
function saveCurrency() {
  const currency = document.getElementById("currencySelector").value;
  localStorage.setItem("selectedCurrency", currency);
  alert(`Currency set to ${currency}. It will apply on all pages.`);
}

// === Load Settings on Page Load ===
document.addEventListener("DOMContentLoaded", () => {
  // Load Name
  const savedName = localStorage.getItem("displayName");
  if (savedName) {
    document.getElementById("nameInput").value = savedName;
  }

  // Load Dark Mode
  const isDark = localStorage.getItem("darkMode") === "true";
  if (isDark) {
    document.body.classList.add("dark-mode");
  }

  // Load Currency
  const savedCurrency = localStorage.getItem("selectedCurrency") || "USD";
  const selector = document.getElementById("currencySelector");
  if (selector) {
    selector.value = savedCurrency;
  }
});
