const container = document.getElementById('productContainer');

fetch('https://dummyjson.com/products')
  .then(res => res.json())
  .then(data => {
    const products = data.products;

    products.forEach(product => {
      const card = document.createElement('div');
      card.className = 'product-card';

      card.innerHTML = `
            <img src="${product.thumbnail}" alt="${product.title}">
            <h3>${product.title}</h3>
            <p class="price">₹ ${product.price}</p>
          `;

      container.appendChild(card);
    });
  })
  .catch(err => console.log(err));

  


/////////////////////////////////////////////////////////////Search feature//////////////////////////////////////////
const btn = document.getElementById('btn');
const searchInput = document.getElementById('searchInput');
const suggestionBox = document.getElementById("suggestion");

searchInput.addEventListener("input", () =>{
  console.log("Suggestion working");

  const text = searchInput.value.toLowerCase();
  const history = JSON.parse(localStorage.getItem("searchHistory")) || [];
  console.log("History: ",history);

  const matches = history.filter(item =>
    item.query.toLowerCase().includes(text)
  );

  suggestionBox.innerHTML = "";
  matches.forEach(item =>{
    const div = document.getElementById("div");
    div.className = "suggestion-item";
    div.innerHTML = "";

    div.addEventListener("click",() =>{
      searchInput.value = item.query;
      suggestionBox.innerHTML = "";
    });

    suggestionBox.appendChild(div);

  });

  

});

btn.addEventListener('click', () => {

  const query = searchInput.value.trim();
  if (!query) return;

  //save to localstorage

  let history = JSON.parse(localStorage.getItem("searchHistory")) || [];

  if (!history.includes(query)) {
    history.push({
      query: query,
      time: Date.now()
    });
  localStorage.setItem("searchHistory", JSON.stringify(history));
  console.log("his",history);

  }
  //redirect with query params
  window.location.href = `search.html?q=${encodeURIComponent(query)}`;
  searchInput.value = '';
});