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

    const rowRecipes = await axios.get(`${RECIPE_PUPPY_URL}${reqIngredients}`);
    
    const recipesWithoutGiphy = rowRecipes.data.results.map(recipe => {
        //todo: make it better
        const {title,  ingredients, href} = recipe;
        
        const newTitle = title.replace(/[\n\r]/g,'');
        
        return {
            title: newTitle, 
            ingredients: ingredients,
            link: href,
        }
    });

    const recipesPromisse =  recipesWithoutGiphy.map(async recipe => {
        const {title, ingredients, link} = recipe;
    
        const giphyResponse = await axios.get(`http://api.giphy.com/v1/gifs/search?api_key=7BwyiYfJ2KBrLcZhXBaQcsv6CVSp2vwy&q=${title}`);
        const giphy = giphyResponse.data.data[0].images.downsized_large.url;

        resopnseRecipes.recipes.push({
            title : title,
            ingredients : ingredients,
            link : link,
            giphy : giphy
        })

    });

    Promise.all(recipesPromisse).then(() => {
        res.send(resopnseRecipes)
        
        console.log(resopnseRecipes)
    })

})

module.exports = router;