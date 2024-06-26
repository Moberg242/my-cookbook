const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const recipesController = require('./controllers/recipes.js');
const shoppingListController = require('./controllers/shoppingList.js');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 3000;

const mongoURI = process.env.MONGOURI;


//middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(methodOverride('_method'));
app.use('/book', recipesController);
app.use('/list', shoppingListController);

//CONNECTTOMONGO
async function connectToMongo() {
    try {
        await mongoose.connect(mongoURI);
        console.log('connected to mongoose');
    } catch(err) {
        console.log(err.message);
    }
}
connectToMongo();

//LISTEN
app.listen(port, ()=> {
    console.log(`listening on port: ${port}`);
});

//project2: https://git.generalassemb.ly/SEBPT-EC-319/project-2
//last commit: "shopping list collection created, index and edit views rendered"

