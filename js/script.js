const productsContainer = document.querySelector('products');

// Получаем данные с API
fetch('https://api.escuelajs.co/api/v1/products')
  .then(response => response.json())
  .then(data => {
    // Обрабатываем полученные данные
    data.forEach(product => {
      // Создаем карточку для каждого продукта
      const card = document.createElement('div');
      card.classList.add('card');

      // Добавляем заголовок
      const title = document.createElement('h2');
      title.textContent = product.name;
      card.appendChild(title);

      // Добавляем цену
      const price = document.createElement('p');
      price.textContent = `Price: $${product.price}`;
      card.appendChild(price);

      // Добавляем краткое описание
      const description = document.createElement('p');
      description.textContent = product.description;
      card.appendChild(description);

      // Добавляем фото
      const photo = document.createElement('img');
      photo.src = product.image;
      photo.alt = product.name;
      card.appendChild(photo);

      // Добавляем карточку продукта в контейнер
      productsContainer.appendChild(card);
    });
  })
  .catch(error => console.error('Error fetching products:', error));
