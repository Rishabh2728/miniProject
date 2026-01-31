const productsDiv = document.getElementById('products');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');

fetch('https://fakestoreapi.com/products')
    .then(response => response.json())
    .then(data => {
        allProducts = data;
        displayPage(currentPage);
    })
    .catch(error => {
        productsDiv.innerHTML = '<p class="loading">Error loading products</p>';
        console.error('Error:', error);
    });

function displayProducts(products) {
    productsDiv.innerHTML = '';
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product';
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.title}">
            <h3>${product.title}</h3>
            <p class="price">$${product.price}</p>
        `;
        productCard.addEventListener('click', () => {
            saveToViewHistory(product.id);
            window.location.href = `product-details.html?id=${product.id}`;
        });
        productsDiv.appendChild(productCard);
    });
}

function saveToViewHistory(productId) {
    let viewHistory = JSON.parse(localStorage.getItem("viewHistory")) || [];
    
    viewHistory = viewHistory.filter(item => item.id !== productId);
    viewHistory.unshift({
        id: productId,
        timestamp: Date.now()
    });
    
    if(viewHistory.length > 20) {
        viewHistory = viewHistory.slice(0, 20);
    }
    
    localStorage.setItem("viewHistory", JSON.stringify(viewHistory));
}

searchBtn.addEventListener('click', () => {
    const searchTerm = searchInput.value;
    const params = new URLSearchParams({ q: searchTerm });
    window.location.href = `search.html?${params.toString()}`;

    let history = JSON.parse(localStorage.getItem("searchHistory"))||[];

    if(!history.find(item => item.query === searchTerm)){
        history.push({
            query: searchTerm,
            time: Date.now()
        })
        localStorage.setItem("searchHistory", JSON.stringify(history));
    }
    
});


//now we develop suggestioj feature


const suggestionBox = document.getElementById("suggestion")
let debounceTimer;

searchInput.addEventListener("input",()=>{
    console.log("Suggestion working");
    
    clearTimeout(debounceTimer);
    
    debounceTimer = setTimeout(()=>{
        suggestionBox.innerHTML=""

        const text = searchInput.value.toLowerCase();
        const histroy = JSON.parse(localStorage.getItem("searchHistory")) || []


        const matches = histroy.filter(item=> item.query.toLowerCase().includes(text))

        if(text && matches.length > 0){
            matches.forEach(item=>{
                const div = document.createElement("div")
                div.className="suggestion-items"
                div.innerHTML=item.query
               
                div.addEventListener("click" , ()=>{
                    searchInput.value = item.query;
                    suggestionBox.innerHTML="";
                })

                suggestionBox.appendChild(div);
            })
            suggestionBox.style.display = "block";
        } else {
            suggestionBox.style.display = "none";
        }
    }, 300);
})