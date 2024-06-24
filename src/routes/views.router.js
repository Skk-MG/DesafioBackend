const {Router} = require('express');
const ViewsController = require('../controllers/views.controller');
const checkRole = require('../middlewares/checkRole.middleware');

const router = Router();

// Middlewares
const publicAccess = (req, res, next) => {
    if(req.session.user) return res.redirect('/products')
    next();
}

const privateAccess = (req, res, next) => {
    if(!req.session.user) {
        return res.redirect('/login')
    }
    next();
}

// Endpoints
router.get('/', privateAccess, ViewsController.goHome);

router.get('/realTimeProducts', privateAccess, ViewsController.getRealTimeProducts);

router.get('/chat', privateAccess, checkRole('usuario'),ViewsController.getChat);

router.get('/products', privateAccess, ViewsController.getProducts);

router.get('/carts/:cid', privateAccess, ViewsController.getCart);

router.get('/register', publicAccess, ViewsController.register);

router.get('/login', publicAccess, ViewsController.login);

router.get('/resetPassword', ViewsController.getPasswordResetForm);

router.get('/changePassword', ViewsController.getPasswordChangeForm)

router.get('/usersManager', checkRole(['admin']), ViewsController.getUsersManager)

module.exports = router;