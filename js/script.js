document.addEventListener('DOMContentLoaded', function() {
    let shoppingList = [];

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
    const modalSum = document.querySelector('.modal__sum-count');

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

    const loadShoppingListFromLocalStorage = () => {
        const shoppingListJSON = localStorage.getItem('shoppingList');
        if (shoppingListJSON !== null) {
            shoppingList = JSON.parse(shoppingListJSON);
            renderShoppingList();
        }
    }

    const updateModalSum = () => {
        modalSum.textContent = shoppingList.reduce((total, item) => total + item.price, 0);
    }

    const renderShoppingList = () => {
        modalProductsContainer.innerHTML = '';
        let totalSum = 0;

        shoppingList.forEach(item => {
            totalSum += item.price;
            const modalProductCard = createProductCard(item);
            modalProductsContainer.appendChild(modalProductCard);
        });

        modalSum.textContent = totalSum;
        updateBasketCounter();
    }

    const createProductCard = (product) => {
        const modalProductCard = document.createElement('div');
        const modalProductTitle = document.createElement('h2');
        const modalProductPrice = document.createElement('p');
        const modalProductPriceText = document.createElement('p');
        const modalProductPriceNum = document.createElement('span');
        const modalProductImage = document.createElement('img');
        const productPriceDel = document.createElement('button');
        const modalPrice = document.createElement('div');

        modalProductCard.classList.add('modal__products-card');
        modalProductTitle.classList.add('modal__products-title');
        modalProductPrice.classList.add('modal__card-price');
        modalProductPriceNum.classList.add('modal__price-num');
        modalProductImage.classList.add('modal__products-img');
        productPriceDel.classList.add('price--deleting');
        modalProductPriceText.classList.add('modal__price-text');
        modalPrice.classList.add('.modal__card-price');

        modalProductTitle.textContent = product.title;
        modalProductImage.src = product.image;
        modalProductImage.alt = product.title;
        modalProductPriceNum.textContent = `$ ${product.price}`;
        productPriceDel.textContent = 'Delete';
        modalProductPriceText.innerHTML = 'Price <br> <br>';
        productPriceDel.addEventListener('click', () => {
            removeProductFromShoppingList(product);
        });
        modalProductImage.onerror = () => {
            modalProductImage.src = placeholderImage;
            modalProductImage.alt = 'Placeholder Image';
        };

        modalSum.textContent = shoppingList.reduce((total, item) => total + item.price, 0);

        modalProductCard.appendChild(modalProductImage);
        modalProductCard.appendChild(modalProductTitle);
        modalProductCard.appendChild(modalProductPrice);
        modalProductPrice.appendChild(modalProductPriceText);
        modalProductPriceText.appendChild(modalProductPriceNum);
        modalProductPrice.appendChild(productPriceDel);

        return modalProductCard;
    }

    const removeProductFromShoppingList = (productToRemove) => {
        shoppingList = shoppingList.filter(product => product !== productToRemove);
        saveShoppingListToLocalStorage();
        renderShoppingList();
        updateModalSum();
    }

    const updateBasketCounter = () => {
        basketCounter.textContent = shoppingList.length;
        if (shoppingList.length === 0) {
            basketCounter.textContent = '';
            modalProductsContainer.appendChild(modalEmpty);
        }
    }

    const saveShoppingListToLocalStorage = () => {
        localStorage.setItem('shoppingList', JSON.stringify(shoppingList));
    }

    const renderProducts = () => {
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
                    const purchLength = 10;

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

                    productPriceAdd.addEventListener('click', () => {
                        if (basketCounter.textContent < purchLength) {
                            shoppingList.push({
                                title: product.title,
                                image: product.images[0] || placeholderImage,
                                price: product.price
                            });
                            saveShoppingListToLocalStorage();
                            renderShoppingList();
                        }
                    });

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
                });
            })
            .catch(error => {
                console.error('Error fetching products:', error);
            });
    }

    loadShoppingListFromLocalStorage();
    renderProducts();

    basket.addEventListener('click', openModal);
    modalClose.addEventListener('click', closeModal);
    overflow.addEventListener('click', closeModal);
});
