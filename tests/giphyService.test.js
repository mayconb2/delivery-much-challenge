const axios = require('axios')
const giphyService = require('./../src/services/giphyService.js')
jest.mock('axios')

describe('giphyService', () => {
    it('handle giphy error', async() => {
        const mockedError = {
            error: {
                status: 500,
                message: 'Server is down'
            }
        }
        axios.get.mockImplementationOnce(() => Promise.resolve(mockedError))
        await expect(giphyService('onios,potatos')).rejects.toThrow(new Error ('Giphy API with problems. Try again later'))
    })
})