const express = require("express");
const handlebars = require('express-handlebars');   
const { Server } = require('socket.io');
const productsRouter = require('./routes/products.router');
const cartRouter = require('./routes/cart.router');
const viewsRouter = require('./routes/views.router');
const ProductManager = require("./ProductManager");


const manager = new ProductManager(__dirname + '/output/listaProductos.json');

const app = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(`${__dirname}/public`));

app.engine('handlebars', handlebars.engine());
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');

app.use('/api/products', productsRouter);
app.use('/api/carts', cartRouter);
app.use('/', viewsRouter);

const httpServer = app.listen(port, () => console.log(`El servidor esta corriendo en el puerto ${port}`));

const io = new Server(httpServer);

io.on('connection', (socket) => {
  socket.on('add-product', async (newProduct) => {
    await manager.addProduct(
      newProduct.title,
      newProduct.description,
      newProduct.price,
      newProduct.thumbnails,
      newProduct.code,
      newProduct.stock,
      newProduct.status,
      newProduct.category
    );

    const updatedProducts = await manager.getProducts();

    io.emit('update-products', updatedProducts);
  });
});
