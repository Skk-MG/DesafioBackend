const mongoose = require('mongoose')

const TicketSchema = new mongoose.Schema({
    code: { 
        type: String, 
        required: true 
    },
    purchase_datetime: { 
        type: String, 
        required: true 
    },
    amount: { 
        type: Number,
        required: true 
    },
    purchaser: { 
        type: String, 
        required: true 
    }
});

const TicketModel = mongoose.model('tickets', TicketSchema);

module.exports = TicketModel;