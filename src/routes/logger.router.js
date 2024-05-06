const {Router} = require('express');
const LoggerController = require('../controllers/logger.controller');
const router = Router();

router.get('/loggerTest', LoggerController.getAll)

module.exports = {
    loggerRouter: router
};