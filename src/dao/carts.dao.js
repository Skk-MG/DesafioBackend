const CartModel = require("./models/cart.model")

class CartsDao {

    async getAll() {
        return await CartModel.find().lean();
    }

    async getById(id) {
        return await CartModel.findOne({_id:id}).populate('products.product').lean();
    }

    async create(cart) {
        return await CartModel.create(cart);
    }

    async update(id, product) {
        return await CartModel.updateOne({_id:id}, product);
    }

    async delete(id) {
        return await CartModel.deleteOne({_id:id});
    }
}

module.exports = CartsDao;