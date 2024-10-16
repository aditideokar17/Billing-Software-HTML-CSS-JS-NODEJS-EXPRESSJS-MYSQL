// Base URL for API calls (adjust if needed)
const BASE_URL = 'http://localhost:5000/api'; 

// Add event listener for Customer Form submission
document.getElementById('customerForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const customerData = {
        name: document.getElementById('name').value,
        gender: document.getElementById('gender').value,
        contact: document.getElementById('contact').value,
        email: document.getElementById('email').value
    };

    // POST request to add customer
    fetch(`${BASE_URL}/customers`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(customerData)
    })
    .then(response => response.json())
    .then(data => {
        alert('Customer added successfully!');
        fetchAllCustomers(); // Update customer list
    })
    .catch(error => console.error('Error adding customer:', error));
});

// Fetch and display all customers
function fetchAllCustomers() {
    fetch(`${BASE_URL}/customers`)
        .then(response => response.json())
        .then(customers => {
            const customerList = document.getElementById('customerList');
            customerList.innerHTML = ''; // Clear the list before repopulating

            customers.forEach(customer => {
                const li = document.createElement('li');
                li.textContent = `${customer.name} - ${customer.email} - ${customer.contact}`;
                customerList.appendChild(li);
            });
        })
        .catch(error => console.error('Error fetching customers:', error));
}

// Add event listener for Product Form submission
document.getElementById('productForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const productData = {
        name: document.getElementById('productName').value,
        price: document.getElementById('productPrice').value,
        quantity: document.getElementById('productQuantity').value,
        brand: document.getElementById('productBrand').value,
        supplier: document.getElementById('productSupplier').value,
        category: document.getElementById('productCategory').value
    };

    // POST request to add product
    fetch(`${BASE_URL}/products`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(productData)
    })
    .then(response => response.json())
    .then(data => {
        alert('Product added successfully!');
        fetchAllProducts(); // Update product list
    })
    .catch(error => console.error('Error adding product:', error));
});

// Fetch and display all products
function fetchAllProducts() {
    fetch(`${BASE_URL}/products`)
        .then(response => response.json())
        .then(products => {
            const productList = document.getElementById('productList');
            productList.innerHTML = ''; // Clear the list before repopulating

            products.forEach(product => {
                const li = document.createElement('li');
                li.textContent = `${product.name} - $${product.price} - Quantity: ${product.quantity}`;
                productList.appendChild(li);
            });
        })
        .catch(error => console.error('Error fetching products:', error));
}

// Fetch customers and populate the customer dropdown
function fetchCustomers() {
    fetch(`${BASE_URL}/customers`)
        .then(response => response.json())
        .then(customers => {
            const customerSelect = document.getElementById('customerSelect');
            customers.forEach(customer => {
                const option = document.createElement('option');
                option.value = customer.id;  // assuming customer id field
                option.textContent = customer.name;
                customerSelect.appendChild(option);
            });
        })
        .catch(error => console.error('Error fetching customers:', error));
}

// Fetch products and populate the product dropdown
function fetchProducts() {
    fetch(`${BASE_URL}/products`)
        .then(response => response.json())
        .then(products => {
            const productSelect = document.getElementById('productSelect');
            products.forEach(product => {
                const option = document.createElement('option');
                option.value = product.id;  // assuming product id field
                option.textContent = `${product.name} - $${product.price}`;
                productSelect.appendChild(option);
            });
        })
        .catch(error => console.error('Error fetching products:', error));
}

// Load customers and products on page load
document.addEventListener('DOMContentLoaded', function() {
    fetchCustomers();
    fetchProducts();
});

let totalAmount = 0;  // Track the total billing amount

// Handle billing form submission
document.getElementById('billingForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const selectedCustomer = document.getElementById('customerSelect').value;
    const selectedProduct = document.getElementById('productSelect').value;
    const quantity = document.getElementById('quantity').value;

    // POST request to backend to add billing entry
    const billingData = {
        customerId: selectedCustomer,
        productId: selectedProduct,
        quantity: quantity
    };

    fetch(`${BASE_URL}/billings`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(billingData)
    })
    .then(response => response.json())
    .then(data => {
        alert('Billing added successfully!');
        updateBillingList(data);  // Update billing list in UI
    })
    .catch(error => console.error('Error adding billing:', error));
});

// Function to update the billing list and total amount
function updateBillingList(billingItem) {
    const productSelect = document.getElementById('productSelect');
    const selectedProductText = productSelect.options[productSelect.selectedIndex].text;
    const selectedProductPrice = parseFloat(selectedProductText.split('- $')[1]);

    const quantity = parseInt(billingItem.quantity);
    const amount = selectedProductPrice * quantity;

    const billingList = document.getElementById('billingList');
    const li = document.createElement('li');
    li.textContent = `Product: ${selectedProductText}, Quantity: ${quantity}, Amount: $${amount}`;
    billingList.appendChild(li);

    // Update the total amount
    totalAmount += amount;
    document.getElementById('totalAmount').textContent = `$${totalAmount.toFixed(2)}`;
}


// Add event listener for Billing Form submission
document.getElementById('billingForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const billingData = {
        customerId: document.getElementById('customerSelect').value,
        productId: document.getElementById('productSelect').value,
    };

    // POST request to add billing
    fetch(`${BASE_URL}/billing`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(billingData)
    })
    .then(response => response.json())
    .then(data => {
        alert('Billing added successfully!');
        fetchAllBilling(); // Update billing list
    })
    .catch(error => console.error('Error adding billing:', error));
});

// Fetch and display all billing records
function fetchAllBilling() {
    fetch(`${BASE_URL}/billing`)
        .then(response => response.json())
        .then(billing => {
            const billingList = document.getElementById('billingList');
            billingList.innerHTML = ''; // Clear the list before repopulating

            billing.forEach(record => {
                const li = document.createElement('li');
                li.textContent = `Customer ID: ${record.customerId}, Product ID: ${record.productId}, Total Amount: $${record.totalAmount}`;
                billingList.appendChild(li);
            });
        })
        .catch(error => console.error('Error fetching billing:', error));
}

// Call the function to fetch and display billing on page load
fetchAllBilling();

// Fetch data when the page loads
window.onload = function() {
    fetchAllCustomers();
    fetchAllProducts();
};

