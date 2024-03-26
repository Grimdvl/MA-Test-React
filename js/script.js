document.addEventListener('DOMContentLoaded', function() {
    const productsContainer = document.querySelector('.products');
    const placeholderImage = 'https://placehold.co/600x400';

    fetch('https://api.escuelajs.co/api/v1/products')
        .then(response => response.json())
        .then(products => {
            products.forEach(product => {
                const productCard = document.createElement('div');
                const productTitle = document.createElement('h2');
                const productPrice = document.createElement('p');
                const productDescription = document.createElement('p');
                const productImage = document.createElement('img');

                const maxLength = 30;

                productCard.classList.add('card');

                productTitle.textContent = product.title;
                productPrice.textContent = `Price: $${product.price}`;
                if (product.description.length > maxLength) {
                    productDescription.textContent = product.description.slice(0, maxLength) + '...';
                } else {
                    productDescription.textContent = product.description;
                }

                productImage.onerror = () => {
                    productImage.src = placeholderImage;
                    productImage.alt = 'Placeholder Image';
                };
                productImage.src = product.images[0];
                productImage.alt = product.title;

                productCard.appendChild(productImage);
                productCard.appendChild(productTitle);
                productCard.appendChild(productPrice);
                productCard.appendChild(productDescription);
                productsContainer.appendChild(productCard);
            });
        })
        .catch(error => {
            console.error('Error fetching products:', error);
        });
});
