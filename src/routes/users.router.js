const {Router} = require('express');
const UsersController = require('../controllers/users.controller');

const router = Router();

router.get('/premium/:userId', UsersController.changeRole)

module.exports = {
    userRouter: router
};