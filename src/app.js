const express = require("express");
const handlebars = require('express-handlebars');   
const { Server } = require('socket.io');
const mongoose = require('mongoose');

const productsRouter = require('./routes/products.router');
const cartRouter = require('./routes/cart.router');
const viewsRouter = require('./routes/views.router');

const MessageModel = require('./dao/models/messages.model');
const ProductManager = require("./dao/dbManagers/productsManager");

const manager = new ProductManager(__dirname + '/files/listaProductos.json');

const app = express();
const port = 8080;

// Database Connection
mongoose.connect(`mongodb+srv://Skk-MG:nua112vfyafr@codercluster.j9vzyvy.mongodb.net/ecommerce`).then(() => {
  console.log('Connected Successfuly')
})

// Views Engine
app.engine('handlebars', handlebars.engine());
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');

// Middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// Public files
app.use(express.static(`${__dirname}/public`));

app.use((req, _res, next) => {
  req.io = io
  next();
})

// Socket.io
const httpServer = app.listen(port, () => console.log(`El servidor esta corriendo en el puerto ${port}`));

const io = new Server(httpServer);

io.on('connection', async (socket)=>{
  console.log('Socket connected')

  // Product Form Create
  socket.on('new product',async (newProduct)=>{
      await manager.addProduct(newProduct)
      const products = await manager.getProducts();
      io.emit('list updated', {products: products})
  })

  // Product Form Delete
  socket.on('delete product',async ({id})=>{
      await manager.deleteProduct(id)
      const products = await manager.getProducts();
      io.emit('list updated', {products: products})
  })

  // Chat
  const messages = await MessageModel.find().lean()
  socket.emit('chat messages', {messages})

  socket.on('new message', async (messageInfo)=>{
      await MessageModel.create(messageInfo)
      const messages = await MessageModel.find().lean()
      io.emit('chat messages', {messages})
  }) 

  socket.on('disconnect', () => {
    console.log('Socket desconectado');
  });
})

// Routes
app.use('/api/products', productsRouter);
app.use('/api/carts', cartRouter);
app.use('/', viewsRouter);