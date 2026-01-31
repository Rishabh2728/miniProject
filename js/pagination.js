let currentPage = 1;
const itemsPerPage = 12;
let allProducts = [];

function displayPage(page) {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const productsToDisplay = allProducts.slice(startIndex, endIndex);
    
    displayProducts(productsToDisplay);
    updatePaginationUI();
}

function updatePaginationUI() {
    const totalPages = Math.ceil(allProducts.length / itemsPerPage);
    const paginationDiv = document.getElementById('pagination');
    
    let paginationHTML = '';
    
    if(currentPage > 1) {
        paginationHTML += `<button onclick="goToPage(${currentPage - 1})" class="page-btn">Previous</button>`;
    }
    
    paginationHTML += `<span class="page-info">Page ${currentPage} of ${totalPages}</span>`;
    
    if(currentPage < totalPages) {
        paginationHTML += `<button onclick="goToPage(${currentPage + 1})" class="page-btn">Next</button>`;
    }
    
    paginationDiv.innerHTML = paginationHTML;
    console.log(allProducts)
}

function goToPage(page) {
    currentPage = page;
    displayPage(currentPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
}