const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const recipesController = require('./controllers/recipes.js');
const shoppingListController = require('./controllers/shoppingList.js');
const app = express();
const port = process.env.PORT || 3000;

const mongoURI = 'mongodb+srv://moberg242:mongoDB@sebpt-319.vz9uiro.mongodb.net/recipes';


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