const { CartsDao, ProductsDao, UsersDao, TicketsDao } = require("../dao/factory");
const CartsService = require("../services/carts.service");
const ProductsService = require("../services/products.service");
const UsersService = require("../services/users.service");
const TicketService = require("../services/ticket.service")

const productsService = new ProductsService(new ProductsDao());
const usersService = new UsersService(new UsersDao());
const ticketsService = new TicketService(new TicketsDao());
const cartsService = new CartsService(new CartsDao(), productsService, ticketsService);

module.exports = {
    productsService,
    cartsService,
    usersService,
    ticketsService
};