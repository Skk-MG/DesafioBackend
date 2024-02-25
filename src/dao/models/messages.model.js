const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
    user: {
        type:String 
    },
    message:{
        type:String
    }
})

const MessageModel = mongoose.model('messages', MessageSchema)

module.exports = MessageModel; 