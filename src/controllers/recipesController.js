const adjustTitle = require('./../helpers/adjustTitle.js')
const recipePuppyService = require('./../services/recipePuppyService.js')
const giphyService = require('./../services/giphyService.js')

const LIMIT = process.env.LIMIT;

async function recipesController(req, res) {
    
    if (!req.query.i) {
        return res.send('I hope you enjoy this API. See you soon :)')
    }

    const reqIngredients = req.query.i;
    const ingredientsArray = reqIngredients.split(',').sort();
    
    const resopnseRecipes = {
        "keywords" : [...ingredientsArray],
        "recipes" : []
    };

    if (ingredientsArray.length > LIMIT) {
        return res.status(414).send(`Error: too many ingredients. Limit: ${LIMIT}`);
    }

    try {
        
        const rowRecipes = await recipePuppyService(reqIngredients);
     
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
            
            try {
                const giphyResponse = await giphyService(title);
                const giphy = giphyResponse.data.data[0].images.downsized_large.url;

                resopnseRecipes.recipes.push({
                    title : title,
                    ingredients : ingredients,
                    link : link,
                    gif : giphy
                });
            } catch (error) {
                res.status(400).send(error.message);
                return;
            }

        });

        Promise.all(recipesPromisse).then(() => {
        return res.send(resopnseRecipes)
        })

    } catch (error) {
        res.status(400).send(error.message)
    }
    
}

module.exports = recipesController;