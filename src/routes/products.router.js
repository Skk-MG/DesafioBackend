const {Router} = require('express');
const ProductsController = require('../controllers/products.controller');
const checkRole = require('../middlewares/checkRole.middleware');

const router = Router();

router.get('/', ProductsController.getProductList);

router.get('/:pid', ProductsController.getById);

router.post('/', checkRole('admin'), ProductsController.create);

router.put('/:pid', checkRole('admin'), ProductsController.update);

router.delete('/:pid', checkRole('admin'), ProductsController.delete);

module.exports = router;