const mongoose = require('mongoose');

const ShopSchema = new mongoose.Schema({
    userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    address: {
        type: String,
        required: true,
        trim: true
    },
    phone: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

ShopSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

const Shop = mongoose.model('Shop', ShopSchema);

module.exports = Shop;