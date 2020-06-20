const express = require('express');
const router = express.Router();
const axios = require('axios');

const app = express();

app.use(express.json());

router.get('/', async (req,res) => {
    
    const response = await axios.get('http://www.recipepuppy.com/api/?i=onions,garlic&q=omelet&p=3');
    
    res.send(response.data)
})





module.exports = router;