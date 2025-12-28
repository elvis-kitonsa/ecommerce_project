document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Element Selectors ---
    const searchInput = document.getElementById('live-search');
    const productCards = document.querySelectorAll('.col-md-4');
    const noResultsMessage = document.getElementById('no-results');
    const cartButtons = document.querySelectorAll('.cart-btn');
    const cartCountBadge = document.getElementById('cart-count');

    // --- 2. Initialize Cart State ---
    let cart = JSON.parse(localStorage.getItem('shoppingCart')) || [];
    if (cartCountBadge) {
        cartCountBadge.textContent = cart.length;
    }

    // --- 3. Live Search Logic ---
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const filter = searchInput.value.toLowerCase();
            let hasMatch = false;

            productCards.forEach(card => {
                const name = card.querySelector('.card-title').textContent.toLowerCase();
                const desc = card.querySelector('.card-text').textContent.toLowerCase();

                if (name.includes(filter) || desc.includes(filter)) {
                    card.style.display = "";
                    hasMatch = true;
                } else {
                    card.style.display = "none";
                }
            });

            if (hasMatch) {
                noResultsMessage?.classList.add('d-none');
            } else {
                noResultsMessage?.classList.remove('d-none');
            }
        });
    }

    // --- 4. Add to Cart Logic (With Image Support) ---
    cartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const cardBody = button.closest('.card-body');
            const cardParent = button.closest('.card'); // Get the full card for the image
            
            const productName = cardBody.querySelector('.card-title').textContent;
            const productPrice = cardBody.querySelector('.badge').textContent.replace('$', '');
            
            // Capture the image URL from the <img> tag in the card
            const productImage = cardParent.querySelector('img')?.src || '';

            const item = { 
                name: productName, 
                price: parseFloat(productPrice),
                image: productImage // Now saved in LocalStorage!
            };

            cart.push(item);
            localStorage.setItem('shoppingCart', JSON.stringify(cart));

            if (cartCountBadge) {
                cartCountBadge.textContent = cart.length;
            }

            // Visual Feedback
            const originalText = button.textContent;
            button.textContent = "Added! ✓";
            button.classList.replace('btn-primary', 'btn-success');

            setTimeout(() => {
                button.textContent = originalText;
                button.classList.replace('btn-success', 'btn-primary');
            }, 1500);
        });
    });

    // --- 5. Cart Page Display Logic ---
    function displayCartPage() {
        const pageContainer = document.getElementById('cart-page-items');
        const pageTotal = document.getElementById('cart-page-total');
        const pageCount = document.getElementById('cart-page-count');

        if (!pageContainer) return;

        const savedCart = JSON.parse(localStorage.getItem('shoppingCart')) || [];
        pageContainer.innerHTML = '';

        if (savedCart.length === 0) {
            pageContainer.innerHTML = '<p class="text-muted text-center py-5">Your cart is empty.</p>';
            if (pageTotal) pageTotal.textContent = "$0.00";
            if (pageCount) pageCount.textContent = "0";
            return;
        }

        let total = 0;
        savedCart.forEach(item => {
            total += item.price;
            pageContainer.innerHTML += `
                <div class="d-flex justify-content-between align-items-center mb-3 p-3 border rounded shadow-sm bg-white">
                    <div class="d-flex align-items-center">
                        <img src="${item.image}" alt="${item.name}" class="rounded me-3" style="width: 50px; height: 50px; object-fit: cover;">
                        <div>
                            <h6 class="mb-0 fw-bold">${item.name}</h6>
                            <small class="text-muted">Standard Delivery</small>
                        </div>
                    </div>
                    <span class="fw-bold text-primary">$${item.price.toFixed(2)}</span>
                </div>
            `;
        });

        if (pageTotal) pageTotal.textContent = `$${total.toFixed(2)}`;
        if (pageCount) pageCount.textContent = savedCart.length;
    }

    // Run display immediately if on cart page
    displayCartPage();

    // --- 6. Payment Logic ---
    document.getElementById('checkout-btn')?.addEventListener('click', () => {
        if (cart.length === 0) return alert("Your cart is empty!");

        if (confirm("Confirm payment and clear cart?")) {
            localStorage.removeItem('shoppingCart');
            cart = []; // Reset local variable
            displayCartPage();
            if (cartCountBadge) cartCountBadge.textContent = "0";
            alert("Payment Successful! Thank you for shopping.");
        }
    });
});