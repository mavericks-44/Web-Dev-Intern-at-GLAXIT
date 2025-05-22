document.addEventListener('DOMContentLoaded', function() {
    // Product data
    const products = {
        mobiles: [
            { id: 1, name: "iPhone 15 Pro", price: 999, image: "img/mb-1.jpeg", category: "mobile" },
            { id: 2, name: "Samsung Galaxy S23", price: 899, image: "img/mb-2.jpeg", category: "mobile" },
            { id: 3, name: "Google Pixel 8", price: 799, image: "img/mb-3.jpeg", category: "mobile" },
            { id: 4, name: "OnePlus 11", price: 699, image: "img/mb-4.jpeg", category: "mobile" },
            { id: 5, name: "Xiaomi 13 Pro", price: 749, image: "img/mb-5.jpeg", category: "mobile" },
            { id: 6, name: "iPhone 14", price: 799, image: "img/mb-6.jpeg", category: "mobile" },
            { id: 7, name: "Samsung Galaxy Z Flip", price: 999, image: "img/mb-7.jpeg", category: "mobile" },
            { id: 8, name: "Google Pixel 7a", price: 499, image: "img/mb-8.jpeg", category: "mobile" },
            { id: 9, name: "Nothing Phone 2", price: 599, image: "img/mb-9.jpeg", category: "mobile" },
            { id: 10, name: "Asus ROG Phone 7", price: 899, image: "img/mb-10.jpeg", category: "mobile" }
        ],
        accessories: [
            { id: 11, name: "Tripod", price: 29, image: "img/ac-1.jpeg", category: "accessory" },
            { id: 12, name: "Bluetooth Earbuds", price: 99, image: "img/ac-2.jpeg", category: "accessory" },
            { id: 13, name: "Phone Case", price: 19, image: "img/ac-3.jpeg", category: "accessory" },
            { id: 14, name: "All Accessories in a pack", price: 9, image: "img/ac-4.jpeg", category: "accessory" },
            { id: 15, name: "Power Bank", price: 39, image: "img/ac-5.jpeg", category: "accessory" },
            { id: 16, name: "Car Mount", price: 15, image: "img/ac-6.jpeg", category: "accessory" },
            { id: 17, name: "I phone cover", price: 199, image: "img/ac-7.jpeg", category: "accessory" },
            { id: 18, name: "Screen protection glasses", price: 12, image: "img/ac-8.jpeg", category: "accessory" },
            { id: 19, name: "Powrbank", price: 8, image: "img/ac-9.jpeg", category: "accessory" },
            { id: 20, name: "Bluetooth", price: 49, image: "img/ac-10.png", category: "accessory" }
        ]
    };

    // DOM elements
    const productsContainer = document.getElementById('productsContainer');
    const mobileBtn = document.getElementById('mobileBtn');
    const accessoryBtn = document.getElementById('accessoryBtn');
    const cartBtn = document.getElementById('cartBtn');
    const cartDropdown = document.getElementById('cartDropdown');
    const cartItems = document.getElementById('cartItems');
    const cartCount = document.getElementById('cartCount');
    const cartTotal = document.getElementById('cartTotal');
    const customerModal = document.getElementById('customerModal');
    const customerForm = document.getElementById('customerForm');
    const productIdInput = document.getElementById('productId');
    const cancelBtn = document.getElementById('cancelBtn');

    // Cart state
    let cart = [];
    let selectedProductId = null;

    // Display products
    function displayProducts(productsToShow) {
        productsContainer.innerHTML = '';
        
        productsToShow.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition';
            productCard.innerHTML = `
                <div class="h-48 bg-gray-200 flex items-center justify-center">
                    <img src="${product.image}" alt="${product.name}" class="h-full object-cover">
                </div>
                <div class="p-4">
                    <h3 class="font-bold text-lg mb-2">${product.name}</h3>
                    <p class="text-blue-600 font-bold mb-4">$${product.price}</p>
                    <button class="add-to-cart w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition" data-id="${product.id}">
                        Add to Cart
                    </button>
                </div>
            `;
            productsContainer.appendChild(productCard);
        });

        // Add event listeners to the new "Add to Cart" buttons
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', addToCart);
        });
    }

    // Add to cart function - now shows customer form
    function addToCart(e) {
        selectedProductId = parseInt(e.target.getAttribute('data-id'));
        productIdInput.value = selectedProductId;
        customerModal.classList.remove('hidden');
    }

    // Handle form submission
    customerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const mobile = document.getElementById('mobile').value;
        const address = document.getElementById('address').value;
        
        let product;
        product = products.mobiles.find(p => p.id === selectedProductId);
        if (!product) {
            product = products.accessories.find(p => p.id === selectedProductId);
        }

        // Add customer info to the product
        const productWithCustomerInfo = {
            ...product,
            quantity: 1,
            customer: {
                name,
                mobile,
                address
            }
        };

        // Check if product is already in cart
        const existingItemIndex = cart.findIndex(item => item.id === product.id);
        
        if (existingItemIndex !== -1) {
            cart[existingItemIndex].quantity += 1;
            // Update customer info if different
            cart[existingItemIndex].customer = { name, mobile, address };
        } else {
            cart.push(productWithCustomerInfo);
        }

        // Reset form and close modal
        customerForm.reset();
        customerModal.classList.add('hidden');
        
        updateCart();
        showCartNotification();
    });

    // Cancel button
    cancelBtn.addEventListener('click', function() {
        customerForm.reset();
        customerModal.classList.add('hidden');
    });

    // Close modal when clicking outside
    customerModal.addEventListener('click', function(e) {
        if (e.target === customerModal) {
            customerForm.reset();
            customerModal.classList.add('hidden');
        }
    });

    // Update cart UI
    function updateCart() {
        // Update cart count
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        cartCount.textContent = totalItems;

        // Update cart items list
        if (cart.length === 0) {
            cartItems.innerHTML = '<p class="text-gray-500 text-center py-4">Your cart is empty</p>';
        } else {
            cartItems.innerHTML = '';
            cart.forEach(item => {
                const cartItem = document.createElement('div');
                cartItem.className = 'py-2 border-b border-gray-200';
                
                let customerInfo = '';
                if (item.customer) {
                    customerInfo = `
                        <div class="mt-2 text-xs text-gray-500">
                            <p><strong>For:</strong> ${item.customer.name}</p>
                            <p><strong>Mobile:</strong> ${item.customer.mobile}</p>
                            <p><strong>Address:</strong> ${item.customer.address}</p>
                        </div>
                    `;
                }
                
                cartItem.innerHTML = `
                    <div class="flex items-center justify-between">
                        <div class="flex items-center">
                            <img src="${item.image}" alt="${item.name}" class="w-12 h-12 object-cover rounded">
                            <div class="ml-3">
                                <h4 class="font-medium">${item.name}</h4>
                                <p class="text-sm text-gray-600">$${item.price} x ${item.quantity}</p>
                            </div>
                        </div>
                        <button class="remove-item text-red-500" data-id="${item.id}">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    ${customerInfo}
                `;
                cartItems.appendChild(cartItem);
            });

            // Add event listeners to remove buttons
            document.querySelectorAll('.remove-item').forEach(button => {
                button.addEventListener('click', removeFromCart);
            });
        }

        // Update total
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        cartTotal.textContent = `$${total.toFixed(2)}`;
    }

    // Remove from cart
    function removeFromCart(e) {
        const productId = parseInt(e.target.closest('button').getAttribute('data-id'));
        cart = cart.filter(item => item.id !== productId);
        updateCart();
    }

    // Show cart notification
    function showCartNotification() {
        const notification = document.createElement('div');
        notification.className = 'fixed bottom-20 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg animate-bounce';
        notification.textContent = 'Item added to cart!';
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 2000);
    }

    // Toggle cart dropdown
    cartBtn.addEventListener('click', () => {
        cartDropdown.classList.toggle('hidden');
    });

    // Close cart dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!cartBtn.contains(e.target) && !cartDropdown.contains(e.target)) {
            cartDropdown.classList.add('hidden');
        }
    });

    // Category buttons
    mobileBtn.addEventListener('click', () => {
        displayProducts(products.mobiles);
        mobileBtn.classList.remove('bg-gray-600');
        mobileBtn.classList.add('bg-blue-600');
        accessoryBtn.classList.remove('bg-blue-600');
        accessoryBtn.classList.add('bg-gray-600');
    });

    accessoryBtn.addEventListener('click', () => {
        displayProducts(products.accessories);
        accessoryBtn.classList.remove('bg-gray-600');
        accessoryBtn.classList.add('bg-blue-600');
        mobileBtn.classList.remove('bg-blue-600');
        mobileBtn.classList.add('bg-gray-600');
    });

    // Initialize by showing mobile phones
    displayProducts(products.mobiles);
    mobileBtn.classList.add('bg-blue-600');
    accessoryBtn.classList.add('bg-gray-600');
});