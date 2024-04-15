const {Router} = require('express');
const CartController = require('../controllers/cart.controller');

const router = Router();

router.post('/', CartController.create);

router.get('/:cid', CartController.getById);

router.get('/', CartController.getList);

router.post('/:cid/product/:pid', CartController.addProduct);

router.delete('/:cid/products/:pid', CartController.deleteProduct);

router.put('/:cid', CartController.update);

router.put('/:cid/products/:pid', CartController.updateProductQuantity);

router.delete('/:cid', CartController.delete);

module.exports = router;
