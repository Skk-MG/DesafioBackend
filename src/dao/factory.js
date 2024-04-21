const { mongoConnectionLink, persistence } = require('../config/config');
const mongoose = require('mongoose');

let CartsDao;
let ProductsDao;
let UsersDao;
let TicketsDao;

// Persistencia 
switch (persistence) {
    case 'MONGO':
        mongoose.connect(mongoConnectionLink).then(() => {
            console.log('Connected Successfuly')
          })
        CartsDao = require('./dbManagers/carts.dao');
        ProductsDao = require('./dbManagers/products.dao');
        UsersDao = require('./dbManagers/users.dao');
        TicketsDao = require('./dbManagers/tickets.dao');
    break;

    case 'MEMORY':
        CartsDao = require('./memory/carts.memory');
        ProductsDao = require('./memory/products.memory');
        UsersDao = require('./memory/users.memory');
        TicketsDao = require('./memory/tickets.memory');
    break;
}

module.exports = {
    CartsDao,
    ProductsDao,
    UsersDao,
    TicketsDao
};