const express = require('express');
const router = express.Router();
const Recipes = require('../models/recipes');
const SeedData = require('../models/seed.js');

module.exports = router;

//SEED
router.get('/seed', async (req, res) => {
    try {
        await Recipes.create(seedData);
        res.redirect('/book');
    } catch(err) {
        console.log(err.message);
    }
});

//INDEX
router.get('/', (req, res) => {
    res.send('index');
});

//NEW

//DELETE

//UPDATE

//CREATE

//EDIT

//SHOW