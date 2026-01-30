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

btn.addEventListener('click', () => {
  const query = searchInput.value.trim();
  if (!query) return;

  //redirect with query params
  window.location.href = `search.html?q=${encodeURIComponent(query)}`;
  searchInput.value = '';
});
