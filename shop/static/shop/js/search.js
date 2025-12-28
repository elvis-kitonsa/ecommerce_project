const searchInput = document.getElementById('live-search');
const productCards = document.querySelectorAll('.col-md-4'); // Selects all product columns
const noResultsMessage = document.getElementById('no-results'); // The no results message div
const cartButtons = document.querySelectorAll('.cart-btn'); // Select all cart button
const cartCountBadge = document.getElementById('cart-count'); // The badge showing cart count

console.log("Buttons found:", cartButtons.length);

// This tells the page: "Look in the notebook first; if it's empty, start with a blank list."
let cart = JSON.parse(localStorage.getItem('shoppingCart')) || [];

// Also, update the badge count immediately on page load
if (cartCountBadge) {
    cartCountBadge.textContent = cart.length;
}

// Function to handle adding to cart (placeholder functionality)

searchInput.addEventListener('input', function() {
    const filter = searchInput.value.toLowerCase();
    let hasMatch = false; // Track if we find anything

    productCards.forEach(card => {
        // We search inside the product name and description
        const name = card.querySelector('.card-title').textContent.toLowerCase();
        const desc = card.querySelector('.card-text').textContent.toLowerCase();

        if (name.includes(filter) || desc.includes(filter)) {
            card.style.display = ""; // Show
            hasMatch = true;
        } else {
            card.style.display = "none"; // Hide
        }
    });

// Show message if no matches, otherwise hide it
    if (hasMatch) {
        noResultsMessage.classList.add('d-none');
    } else {
        noResultsMessage.classList.remove('d-none');
    }
});

// Tell each button to wait for a click
cartButtons.forEach(button => {
    button.addEventListener('click', () => {

        const card = button.closest('.card-body');
        const productName = card.querySelector('.card-title').textContent;

        // Grab the price and remove the '$' sign so we can do math later
        const productPrice = card.querySelector('.badge').textContent.replace('$', '');

        // 1. Create a "Product Object" and add it to our cart list
        const item = { name: productName, price: parseFloat(productPrice) };
        cart.push(item);

        // 2. Save to the browser's notebook (LocalStorage)
        localStorage.setItem('shoppingCart', JSON.stringify(cart));

        // 3. Update the red badge number on the floating cart icon
        cartCountBadge.textContent = cart.length;

        // --- Your existing 1.5s timer logic ---
        const originalText = button.textContent;
        button.textContent = "Added! ✓";
        button.classList.replace('btn-primary', 'btn-success');

        setTimeout(() => {
            button.textContent = originalText;
            button.classList.replace('btn-success', 'btn-primary');
        }, 1500);

        // check the progress in your console
        console.log("Current Cart:", cart);
    });
});

// Function to load and display items on the dedicated Cart Page
function displayCartPage() {
    const pageContainer = document.getElementById('cart-page-items');
    const pageTotal = document.getElementById('cart-page-total');
    const pageCount = document.getElementById('cart-page-count');

    // Safety Check: Only run this if we are actually on the Cart Page
    if (!pageContainer) return;

    // Pull the data from the browser's "notebook"
    const savedCart = JSON.parse(localStorage.getItem('shoppingCart')) || [];
    
    if (savedCart.length === 0) {
        pageContainer.innerHTML = '<p class="text-muted text-center py-5">Your cart is empty.</p>';
        return;
    }

    // Clear the "Empty" message and build the list
    pageContainer.innerHTML = '';
    let total = 0;

    savedCart.forEach(item => {
        total += item.price;
        pageContainer.innerHTML += `
            <div class="d-flex justify-content-between align-items-center mb-3 p-3 border rounded shadow-sm bg-white">
                <div>
                    <h6 class="mb-0 fw-bold">${item.name}</h6>
                    <small class="text-muted">Standard Delivery</small>
                </div>
                <span class="fw-bold text-primary">$${item.price.toFixed(2)}</span>
            </div>
        `;
    });

    // Update the Summary Box
    if (pageTotal) pageTotal.textContent = `$${total.toFixed(2)}`;
    if (pageCount) pageCount.textContent = savedCart.length;
}

// IMPORTANT: Run this every time the script loads to check if we are on the cart page
displayCartPage();

// Function to handle "Complete Payment"
document.getElementById('checkout-btn')?.addEventListener('click', () => {
    const cart = JSON.parse(localStorage.getItem('shoppingCart')) || [];
    
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    if (confirm("Confirm payment and clear cart?")) {
        // 1. Wipe the browser memory
        localStorage.removeItem('shoppingCart');
        
        // 2. Refresh the display to show 0
        displayCartPage();
        
        // 3. Update the floating badge on the dashboard
        const badge = document.getElementById('cart-count');
        if(badge) badge.textContent = "0";

        alert("Payment Successful! Thank you for shopping.");
    }
});