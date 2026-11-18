document.addEventListener('DOMContentLoaded', () => {
    // Load cart from localStorage or initialize empty array
    let cart = JSON.parse(localStorage.getItem('chicstyle_cart')) || [];

    // Update Cart Badge Counter across all pages
    function updateCartBadge() {
        const countEl = document.getElementById('cart-count');
        if (countEl) {
            const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
            countEl.textContent = totalItems;
        }
    }

    // Save cart to localStorage
    function saveCart() {
        localStorage.setItem('chicstyle_cart', JSON.stringify(cart));
        updateCartBadge();
    }

    // 1. Add to Cart Functionality (Catalog & Lookbook Pages)
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const name = button.getAttribute('data-name');
            const price = parseFloat(button.getAttribute('data-price'));

            const existingItem = cart.find(item => item.name === name);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({ name, price, quantity: 1 });
            }

            saveCart();

            // Visual button feedback
            const originalText = button.textContent;
            button.textContent = '✓ Added!';
            button.classList.replace('btn-dark', 'btn-success');
            setTimeout(() => {
                button.textContent = originalText;
                button.classList.replace('btn-success', 'btn-dark');
            }, 1000);
        });
    });

    // 2. Real-Time Search & Category Filter (Catalog Page)
    const searchInput = document.getElementById('search-input');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const productItems = document.querySelectorAll('.product-item');

    let currentCategory = 'all';

    function filterProducts() {
        const searchTerm = searchInput ? searchInput.value.toLowerCase().trim() : '';

        productItems.forEach(item => {
            const itemCategory = item.getAttribute('data-category');
            const itemName = item.getAttribute('data-name').toLowerCase();

            const matchesCategory = (currentCategory === 'all' || itemCategory === currentCategory);
            const matchesSearch = itemName.includes(searchTerm);

            if (matchesCategory && matchesSearch) {
                item.style.display = '';
            } else {
                item.style.display = 'none';
            }
        });
    }

    if (searchInput) {
        searchInput.addEventListener('input', filterProducts);
    }

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentCategory = btn.getAttribute('data-filter');
            filterProducts();
        });
    });

    // 3. Render Cart Table & Calculations (Cart Page)
    const cartItemsBody = document.getElementById('cart-items-body');
    const cartTotalEl = document.getElementById('cart-total');
    const emptyCartMsg = document.getElementById('empty-cart-msg');
    const clearCartBtn = document.getElementById('clear-cart-btn');

    function renderCart() {
        if (!cartItemsBody) return;

        cartItemsBody.innerHTML = '';
        let grandTotal = 0;

        if (cart.length === 0) {
            if (emptyCartMsg) emptyCartMsg.classList.remove('d-none');
            if (cartTotalEl) cartTotalEl.textContent = '0.00';
            return;
        }

        if (emptyCartMsg) emptyCartMsg.classList.add('d-none');

        cart.forEach((item, index) => {
            const subtotal = item.price * item.quantity;
            grandTotal += subtotal;

            const row = document.createElement('tr');
            row.innerHTML = `
                <td class="fw-semibold">${item.name}</td>
                <td>$${item.price.toFixed(2)}</td>
                <td>
                    <div class="btn-group btn-group-sm">
                        <button class="btn btn-outline-secondary qty-btn" data-index="${index}" data-action="decrease">-</button>
                        <span class="btn btn-light disabled text-dark fw-bold">${item.quantity}</span>
                        <button class="btn btn-outline-secondary qty-btn" data-index="${index}" data-action="increase">+</button>
                    </div>
                </td>
                <td class="fw-bold">$${subtotal.toFixed(2)}</td>
                <td>
                    <button class="btn btn-sm btn-danger remove-btn" data-index="${index}">Remove</button>
                </td>
            `;
            cartItemsBody.appendChild(row);
        });

        if (cartTotalEl) {
            cartTotalEl.textContent = grandTotal.toFixed(2);
        }

        // Attach Quantity & Remove Listeners
        document.querySelectorAll('.qty-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const idx = parseInt(btn.getAttribute('data-index'));
                const action = btn.getAttribute('data-action');
                if (action === 'increase') {
                    cart[idx].quantity += 1;
                } else if (action === 'decrease') {
                    cart[idx].quantity -= 1;
                    if (cart[idx].quantity <= 0) {
                        cart.splice(idx, 1);
                    }
                }
                saveCart();
                renderCart();
            });
        });

        document.querySelectorAll('.remove-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const idx = parseInt(btn.getAttribute('data-index'));
                cart.splice(idx, 1);
                saveCart();
                renderCart();
            });
        });
    }

    if (clearCartBtn) {
        clearCartBtn.addEventListener('click', () => {
            cart = [];
            saveCart();
            renderCart();
        });
    }

    // 4. Checkout Form Validation & Feedback (Cart Page)
    const checkoutForm = document.getElementById('checkout-form');
    const orderFeedback = document.getElementById('order-feedback');

    if (checkoutForm) {
        checkoutForm.addEventListener('submit', (e) => {
            e.preventDefault();
            e.stopPropagation();

            if (cart.length === 0) {
                orderFeedback.className = 'alert alert-warning mt-3';
                orderFeedback.textContent = 'Your shopping bag is empty. Please add items before placing an order.';
                orderFeedback.classList.remove('d-none');
                return;
            }

            if (!checkoutForm.checkValidity()) {
                checkoutForm.classList.add('was-validated');
                orderFeedback.className = 'alert alert-danger mt-3';
                orderFeedback.textContent = 'Please fill out all required fields accurately.';
                orderFeedback.classList.remove('d-none');
                return;
            }

            // Valid Submission Feedback
            const customerName = document.getElementById('customer-name').value.trim();
            orderFeedback.className = 'alert alert-success mt-3';
            orderFeedback.innerHTML = <strong>Order Confirmed!</strong> Thank you, ${customerName}. Your reservation has been recorded (Frontend Demo).;
            orderFeedback.classList.remove('d-none');

            // Reset form and clear cart
            checkoutForm.reset();
            checkoutForm.classList.remove('was-validated');
            cart = [];
            saveCart();
            renderCart();
        });
    }

    // Initialize UI on page load
    updateCartBadge();
    renderCart();
});