const express = require('express');
const router = express.Router();
const Recipes = require('../models/recipes');
const List = require('../models/shoppingList.js');
const listSeed = require('../models/listSeed.js');

module.exports = router;


//SEED
router.get('/seed', async (req, res) => {
    try {
        const newItem = await List.create(listSeed);
        res.redirect('/list');
    } catch (err) {
        console.log(err.message);
    }
});

//INDEX
router.get('/', async (req, res) => {
    try {
        const allItems = await List.find();
        res.render('./list/index.ejs', {
            items: allItems[0]
        });
    } catch (err) {
        console.log(err.message);
    }
});

//NEW


//DELETE


//UPDATE
router.put('/edit/:id', async (req, res) => {
    try {
        let updatedItems = await List.findByIdAndUpdate(req.params.id, req.body, {new: true})
        res.redirect('/list');
    } catch(err) {
        console.log(err.message);
        res.send('error: ' + err.message);
    }
});
router.put('/add/:id', async (req, res) => {
    try {
        if(typeof(req.body.item) === 'string') {
            await List.findByIdAndUpdate(req.params.id, {$push: req.body}, {new: true});
        } else {
        for(let i = 0; i < req.body.item.length; i++) {
            await List.findByIdAndUpdate(req.params.id, {$push: {quantity: req.body.quantity[i], measurement: req.body.measurement[i], item: req.body.item[i]}});
        }
    }
        // let updatedItems = await List.findByIdAndUpdate(req.params.id, {$push: {quantity: req.body.quantity, measurement: req.body.measurement, item: req.body.item}}, {new: true});
        // console.log(updatedItems);
        res.redirect('/list');
    } catch(err) {
        console.log(err.message);
        res.send('error: ' + err.message);
    }
});


//CREATE


// EDIT
router.get('/edit', async (req, res) => {
    try {
        const allItems = await List.find();
        res.render('./list/edit.ejs', {
            items: allItems[0]
        });
    } catch(err) {
        console.log(err.message);
        res.send('error: ' + err.message);
    }
});


//SHOW (adding ingredients)
router.get('/add/:id', async (req, res) => {
    try {
        const thisRecipe = await Recipes.find({_id: req.params.id});
        const allItems = await List.find();
        res.render('./list/add.ejs', {
            ingredients: thisRecipe[0].ingredients,
            id: allItems[0].id
        });
    } catch(err) {
        console.log(err.message);
        res.send('error: ' + err.message);
    }
});
