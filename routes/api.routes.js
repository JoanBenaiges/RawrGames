const express = require('express')

const Event = require('../models/Event.model')
const router = express.Router()

router.get("/events", (req, res, next) => {

    Event
        .find()
        .then(events => res.json(events))
        .catch(err => res.status(500).json('Server error'))
})

module.exports = router