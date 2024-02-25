const socket = io();

function deleteProduct(id){
  socket.emit('delete product',{id: id})
  window.location.reload();
}