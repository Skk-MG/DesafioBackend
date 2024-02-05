const socket = io();

const cardContainer = document.getElementById('cardProducts');
const formAddProduct = document.getElementById('formAddProduct');

formAddProduct.addEventListener('submit', async (e) => {
  e.preventDefault();

  const newProduct = {};
  const formData = new FormData(formAddProduct);

  formData.forEach((value, key) => {
    newProduct[key] = key === 'thumbnails'
      ? Array.from(formData.getAll('thumbnails')).map(file => file.name)
      : value.trim();
  });

  socket.emit('add-product', newProduct);
});

socket.on('update-products', (data) => {
  cardContainer.innerHTML = '';

  data.forEach(product => {
    const productItem = document.createElement('li');
    productItem.classList.add('card');
    productItem.innerHTML = `
        <h3>${product.title}</h3>
        <p>${product.description}</p>
        <p>Precio: ${product.price}</p>
        <p>Stock: ${product.stock}</p>
        <p>Category: ${product.category}</p>
        <p>Thumbnails: ${product.thumbnails}</p>
        <p>Code: ${product.code}</p>
        <p>ID: ${product.id}</p>
    `;
    cardContainer.appendChild(productItem);
  });
});
