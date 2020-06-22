const axios = require('axios');
const GIPHY_URL = process.env.GIPHY_URL;
const GIPHY_TOKEN = process.env.GIPHY_TOKEN; 


async function giphyService(title) {

    const giphyResponse = await axios.get(`${GIPHY_URL}${GIPHY_TOKEN}&q=${title}`);
    
    if (giphyResponse.status !== 200) {
        throw new Error ('Giphy API with problems. Try again later');
    }

    return giphyResponse;

}

module.exports = giphyService