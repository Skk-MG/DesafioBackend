const generateProducts = require("../utils/faker");

class MocksController {
    static async getProducts(req, res) {
        try {
            let mockProducts = []

            for (let i = 0; i < 100; i++) {
                let element = generateProducts();
                mockProducts.push(element)
            }

            res.send({status: 'Success', payload: mockProducts})

        } catch (error) {
            res.status(error.status || 500).send({status: 'Error', error: error.message})
        }
    }
}

module.exports = MocksController;