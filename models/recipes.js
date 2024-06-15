const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    name: {type: String, required: true},
    category: {type: String, required: true, default: 'New'},
    ingredients: [String],
    steps: [String],
    images: [String]
});

const Recipes = mongoose.model('Recipes', recipeSchema);

module.exports = Recipes;