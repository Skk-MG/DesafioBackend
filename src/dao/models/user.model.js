const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: {
        type: String,
        unique: true
    },
    age: Number,
    password: String,
    cart: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'carts'
    },
    role: {
        type: String,
        default: 'usuario'
    }
})

const UserModel = mongoose.model('users', userSchema);

module.exports = UserModel;