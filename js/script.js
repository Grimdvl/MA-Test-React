document.addEventListener('DOMContentLoaded', function() {
    const productsContainer = document.querySelector('.products');
    const spinner = document.querySelector('.spinner');
    const placeholderImage = 'https://placehold.co/600x400';
    const basket = document.querySelector('.basket');
    const basketCounter = basket.querySelector('.basket-counter');
    const modal = document.querySelector('.modal');
    const modalClose = modal.querySelector('.modal--close');

    fetch('https://api.escuelajs.co/api/v1/products')
        .then(response => response.json())
        .then(products => {
            spinner.style.display = 'none';
            products.forEach(product => {
                const productCard = document.createElement('div');
                const productTitle = document.createElement('h2');
                const productPrice = document.createElement('p');
                const productPriceNum = document.createElement('span');
                const productPriceText = document.createElement('p');
                const productDescription = document.createElement('p');
                const productImage = document.createElement('img');
                const productDescrButton = document.createElement('button');
                const productCategory = document.createElement('button');
                const productPriceAdd = document.createElement('button');

                const maxLength = 50;

                productCard.classList.add('products__card');
                productTitle.classList.add('products__card-title');
                productDescription.classList.add('products__card-description');
                productImage.classList.add('products__card-img')
                productDescrButton.classList.add('description--show');
                productCategory.classList.add('products__card-category');
                productPrice.classList.add('products__card-price');
                productPriceAdd.classList.add('price--adding');
                productPriceNum.classList.add('price-num');
                productPriceText.classList.add('price-text');

                productTitle.textContent = product.title;
                productPriceText.innerHTML = `Price <br> <br>`;
                productPriceNum.textContent = `$ ${product.price}`;
                productDescrButton.textContent = '...Read More';
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
                productCategory.textContent = product.category.name;
                productPriceAdd.textContent = 'Add to Cart'

                productCard.appendChild(productImage);
                productCard.appendChild(productTitle);
                productCard.appendChild(productDescription);
                productCard.appendChild(productCategory);
                productDescription.appendChild(productDescrButton);
                productsContainer.appendChild(productCard);
                productCard.appendChild(productPrice);
                productPrice.appendChild(productPriceText);
                productPriceText.appendChild(productPriceNum);
                productPrice.appendChild(productPriceAdd);

                const addingToBasket = () => {
                    productPriceAdd.addEventListener('click', () => {
                        if (basketCounter.textContent < 10) {
                            basketCounter.textContent = +basketCounter.textContent + 1;
                        }
                    });
                }

                const openModal = () => {
                    basket.addEventListener('click', () => {
                        modal.style.display = 'block';
                    });
                }

                const closeModal = () => {
                    modalClose.addEventListener('click', () => {
                        modal.style.display = 'none';
                    });
                }

                window.addEventListener('click', (e) => {
                    if (e.target === !modal || e.target.modalClose) {
                        closeModal();
                    }
                });

                closeModal();
                openModal();
                addingToBasket();
            });
        })
        .catch(error => {
            console.error('Error fetching products:', error);
        });
});
