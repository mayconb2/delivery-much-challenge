const express = require('express');
const router = express.Router();
const axios = require('axios');
const dotenv = require('dotenv').config();

const app = express();

app.use(express.json());

const RECIPE_PUPPY_URL = process.env.RECIPE_PUPPY_URL;
const LIMIT = process.env.LIMIT;

router.get('/', async (req,res) => {
    
    const reqIngredients = req.query.i;
    const ingredientsArray = reqIngredients.split(',').sort();
    
    const resopnseRecipes = {
        "keywords" : [...ingredientsArray],
        "recipes" : []
    };

    if (ingredientsArray.length > LIMIT) {
        res.status(414).send(`Error: too ingredients. Limit: ${LIMIT}`)
        return;
    }
    console.log(process.env.RECIPE_PUPPY_URL)

    const rowRecipes = await axios.get(`${RECIPE_PUPPY_URL}${reqIngredients}`);
    
    const recipes = rowRecipes.data.results.map(recipe => {
        //todo: make it better
        const {title,  ingredients, href} = recipe;
        
        const newTitle = title.replace(/[\n\r]/g,'');
        
        return {
            title: newTitle, 
            ingredients: ingredients,
            link: href,
        }
    });

    resopnseRecipes.recipes = [...recipes]

    res.send(resopnseRecipes)

})

module.exports = router;