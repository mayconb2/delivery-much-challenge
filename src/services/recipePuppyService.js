const axios = require('axios');

const RECIPE_PUPPY_URL = process.env.RECIPE_PUPPY_URL;

async function recipePuppyService(reqIngredients) {
    
    const rowRecipes = await axios.get(`${RECIPE_PUPPY_URL}${reqIngredients}`);

    if(rowRecipes.status !== 200) {
         throw new Error ('Recipe Puppy API with problems. Try again later');
    }
    
    return rowRecipes;
}

module.exports = recipePuppyService