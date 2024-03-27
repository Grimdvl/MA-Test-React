document.addEventListener('DOMContentLoaded', function() {
    const productsContainer = document.querySelector('.products');
    const spinner = document.querySelector('.spinner');
    const placeholderImage = 'https://placehold.co/600x400';

    fetch('https://api.escuelajs.co/api/v1/products')
        .then(response => response.json())
        .then(products => {
            spinner.style.display = 'none';
            products.forEach(product => {
                const productCard = document.createElement('div');
                const productTitle = document.createElement('h2');
                const productPrice = document.createElement('p');
                const productDescription = document.createElement('p');
                const productImage = document.createElement('img');
                const productDescrButton = document.createElement('button');

                const maxLength = 40;

                productCard.classList.add('products__card');
                productTitle.classList.add('products__card-title');
                productDescription.classList.add('products__card-description');
                productImage.classList.add('products__card-img')
                productDescrButton.classList.add('description--show');

                productTitle.textContent = product.title;
                productPrice.textContent = `Price: $${product.price}`;
                productDescrButton.textContent = '...';
                if (product.description.length > maxLength) {
                    productDescription.textContent = `${product.description.slice(0, maxLength)}`;
                    productDescrButton.addEventListener('click', () => {
                        productDescription.textContent = product.description;
                        productDescrButton.style.display = 'none';
                    });
                } else {
                    productDescription.textContent = product.description;
                    productDescrButton.style.display = 'none';
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
                productDescription.appendChild(productDescrButton);
                productsContainer.appendChild(productCard);
            });
        })
        .catch(error => {
            console.error('Error fetching products:', error);
        });
});
