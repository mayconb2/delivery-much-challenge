const express = require('express');
const router = express.Router();

const recipesController = require('./../controllers/recipesController.js');

const app = express();

app.use(express.json());

router.get('/', async (req,res) => {
    recipesController(req, res);
})

module.exports = router;