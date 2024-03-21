const productsContainer = document.getElementById('products-container');

// Получение данных о продуктах с сервера
fetch('https://api.escuelajs.co/api/v1/products')
    .then(response => response.json())
    .then(products => {
        // Создание элементов для каждого продукта
        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.classList.add('product-card');

            const productTitle = document.createElement('h2');
            productTitle.textContent = product.title;

            const productPrice = document.createElement('p');
            productPrice.textContent = `Price: $${product.price}`;

            const productDescription = document.createElement('p');
            productDescription.textContent = product.description;

            // Создание элементов для каждой картинки продукта
            product.images.forEach(imageUrl => {
                const productImage = document.createElement('img');
                productImage.src = imageUrl;
                productImage.alt = product.title;
                productCard.appendChild(productImage);
            });

            // Добавление всех созданных элементов в контейнер продуктов
            productCard.appendChild(productTitle);
            productCard.appendChild(productPrice);
            productCard.appendChild(productDescription);
            productsContainer.appendChild(productCard);
        });
    })
    .catch(error => {
        console.error('Error fetching products:', error);
    });
