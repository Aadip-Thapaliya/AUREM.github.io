console.log("Login JS Loaded");

document.addEventListener("DOMContentLoaded", function () {
  // Set default credentials once
  if (!localStorage.getItem("traderAccounts")) {
    const defaultAccounts = [
      { email: "admin@aurem.com", password: "admin123" },
      { email: "Jihanpaul@yahoo.com", password: "JP$10000" }
    ];
    localStorage.setItem("traderAccounts", JSON.stringify(defaultAccounts));
    console.log("Default admin accounts saved to localStorage");
  }

  const loginForm = document.getElementById("login-form");

  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("login-email").value.trim();
    const password = document.getElementById("login-password").value.trim();

    if (!email || !password) {
      alert("Please fill in all fields.");
      return;
    }

    const accounts = JSON.parse(localStorage.getItem("traderAccounts") || "[]");

    const match = accounts.find(account => account.email === email && account.password === password);

    console.log("Entered email:", email);
    console.log("Entered password:", password);
    console.log("Accounts:", accounts);

    if (match) {
      alert("Welcome Back, Trader!");
      window.location.href = "market.html";
    } else {
      alert("Incorrect email or password. Try again.");
    }
  });
});
