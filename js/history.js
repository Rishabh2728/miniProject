const historyList = document.getElementById('historyList');

let history = JSON.parse(localStorage.getItem("searchHistory")) || [];

function displayHistory() {
    historyList.innerHTML = '';
    if(history.length > 0){
        history.forEach(item => {
            const div = document.createElement('div');
            div.className = 'history-item';
            div.innerHTML = `
                <p>${item.query}</p>
                <span>${new Date(item.time).toLocaleString()}</span>
            `;
            div.addEventListener('click', () => {
                window.location.href = `search.html?q=${encodeURIComponent(item.query)}`;
            });
            historyList.appendChild(div);
        });
    } else {
        historyList.innerHTML = '<p class="loading">No search history found</p>';
    }
}

function clearHistory() {
    if(confirm('Are you sure you want to clear all search history?')) {
        localStorage.removeItem('searchHistory');
        history = [];
        displayHistory();
    }
}

displayHistory();