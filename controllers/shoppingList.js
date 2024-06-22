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
            items: allItems
        });
    } catch (err) {
        console.log(err.message);
    }
});

//NEW


//DELETE


//UPDATE
// router.post('/list/edit', async (req, res) => {
//     try {
//         console.log(req.body);
//         res.redirect('/list');
//     } catch(err) {
//         console.log(err.message);
//         res.send('error: ' + err.message);
//     }
// });


//CREATE


// EDIT
router.get('/edit', async (req, res) => {
    try {
        const allItems = await List.find().sort({item: 1});
        res.render('./list/edit.ejs', {
            items: allItems
        });
    } catch(err) {
        console.log(err.message);
        res.send('error: ' + err.message);
    }
});


//SHOW

