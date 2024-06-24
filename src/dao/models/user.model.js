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
    },
    documents: {
        type: [{
            name: String,
            reference: String
        }],
        default: []
    },
    last_connection: {
        type: Date,
        default: null
    },
    profile_picture: {
        type: String,
        default: ""
    }
})

const UserModel = mongoose.model('users', userSchema);

module.exports = UserModel;