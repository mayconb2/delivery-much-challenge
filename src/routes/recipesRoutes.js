const express = require('express');
const router = express.Router();
const axios = require('axios');

const app = express();

app.use(express.json());

router.get('/', async (req,res) => {
    
    const reqIngredients = req.query.i;
    const LIMIT = 3; 
    const ingredientsArray = reqIngredients.split(',');

    if (ingredientsArray.length > LIMIT) {
        res.status(400).send(`Error: too ingredients. Limit: ${LIMIT}`)
        return;
    }

    const response = await axios.get(`http://www.recipepuppy.com/api/?i=${reqIngredients}&p=1`);
    
    res.send(response.data)

})

module.exports = router;