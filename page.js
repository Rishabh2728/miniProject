const container = document.getElementById("product");

fetch("https://dummyjson.com/products")
.then(response => response.json())
.then(data =>{
    data.products.forEach(product => {
        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
            <img src = "${product.thumbnail}" alt="${product.title}">
            <h3>${product.title}</h3>
            <p>${product.price}</p>`;

        container.appendChild(card);
    });
})
.catch(error => {
    console.log("Error fetching data:", error);
});