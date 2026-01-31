const productDetail = document.getElementById('productDetail');

const params = new URLSearchParams(window.location.search);
const productId = params.get('id');

if(productId) {
    fetch(`https://fakestoreapi.com/products/${productId}`)
        .then(response => response.json())
        .then(product => {
            productDetail.innerHTML = `
                <div class="detail-container">
                    <div class="detail-image">
                        <img src="${product.image}" alt="${product.title}">
                    </div>
                    <div class="detail-info">
                        <h1>${product.title}</h1>
                        <p class="category">${product.category}</p>
                        <p class="price">$${product.price}</p>
                        <div class="rating">
                            <span>⭐ ${product.rating.rate}</span>
                            <span>(${product.rating.count} reviews)</span>
                        </div>
                        <p class="description">${product.description}</p>
                    </div>
                </div>
            `;
        })
        .catch(error => {
            productDetail.innerHTML = '<p class="loading">Error loading product details</p>';
            console.error('Error:', error);
        });
} else {
    productDetail.innerHTML = '<p class="loading">No product selected</p>';
}