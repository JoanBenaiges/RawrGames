const express = require('express');
const router = express.Router();

const { isLoggedIn } = require('../middlewares/routes');

router.get("/maps", isLoggedIn, (req, res, next) => {
    res.render("maps/map")
})

module.exports = router;