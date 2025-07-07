document.addEventListener("DOMContentLoaded", () => {
  const newsList = document.getElementById("newsList");

  const apiKey = "6e462b9c97434f358abe80530bf7fb75";  
  const apiUrl = `https://newsapi.org/v2/top-headlines?category=business&language=en&pageSize=10&apiKey=${apiKey}`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      newsList.innerHTML = "";
      if (data.articles && data.articles.length > 0) {
        data.articles.forEach(article => {
          const li = document.createElement("li");
          const link = document.createElement("a");
          link.href = article.url;
          link.textContent = article.title;
          link.target = "_blank";
          li.appendChild(link);
          newsList.appendChild(li);
        });
      } else {
        newsList.innerHTML = "<li>No news available right now.</li>";
      }
    })
    .catch(() => {
      newsList.innerHTML = "<li>Failed to load news. Please try again later.</li>";
    });
});
