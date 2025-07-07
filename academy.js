document.addEventListener("DOMContentLoaded", function () {
  const introText = [
    "Welcome to Aurem Academy. Here begins your transformation as a Trader.",
    "Absorb. Apply. Ascend.",
    "Learn today, lead tomorrow."
  ];

  let current = 0;
  const tagline = document.querySelector(".tagline");

  setInterval(() => {
  tagline.style.opacity = 0;
  setTimeout(() => {
    tagline.textContent = introText[current];
    tagline.style.opacity = 1;
    current = (current + 1) % introText.length;
  }, 500);
}, 6000); 
}); 