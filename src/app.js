const express = require("express");
const handlebars = require('express-handlebars');   
const { Server } = require('socket.io');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const passport = require('passport');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUiExpress = require('swagger-ui-express');

const productsRouter = require('./routes/products.router');
const cartRouter = require('./routes/cart.router');
const sessionRouter = require('./routes/session.router');
const viewsRouter = require('./routes/views.router');

const MessageModel = require('./dao/models/messages.model');
const ProductManager = require("./dao/dbManagers/productsManager");
const initializePassport = require("./config/passport.config");
const { mongoConnectionLink, sessionSecret, port } = require("./config/config");
const errorHandling = require("./middlewares/errorHandling.middleware");
const addLogger = require("./middlewares/addLogger.middleware");
const { loggerRouter } = require("./routes/logger.router");
const { mocksRouter } = require("./routes/mock.router");
const { userRouter } = require("./routes/users.router");

const manager = new ProductManager(__dirname + '/files/listaProductos.json');

const app = express();

// Session Setting
app.use(session({
  secret: sessionSecret,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: mongoConnectionLink,
    ttl: 3600
  })
}))

// Views Engine
app.engine('handlebars', handlebars.engine());
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');

// Middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(addLogger);

// Swagger
const swaggerOptions = {
  definition: {
    openapi: '3.0.1',
    info: {
      title: "Documentacion de mi Ecommerce",
      description: "API pensada para practicar programacion de backend"
    }
  },
  apis: [`${__dirname}/docs/**/*.yaml`]
}

const specs = swaggerJsDoc(swaggerOptions);
app.use('/apidocs', swaggerUiExpress.serve, swaggerUiExpress.setup(specs));

// Public files
app.use(express.static(`${__dirname}/public`));

// Passport
initializePassport();
app.use(passport.initialize());
app.use(passport.session());

// Socket.io
app.use((req, _res, next) => {
  req.io = io
  next();
})

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

  // Product Button Delete
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
app.use('/api/sessions', sessionRouter);
app.use('/api/mocks', mocksRouter);
app.use('/api/logger', loggerRouter);
app.use('/api/users', userRouter);
app.use('/', viewsRouter);

// Error handling
app.use(errorHandling);