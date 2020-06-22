require('dotenv').config();
const express = require('express');

const app = express();

const recipesRouter = require('./routes/recipesRoutes.js');

app.use(express.json());

app.use('/recipes', recipesRouter);

app.listen(3000, () => {
    console.log('Server started on port 3000');
})