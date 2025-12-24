const searchInput = document.getElementById('live-search');
const productCards = document.querySelectorAll('.col-md-4'); // Selects all product columns
const noResultsMessage = document.getElementById('no-results'); // The no results message div
const cartButtons = document.querySelectorAll('.cart-btn'); // Select all cart button

console.log("Buttons found:", cartButtons.length);

let cart = []; // This will hold our product objects that are added to the cart
const cartCountBadge = document.getElementById('cart-count');

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

        // 2. Update the red badge number on the floating cart icon
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