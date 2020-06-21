const express = require('express');
const router = express.Router();
const axios = require('axios');

const app = express();

app.use(express.json());

router.get('/', async (req,res) => {
    
    const reqIngredients = req.query.i;
    const LIMIT = 3; 
    const ingredientsArray = reqIngredients.split(',');

    const resopnseRecipes = {
        "keywords" : [...ingredientsArray],
        "recipes" : []
    };

    if (ingredientsArray.length > LIMIT) {
        res.status(400).send(`Error: too ingredients. Limit: ${LIMIT}`)
        return;
    }

    const rowRecipes = await axios.get(`http://www.recipepuppy.com/api/?i=${reqIngredients}&p=1`);
    
    const recipes = rowRecipes.data.results.map(recipe => {
        const {title,  ingredients, href, thumbnail} = recipe;
        return {
            title: title, 
            ingredients: ingredients,
            link: href,
            gif: thumbnail
        }
    });

    resopnseRecipes.recipes = [...recipes]

    res.send(resopnseRecipes)

})

module.exports = router;