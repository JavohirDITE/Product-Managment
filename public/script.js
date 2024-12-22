let products = [];
let currentProductId = null;

function loadProducts() {
    fetch('/api/products')
        .then(response => response.json())
        .then(data => {
            products = data;
            displayProducts();
        })
        .catch(error => console.error('Ошибка:', error));
}

function displayProducts() {
    const productList = document.getElementById('productList');
    productList.innerHTML = '';
    products.forEach(product => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${product.id}</td>
            <td>
                <img src="${product.image_url || '/placeholder.png'}" 
                     alt="Фото товара" 
                     class="thumbnail"
                     onclick="showImageUploadPopup(${product.id})">
            </td>
            <td>${product.name}</td>
            <td>${product.unit}</td>
            <td>${product.quantity}</td>
            <td>${product.price}</td>
            <td>${(product.quantity * product.price).toFixed(2)}</td>
            <td>
                <button onclick="showPopup(${product.id})">Изменить</button>
                <button onclick="showCalculatorPopup(${product.id})">Рассчитать</button>
            </td>
        `;
        productList.appendChild(row);
    });
}

function showPopup(productId) {
    currentProductId = productId;
    const product = products.find(p => p.id === productId);
    document.getElementById('popupProductName').textContent = product.name;
    document.getElementById('popupProductImage').src = product.image_url || '/placeholder.png';
    document.getElementById('popup').style.display = 'block';
}

function closePopup() {
    document.getElementById('popup').style.display = 'none';
}

function updateQuantity(change) {
    const quantityChange = parseFloat(document.getElementById('quantityChange').value);
    const product = products.find(p => p.id === currentProductId);
    const newQuantity = product.quantity + (change * quantityChange);

    fetch(`/api/products/${currentProductId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ quantity: newQuantity }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.changes > 0) {
            loadProducts();
        }
    })
    .catch((error) => {
        console.error('Ошибка:', error);
    });

    closePopup();
}

function calculateTotal() {
    const total = products.reduce((sum, product) => sum + (product.quantity * product.price), 0);
    document.getElementById('totalSum').textContent = total.toFixed(2);
}

function showCalculatorPopup(productId) {
    currentProductId = productId;
    const product = products.find(p => p.id === productId);
    document.getElementById('calculatorProductName').textContent = product.name;
    document.getElementById('calculatorProductImage').src = product.image_url || '/placeholder.png';
    document.getElementById('calculatorPopup').style.display = 'block';
    document.getElementById('calculatorQuantity').value = 1;
    document.getElementById('calculatorTotal').textContent = product.price.toFixed(2);
}

function closeCalculatorPopup() {
    document.getElementById('calculatorPopup').style.display = 'none';
}

function calculateAmount() {
    const product = products.find(p => p.id === currentProductId);
    const quantity = parseFloat(document.getElementById('calculatorQuantity').value);
    const total = quantity * product.price;
    document.getElementById('calculatorTotal').textContent = total.toFixed(2);
}

function showImageUploadPopup(productId) {
    currentProductId = productId;
    const product = products.find(p => p.id === productId);
    document.getElementById('uploadProductName').textContent = product.name;
    document.getElementById('imageUploadPopup').style.display = 'block';
}

function closeImageUploadPopup() {
    document.getElementById('imageUploadPopup').style.display = 'none';
    document.getElementById('imageInput').value = '';
}

document.getElementById('imageUploadForm').onsubmit = function(e) {
    e.preventDefault();
    const fileInput = document.getElementById('imageInput');
    const file = fileInput.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    fetch(`/api/products/${currentProductId}/image`, {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        closeImageUploadPopup();
        loadProducts();
    })
    .catch(error => console.error('Ошибка:', error));
};

loadProducts();