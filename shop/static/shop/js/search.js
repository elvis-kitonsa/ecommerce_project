const searchInput = document.getElementById('live-search');
const productCards = document.querySelectorAll('.col-md-4'); // Selects all product columns
const noResultsMessage = document.getElementById('no-results'); // The no results message div
const cartButtons = document.querySelectorAll('.cart-btn'); // Select all cart button

console.log("Buttons found:", cartButtons.length);

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

        // 1. Temporary feedback - to confirm item addition
        const originalText = button.textContent;
        button.textContent = "Added ✓";
        button.classList.replace('btn-primary', 'btn-success');

        // 2. Reset the button after 1.5 seconds
        setTimeout(() => {
            button.textContent = originalText;
            button.classList.replace('btn-success', 'btn-primary');
        }, 1500);

        console.log(`Added ${productName} to the temporary list`);
    });
});