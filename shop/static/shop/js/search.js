//Welcome to the engine room of KITONSA'S TECH STORE!
//This JavaScript file powers the live search and shopping cart functionalities of our e-commerce site.

// Wait for the DOM to fully load. Then execute the following code.
// DOMContentLoaded - Ensures all elements are available for manipulation.
document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Element Selectors ---
    // Grabbing necessary elements from the DOM

    const searchInput = document.getElementById('live-search'); // Search input box in the navbar
    const productCards = document.querySelectorAll('.col-md-4'); // All product cards on the page
    const noResultsMessage = document.getElementById('no-results'); // "No results found" message container
    const cartButtons = document.querySelectorAll('.cart-btn'); // All "Add to Cart" buttons
    const cartCountBadge = document.getElementById('cart-count'); // Badge showing number of items in cart

    // --- 2. Initialize Cart State ---
    // Load cart from LocalStorage or initialize empty array
    //This keeps track of items added to the cart across page reloads.
    //cartCountBadge shows the number of items currently in the cart.

    let cart = JSON.parse(localStorage.getItem('shoppingCart')) || [];
    if (cartCountBadge) {
        cartCountBadge.textContent = cart.length;
    }

    // --- 3. Live Search Logic ---
    // Filters product cards based on search input
    //If the user types in the search box, this code filters the displayed products in real-time.
    //If no products match the search, it shows a friendly "No gadgets found..." message.

    if (searchInput) {
        searchInput.addEventListener('input', function() {  // Listen for input events on the search box
            const filter = searchInput.value.toLowerCase(); // Get user input and convert to lowercase
            let hasMatch = false;                           // Flag to track if any products match the search

            productCards.forEach(card => {                  // Loop through each product card
                const name = card.querySelector('.card-title').textContent.toLowerCase(); // Get product name and convert to lowercase
                const desc = card.querySelector('.card-text').textContent.toLowerCase();  // Get product description and also convert to lowercase

                // Check if the product name or description includes the search term
                // Show or hide the card based on the match
                // Update hasMatch flag accordingly

                if (name.includes(filter) || desc.includes(filter)) {
                    card.style.display = "";
                    hasMatch = true;
                } else {
                    card.style.display = "none";
                }
            });

            // Show or hide the "No results found" message based on whether any products matched
            if (hasMatch) {
                noResultsMessage?.classList.add('d-none');
            } else {
                noResultsMessage?.classList.remove('d-none');
            }
        });
    }

    // --- 4. Add to Cart Logic (With Image Support) ---
    // Handles adding products to the cart and updating LocalStorage
    //When the user clicks "Add to Cart", this code captures the product details (name, price, image)
    //and saves them to LocalStorage. It also updates the cart count badge and provides visual feedback.

    cartButtons.forEach(button => { // Loop through each "Add to Cart" button
        button.addEventListener('click', () => { // Listen for click events
            const cardBody = button.closest('.card-body'); // Get the card body containing product details
            const cardParent = button.closest('.card'); // Get the full card for the image
            
            // Capture product name and price from the card
            const productName = cardBody.querySelector('.card-title').textContent;
            const productPrice = cardBody.querySelector('.badge').textContent.replace('$', '');
            
            // Capture the image URL from the <img> tag in the card
            // Use optional chaining to avoid errors if img tag is missing

            const productImage = cardParent.querySelector('img')?.src || '';

            const item = { 
                name: productName, 
                price: parseFloat(productPrice),
                image: productImage // Now saved in LocalStorage!
            };

            // Update cart in LocalStorage
            cart.push(item);
            localStorage.setItem('shoppingCart', JSON.stringify(cart));

            if (cartCountBadge) {
                cartCountBadge.textContent = cart.length;
            }

            // Visual Feedback
            // Change button text and color temporarily to indicate success
            // Revert back after 1.5 seconds
            const originalText = button.textContent;
            button.textContent = "Added! ✓";
            button.classList.replace('btn-primary', 'btn-success');

            // Revert back after 1.5 seconds
            setTimeout(() => {
                button.textContent = originalText;
                button.classList.replace('btn-success', 'btn-primary');
            }, 1500);
        });
    });

    // --- 5. Cart Page Display Logic ---
    // Displays cart items on the cart page
    //When the user navigates to the cart page, this code retrieves the cart items from LocalStorage
    //and dynamically generates the HTML to display each item along with the total price and item count.

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

        // Generate HTML for each cart item
        // and calculate total price
        // Display item image, name, and price
        // Use Bootstrap classes for styling
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

        if (pageTotal) pageTotal.textContent = `$${total.toFixed(2)}`; // Display total price
        if (pageCount) pageCount.textContent = savedCart.length; // Display item count
    }

    // Run display immediately if on cart page
    displayCartPage();

    // --- 6. Payment Logic ---
    // Handles payment confirmation and cart clearing
    //When the user clicks "Checkout", this code confirms the payment,
    //clears the cart in LocalStorage, and updates the cart page display.
    document.getElementById('checkout-btn')?.addEventListener('click', () => {
        if (cart.length === 0) return alert("Your cart is empty!");

        if (confirm("Confirm payment and clear cart?")) {
            localStorage.removeItem('shoppingCart');
            cart = []; // Reset local variable. Our cart array is now empty.
            displayCartPage();
            if (cartCountBadge) cartCountBadge.textContent = "0";
            alert("Payment Successful! Thank you for shopping."); // Simple alert for confirmation replaced with card UI
        }
    });
});