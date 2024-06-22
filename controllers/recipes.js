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
        const allRecipes = await Recipes.find().sort({name: 1});
        res.render('./recipes/index.ejs', {
            recipes: allRecipes
        });
    } catch (err) {
        console.log(err.message);
    }
});

//NEW
router.get('/new', (req, res) => {
    res.render('./recipes/new.ejs');
});

//DELETE
router.delete('/:category/:id', async (req, res) => {
    try {
        await Recipes.findOneAndDelete({_id: req.params.id});
        res.redirect('/book');
    } catch(err) {
        console.log(err.message);
    }
});


//UPDATE
router.put('/:category/:id', async (req, res) => {
    removeExtras(req.body);
    try {
        const updatedRecipe = await Recipes.findOneAndUpdate({_id: req.params.id}, req.body, {new: true});
        res.redirect(`/book/${req.params.category}/${req.params.id}`);
    } catch (err) {
        console.log(err.message);
    }
});

//CREATE
router.post('/', async (req, res) => {
    removeExtras(req.body);
    try {
        const newRecipe = await Recipes.create(req.body);
        res.redirect('/book');
    } catch (err) {
        console.log(err.message);
    }
});

//EDIT
router.get('/:category/:id/edit', async (req, res) => {
    try {
        const thisRecipe = await Recipes.find({_id: req.params.id});
        res.render('./recipes/edit.ejs', {
            recipe: thisRecipe[0]
        });
    } catch (err) {
        console.log(err.message);
    }
});

//SHOW
router.post('/search', async (req, res) => {
    try {
        const results = await Recipes.find({$or: [{tags: req.body.searchBar}, {name: {$options: 'i', $regex: req.body.searchBar}}, {ingredients: req.body.searchBar}]}).sort({name: 1});
        res.render('./recipes/search.ejs', {
            results: results,
            entry: req.body.searchBar
        });
    } catch(err) {
        console.log(err.message);
        res.send(`There are no results found for: ${req.body.searchBar}`);
    }
});

router.get('/:category', async (req, res) => {
    try {
        const thisCategory = await Recipes.find({category: req.params.category}).sort({name: 1});
        res.render('./recipes/browse.ejs', {
            recipes: thisCategory,
            category: req.params.category
        });
    } catch (err) {
        console.log(err.message);
    }
});
router.get('/:category/:id', async(req, res) => {
    try {
        const thisRecipe = await Recipes.find({_id: req.params.id});
        res.render('./recipes/show.ejs', {
            recipe: thisRecipe[0]
        });
    } catch(err) {
        console.log(err.message);
    }
});

function removeExtras(body) {
    if(typeof(body.ingredients) === 'object') {
        let ing = body.ingredients.filter(str => /\w+/.test(str));
        body.ingredients = ing;
    }
    if(typeof(body.steps) === 'object') {
        let steps = body.steps.filter(str => /\w+/.test(str));
        body.steps = steps;
    }
    if(typeof(body.tags) === 'object') {
        let tags = body.tags.filter(str => /\w+/.test(str));
        body.tags = tags;
    }
    if(typeof(body.images) === 'object') {
        let pics = body.images.filter(str => /\w+/.test(str));
        body.images = pics;
    }
}

//project2: https://git.generalassemb.ly/SEBPT-EC-319/project-2
//last commit: all restful routes created and rendered