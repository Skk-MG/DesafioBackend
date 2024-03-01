const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

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

cartSchema.plugin(mongoosePaginate);
const CartModel = mongoose.model('carts', cartSchema);

module.exports = CartModel;