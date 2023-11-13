const mongoose = require("mongoose")

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true},
    description: { type: String},
    year: { type: Number, required: true},
    quantity: { type: Number, required: true},
    imageURL: { type: String},
})

module.exports = mongoose.model('Book', bookSchema)