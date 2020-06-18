const mongoose = require('mongoose');
const Joi = require('Joi');

const Customers = mongoose.model('Customers', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    isGold: {
        type: Boolean,
        default: false
    },
    phone: {
        type: String,
        required: true,

    }
}));

function validateCustomers(customer) {
    const schema = {
        name: Joi.string().min(4).max(50).required(),
        phone: Joi.string().min(5).max(20).required(),
        isGold: Joi.boolean()
    };
    return Joi.validate(customer, schema);
}

exports.Customers = Customers;
exports.validate = validateCustomers;
