const mongoose = require('mongoose');

const listSchema = new mongoose.Schema({
    quantity: {type: Number, required: true},
    measurement: {type: String, default: ' '},
    item: {type: String, required: true}
});

const List = mongoose.model('List', listSchema);

module.exports = List;