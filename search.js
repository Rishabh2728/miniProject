const container = document.getElementById('productContainer');

// 1. Get the search query from the URL
let param = new URLSearchParams(window.location.search);
let query = param.get('q') ? param.get('q').toLowerCase() : '';

// 2. Fetch the data
fetch('https://dummyjson.com/products')
  .then(res => res.json())
  .then(data => {
    const products = data.products;

    // 3. Filter products based on the URL query
    let filtered = products.filter(p => {
      return p.title.toLowerCase().includes(query);
    });

    // 4. Display the filtered products
    displayProducts(filtered);
  })
  .catch(err => console.error('Error fetching data:', err));

// Helper function to render cards
function displayProducts(productsList) {
  container.innerHTML = ''; // Clear existing content

  if (productsList.length === 0) {
    container.innerHTML = '<p>No products found.</p>';
    return;
  }

  productsList.forEach(product => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <img src="${product.thumbnail}" alt="${product.title}">
      <h3>${product.title}</h3>
      <p class="price">$ ${product.price}</p>
    `;
    container.appendChild(card);
  });
}
