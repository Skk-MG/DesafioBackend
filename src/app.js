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

app.use((req, _res, next) => {
  req.io = io
  next();
})

app.use('/api/products', productsRouter);
app.use('/api/carts', cartRouter);
app.use('/', viewsRouter);

const httpServer = app.listen(port, () => console.log(`El servidor esta corriendo en el puerto ${port}`));

const io = new Server(httpServer);

io.on('connection',(socket)=>{
  console.log('Socket connected')

  socket.on('new product',async (newProduct)=>{
      await manager.addProduct(newProduct)
      const products = await manager.getProducts();
      io.emit('list updated', {products: products})
  })

  socket.on('delete product',async ({id})=>{
      await manager.deleteProduct(id)
      const products = await manager.getProducts();
      io.emit('list updated', {products: products})
  })

  socket.on('disconnect', () => {
    console.log('Socket desconectado');
  });
})

