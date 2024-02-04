const socket = io();

function createProductHTML(product) {
    return `
        <ul class="productList">
            <li>Nombre: ${product.title}</li>
            <li>Descripcion: ${product.description}</li>
            <li>Precio: $${product.price}</li>
            <li>Stock Restante: ${product.stock}</li>
            <li>Categoria: ${product.category}</li>
            <li>${product.thumbnails}</li>
            <li>Codigo: ${product.code}</li>
            <li>ID: ${product.id}</li>
        </ul>
    `;
}

socket.on('newProduct', (newProduct) => {
    const productListContainer = document.querySelector('.productListContainer');
    productListContainer.innerHTML += createProductHTML(newProduct);
});

