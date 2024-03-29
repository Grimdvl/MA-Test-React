document.addEventListener('DOMContentLoaded', function() {
    const productsContainer = document.querySelector('.products');
    const spinner = document.querySelector('.spinner');
    const placeholderImage = 'https://placehold.co/600x400';
    const basket = document.querySelector('.basket');
    const basketCounter = basket.querySelector('.basket-counter');
    const modal = document.querySelector('.modal');
    const modalClose = modal.querySelector('.modal--close');
    const overflow = document.querySelector('.overflow');
    const modalProductsContainer = modal.querySelector('.modal__products');
    const modalEmpty = modalProductsContainer.querySelector('.modal__products-empty');

    const openModal = () => {
        modal.style.display = 'block';
        overflow.style.display = 'block';
        document.body.classList.add('active');
    }

    const closeModal = () => {
        modal.style.display = 'none';
        overflow.style.display = 'none';
        document.body.classList.remove('active');
    }

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

                const descrLength = 50;
                const purchLength = 12;

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
                if (product.description.length > descrLength) {
                    productDescription.textContent = `${product.description.slice(0, descrLength)}`;
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

                productsContainer.appendChild(productCard);
                productCard.appendChild(productImage);
                productCard.appendChild(productTitle);
                productCard.appendChild(productDescription);
                productCard.appendChild(productCategory);
                productDescription.appendChild(productDescrButton);
                productCard.appendChild(productPrice);
                productPrice.appendChild(productPriceText);
                productPriceText.appendChild(productPriceNum);
                productPrice.appendChild(productPriceAdd);

                productPriceAdd.addEventListener('click', () => {
                    modalEmpty.remove();
                    if (basketCounter.textContent < purchLength) {
                        basketCounter.textContent = +basketCounter.textContent + 1;

                        const productPriceDel = document.createElement('button');
                        const modalProductCard = document.createElement('div');
                        const modalProductTitle = document.createElement('h2');
                        const modalProductPrice = document.createElement('p');
                        const modalProductPriceNum = document.createElement('span');
                        const modalProductImage = document.createElement('img');
                        const modalProductPriceText = document.createElement('p');

                        modalProductCard.classList.add('modal__products-card');
                        modalProductTitle.classList.add('modal__products-title');
                        modalProductPrice.classList.add('modal__card-price');
                        modalProductPriceNum.classList.add('modal__price-num');
                        modalProductPriceText.classList.add('modal__price-text');
                        modalProductImage.classList.add('modal__products-img');
                        productPriceDel.classList.add('price--deleting');

                        modalProductTitle.textContent = product.title;
                        modalProductImage.onerror = () => {
                            modalProductImage.src = placeholderImage;
                            modalProductImage.alt = 'Placeholder Image';
                        };
                        modalProductImage.src = product.images[0];
                        modalProductImage.alt = product.title;
                        productPriceDel.textContent = 'Delet';
                        modalProductPriceText.innerHTML = `Price <br> <br>`;
                        modalProductPriceNum.textContent = `$ ${product.price}`;

                        modalProductCard.appendChild(modalProductImage);
                        modalProductCard.appendChild(modalProductTitle);
                        modalProductCard.appendChild(modalProductPrice);
                        modalProductPrice.appendChild(modalProductPriceText);
                        modalProductsContainer.appendChild(modalProductCard);
                        modalProductPriceText.appendChild(modalProductPriceNum);
                        modalProductPrice.appendChild(productPriceDel);

                        productPriceDel.addEventListener('click', () => {
                            modalProductCard.remove();
                            basketCounter.textContent = +basketCounter.textContent - 1;
                            if (basketCounter.textContent === '0') {
                                basketCounter.textContent = '';
                                modalProductsContainer.appendChild(modalEmpty);
                            }
                        });
                        
                    }
                });
            });
        })
        .catch(error => {
            console.error('Error fetching products:', error);
        });

        basket.addEventListener('click', openModal);
        modalClose.addEventListener('click', closeModal);
        overflow.addEventListener('click', closeModal);
});
