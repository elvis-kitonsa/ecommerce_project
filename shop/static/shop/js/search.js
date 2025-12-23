const searchInput = document.getElementById('live-search');
        const productCards = document.querySelectorAll('.col-md-4'); // Selects all product columns

        searchInput.addEventListener('input', function() {
            const filter = searchInput.value.toLowerCase();

            productCards.forEach(card => {
                // We search inside the product name and description
                const name = card.querySelector('.card-title').textContent.toLowerCase();
                const desc = card.querySelector('.card-text').textContent.toLowerCase();

                if (name.includes(filter) || desc.includes(filter)) {
                    card.style.display = ""; // Show
                } else {
                    card.style.display = "none"; // Hide
                }
            });
        });