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

    getAllGames(page = 1) {

        return this.axiosApp.get(`/games`, { params: { page } })
    }

    searchGames(searchGame) {

        return this.axiosApp.get(`/games?search=${searchGame}`)
    }

    searchGamesForGenre(searchGenre) {

        return this.axiosApp.get(`/genres?search=${searchGenre}`)
    }

    getOneGame(id) {

        return this.axiosApp.get(`/games/${id}`)
    }

    getGameTrailer(id) {

        return this.axiosApp.get(`/games/${id}/movies`)
    }

}

const GamesApi = new GamesApiHandler()

module.exports = GamesApi
