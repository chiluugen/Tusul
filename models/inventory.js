const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const InventorySchema = new Schema({
    title:
    {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 0
    },
    category: {
        type: String,
        enum: ['pill', 'utinsels'],
        lowercase: true
    },
    description: String,
});

module.exports = mongoose.model("Inventory", InventorySchema);