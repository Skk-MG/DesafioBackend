const { Router } = require("express");
const MocksController = require("../controllers/mock.controller");
const router = Router();

router.get('/mockingProducts', MocksController.getProducts);

module.exports = {
    mocksRouter: router
};