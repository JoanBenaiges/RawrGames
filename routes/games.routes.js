const express = require('express');
const router = express.Router();
const gamesApi = require('../services/games.api');
const { isLoggedIn } = require('../middlewares/routes');

router.get("/", isLoggedIn, (req, res, next) => {

    const page = req.query.page
    gamesApi
        .getAllGames(page)
        .then(response => res.render('games/gameList', { games: response.data.results, loggedUser: req.session.currentUser, page }))
        .catch(err => next(err))

});

router.post("/search", isLoggedIn, (req, res, next) => {

    const { searchGame } = req.body

    gamesApi
        .searchGames(searchGame)
        .then(response => res.render('games/gameList', { games: response.data.results, loggedUser: req.session.currentUser }))
        .catch(err => next(err))

})


router.get('/:id/details', isLoggedIn, (req, res, next) => {

    const { id } = req.params


    gamesApi

        .getOneGame(id)
        .then(response => res.render('games/gameDetails', { game: response.data, loggedUser: req.session.currentUser }))
        .catch(err => next(err))
})

router.get('/:id/trailers', isLoggedIn, (req, res, next) => {

    const { id } = req.params


    console.log(req.params)
    gamesApi
        .getGameTrailer(id)
        .then(response => {
            const trailer = response.data.results[0].data.max

            res.render('games/gameMovies', { trailer, loggedUser: req.session.currentUser })
        })
        .catch(err => next(err))

})

// if (data === undefined) {

//     return response[1].data?.results.preview
// }

module.exports = router;
