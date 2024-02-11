const socket = io();

/*
const cardProducts = document.querySelector('cardProducts')

socket.on('list updated',({products})=>{
  cardProducts.innerHTML = ""
  products.forEach(product => {
    cardProducts.innerHTML+=`
      <ul>
          <li>${product.title}</li>
          <li>${product.description}</li>
          <li>$${product.price}</li>
          <li>${product.stock}</li>
          <li>${product.category}</li>
          <li>${product.thumbnails}</li>
          <li>${product.code}</li>
          <li>${product.id}</li>
          <button onclick="deleteItem(${item.id})">delete</button>
      </ul>`
  });
})
*/

function deleteProduct(id){
  socket.emit('delete product',{id: id})
  window.location.reload();
}