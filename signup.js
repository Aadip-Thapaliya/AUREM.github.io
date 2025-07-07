// signup.js

document.addEventListener('DOMContentLoaded', function () {
  const roleBox = document.getElementById('roleBox');
  const signupForm = document.getElementById('signup-form');

  // Handle role acceptance
  document.getElementById('accept-btn').addEventListener('click', () => {
    roleBox.style.display = 'none';
    signupForm.style.display = 'block';
  });

let tempName = '';
let tempEmail = '';
let tempPassword = '';

// On form submit, save to temp vars, don't redirect yet
document.getElementById("form").addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!name || !email || !password) {
        alert("Please fill in all fields.");
        return;
    }

    // Save to temp
    tempName = name;
    tempEmail = email;
    tempPassword = password;

    // Show role acceptance
    document.getElementById("signup-form").style.display = "none";
    document.getElementById("roleBox").style.display = "block";
});

// On accept button click, THEN save to localStorage
document.getElementById("accept-btn").addEventListener("click", () => {
    if (tempEmail && tempPassword) {
        localStorage.setItem("traderName", tempName);
        localStorage.setItem("traderEmail", tempEmail);
        localStorage.setItem("traderPassword", tempPassword);

        alert(`Welcome Trader ${tempName}. Registration successful.`);
        window.location.href = "login.html";
    } else {
        alert("Please fill in the signup form first.");
    }
}); 
}); 