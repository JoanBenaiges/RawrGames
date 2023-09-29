const express = require('express');
const router = express.Router();
const gamesApi = require('../services/games.api');

router.get("/", (req, res, next) => {

    const page = req.query.page
    gamesApi
        .getAllGames(page)
        .then(response => res.render('games/gameList', { games: response.data.results, loggedUser: req.session.currentUser, page }))
        .catch(err => next(err))

});

router.post("/search", (req, res, next) => {

    const { searchGame } = req.body

    gamesApi
        .searchGames(searchGame)
        .then(response => res.render('games/gameList', { games: response.data.results}))
        .catch(err => next(err))

})


router.get('/:id/details', (req, res, next) => {

    const { id } = req.params


    gamesApi

        .getOneGame(id)
        .then(response => res.render('games/gameDetails', { game: response.data}))
        .catch(err => next(err))
})

module.exports = router;
