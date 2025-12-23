const searchInput = document.getElementById('live-search');
const productCards = document.querySelectorAll('.col-md-4'); // Selects all product columns
const noResultsMessage = document.getElementById('no-results'); // The no results message div

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