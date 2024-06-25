const express = require('express');
const router = express.Router();
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
        console.log(updatedItems);
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
        console.log(allItems);
        res.render('./list/edit.ejs', {
            items: allItems[0]
        });
    } catch(err) {
        console.log(err.message);
        res.send('error: ' + err.message);
    }
});


//SHOW

