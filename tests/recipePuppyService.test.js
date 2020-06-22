const axios = require('axios')
const recipePuppyService = require('./../src/services/recipePuppyService.js')
jest.mock('axios')

describe('recipePuppyService', () => {
    it('handle recipePuppy error', async() => {
        const mockedError = {
            error: {
                status: 500,
                message: 'Server is down'
            }
        }
        axios.get.mockImplementationOnce(() => Promise.resolve(mockedError))
        await expect(recipePuppyService('onios,potatos')).rejects.toThrow(new Error ('Recipe Puppy API with problems. Try again later'))
    })
})