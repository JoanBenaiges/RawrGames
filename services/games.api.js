const axios = require('axios')
require('dotenv').config()

class GamesApiHandler {

    constructor() {

        this.axiosApp = axios.create({
            baseURL: 'https://api.rawg.io/api',
            params: {
                key: process.env.API_KEY
            }
        })
    }

    getAllGames(page = Math.floor(Math.random() * 50) + 1) {

        return this.axiosApp.get(`/games`, { params: { page } })
    }

    searchGames(searchGame) {

        return this.axiosApp.get(`/games?search=${searchGame}`)
    }

    getOneGame(id) {

        return this.axiosApp.get(`/games/${id}`)
    }

}

const GamesApi = new GamesApiHandler()

module.exports = GamesApi
