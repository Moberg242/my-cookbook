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
router.get('/new', (req, res) => {
    res.render('new.ejs');
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
    // let cats = ['ingredients','steps','images','tags'];
    // for(let i = 0; i < cats.length; i++) {
    //     let updated = req.body[cats[i]].filter(str => /\w+/.test(str));
    //     req.body[cats[i]] = updated;
    // }
    // let ing = req.body.ingredients.filter(str => /\w+/.test(str));
    // req.body.ingredients = ing;
    // console.log(req.body);
    try {
        const updatedRecipe = await Recipes.findOneAndUpdate({_id: req.params.id}, req.body, {new: true});
        res.redirect(`/book/${req.params.category}/${req.params.id}`);
    } catch (err) {
        console.log(err.message);
    }
});

//CREATE
router.post('/', async (req, res) => {
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
        res.render('edit.ejs', {
            recipe: thisRecipe[0]
        });
    } catch (err) {
        console.log(err.message);
    }
});

//SHOW
router.get('/:category', async (req, res) => {
    try {
        const thisCategory = await Recipes.find({category: req.params.category});
        res.render('browse.ejs', {
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
        res.render('show.ejs', {
            recipe: thisRecipe[0]
        });
    } catch(err) {
        console.log(err.message);
    }
});

//project2: https://git.generalassemb.ly/SEBPT-EC-319/project-2
//last commit: all restful routes created and rendered