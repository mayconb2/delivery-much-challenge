const express = require('express');

const app = express();

const recipesRouter = require('./routes/recipesRoutes.js');

app.use(express.json());

app.use('/recipes', recipesRouter);

app.listen(3100, () => {
    console.log('Server started on port 3100');
})