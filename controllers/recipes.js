const express = require('express');
const router = express.Router();
const Recipes = require('../models/recipes');
const SeedData = require('../models/seed.js');

module.exports = router;

//SEED
router.get('/seed', async (req, res) => {
    try {
        await Recipes.create(SeedData);
        res.redirect('/book');
    } catch (err) {
        console.log(err.message);
    }
});

//INDEX
router.get('/', async (req, res) => {
    try {
        const allRecipes = await Recipes.find();
        res.render('index.ejs', {
            recipes: allRecipes
        });
    } catch (err) {
        console.log(err.message);
    }
});

//NEW

//DELETE

//UPDATE

//CREATE

//EDIT

//SHOW
router.get('/:category', async (req, res) => {
    try {
        const thisCategory = await Recipes.find({category: req.params.category});
        res.render('browse.ejs', {
            recipes: thisCategory
        });
    } catch (err) {
        console.log(err.message);
    }
});
router.get('/:category/:id', async(req, res) => {
    try {
        const thisRecipe = await Recipes.find({_id: req.params.id});
        res.render('show.ejs', {
            recipe: thisRecipe[0]
        });
    } catch(err) {
        console.log(err.message);
    }
})

// try {

// } catch(err) {
//     console.log(err.message);
// }