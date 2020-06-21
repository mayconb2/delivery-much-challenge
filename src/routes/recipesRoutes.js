const express = require('express');
const router = express.Router();
const axios = require('axios');
const dotenv = require('dotenv').config();

const adjustTitle = require('./../helpers/adjustTitle.js')

const app = express();

app.use(express.json());

//consts env
const RECIPE_PUPPY_URL = process.env.RECIPE_PUPPY_URL;
const GIPHY_URL = process.env.GIPHY_URL;
const GIPHY_TOKEN = process.env.GIPHY_TOKEN; 
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

    
    if(rowRecipes.status !== 200) {
        return res.send({"Error": `the Recipe Puppy API return Status Code ${rowRecipes.status}` })
    }

    const recipesWithoutGiphy = rowRecipes.data.results.map(recipe => {
        
        const {title,  ingredients, href} = recipe;
        
        const newTitle = adjustTitle(title);
        
        return {
            title: newTitle, 
            ingredients: ingredients,
            link: href,
        }
    });

    const recipesPromisse =  recipesWithoutGiphy.map(async recipe => {
        const {title, ingredients, link} = recipe;
    
        const giphyResponse = await axios.get(`${GIPHY_URL}${GIPHY_TOKEN}&q=${title}`);

        if(giphyResponse.status !== 200) {
            return res.send({"Error": `the Giphy API return Status Code ${giphyResponse.status}` })
        }

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
    })

})

module.exports = router;