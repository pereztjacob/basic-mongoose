const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema({

    name: {
        type: String,
        required: true
    },

    description: {
        type: String
    },

    type: {
        type: String,
        default: 'For-profit'
    },

    address: {
        street: {
            type: String
        },
        city: {
            type: String
        },
        zip: {
            type: String,
            required: true
        },
        state: {
            enum: []
        }
    },

    size: {
        type: Number,
        min: 0
    },

    isHip: {
        type: Boolean
    },

    keywords: {
        type: [String],
        maxlength: 100
    }

});

module.exports = mongoose.model('Company', schema);