const { CartsDao, ProductsDao, UsersDao } = require("../dao/factory");
const CartsService = require("../services/carts.service");
const ProductsService = require("../services/products.service");
const UsersService = require("../services/users.service");

const productsService = new ProductsService(new ProductsDao());
const cartsService = new CartsService(new CartsDao(), productsService);
const usersService = new UsersService(new UsersDao());

module.exports = {
    productsService,
    cartsService,
    usersService
};