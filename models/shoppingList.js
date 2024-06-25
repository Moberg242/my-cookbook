const mongoose = require('mongoose');

const listSchema = new mongoose.Schema({
    quantity: Array,
    measurement: Array,
    item: Array
});

const List = mongoose.model('List', listSchema);

module.exports = List;

