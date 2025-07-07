window.addEventListener('DOMContentLoaded', () => {
  const hero = document.querySelector('.hero-content');
  if (hero) hero.classList.add('animate');

  const name = localStorage.getItem("displayName") || "Trader";
  const greetingEl = document.getElementById("greetingText");
  const subtitleEl = document.getElementById("destinyLine");

  if (greetingEl) {
    greetingEl.textContent = `You have been chosen as ${name}.`;
  }

  if (subtitleEl) {
    const lines = [
      "Do you accept your destiny?",
      "The market awaits your command.",
      "Step forward and claim your realm.",
      "Only the brave conquer volatility."
    ];
    const randomLine = lines[Math.floor(Math.random() * lines.length)];
    subtitleEl.textContent = randomLine;
  }

  const yesBtn = document.getElementById("yes-btn");
  const noBtn = document.getElementById("no-btn");

  if (yesBtn) {
    yesBtn.addEventListener("click", () => {
      console.log("main.js loaded");
      window.location.href = "signup.html"; // Change this if needed
    });
  }

  if (noBtn) {
    noBtn.addEventListener("click", () => {
      const declineModal = new bootstrap.Modal(document.getElementById("goodbyeModal"));
      declineModal.show();
    });
  }
}); 