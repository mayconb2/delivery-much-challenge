require('dotenv').config();
const express = require('express');

const app = express();

const INTER_PORT = process.env.INTER_PORT;

const recipesRouter = require('./routes/recipesRoutes.js');

app.use(express.json());

app.use('/recipes', recipesRouter);

app.listen(INTER_PORT, () => {
    console.log(`Server started on port ${INTER_PORT}`);
})