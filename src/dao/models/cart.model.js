const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    products: {
        type: [{
            product: String,
            quantity: Number
        }],
        default: [],
        required: true
    }
});

const CartModel = mongoose.model('carts', cartSchema);

module.exports = CartModel;