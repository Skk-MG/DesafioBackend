const express = require("express");
const productsRouter = require('./routes/products.router');
const cartRouter = require('./routes/cart.router');

const server = express();
const port = 8080;

server.use(express.json());
server.use(express.urlencoded({extended:true}));

server.listen(port, () => console.log(`El servidor esta corriendo en el puerto ${port}`));

server.use('/api/products', productsRouter);
server.use('/api/carts', cartRouter);