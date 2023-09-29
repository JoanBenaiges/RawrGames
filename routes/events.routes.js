const express = require('express')
const router = express.Router()
const { isLoggedIn, checkRoles } = require('../middlewares/routes')
const Event = require('../models/Event.model')
const uploaderMiddleware = require('../middlewares/cloudinary.routes')

const { formatDate } = require('../utils/dateUtils.js');

//List
router.get("/", isLoggedIn, (req, res, next) => {

    const userRoles = {
        isAdmin: req.session.currentUser?.role === 'ADMIN',
        isME: req.session.currentUser?.role === 'ME'
    }

    Event
        .find()
        .then(events => res.render("events/listEvents", { events, userRoles }))
        .catch(err => console.log(err))

});

//Create
router.get("/create", isLoggedIn, checkRoles('ADMIN', 'ME'), (req, res) => {
    res.render("events/createEvents")
})

router.post("/create", uploaderMiddleware.single('eventImg'), (req, res) => {

    const { eventName, description, platform, eventDate, eventURL, city, latitude, longitude } = req.body

    const eventImg = req.file?.path
    console.log(eventImg)

    const location = {
        type: 'Point',
        coordinates: [longitude, latitude]
    }

    Event
        .create({ eventName, description, eventImg, platform, eventDate, eventURL, city, location })
        .then(events => res.redirect("/events"))
        .catch(err => console.log(err))
})



//Details
router.get('/details/:event_id', isLoggedIn, (req, res, next) => {

    const { event_id } = req.params

    const userRoles = {
        isAdmin: req.session.currentUser?.role === 'ADMIN',
        isME: req.session.currentUser?.role === 'ME'
    }

    Event
        .findById(event_id)
        .populate('attendees')
        .then(event => {
            event.formattedDate = formatDate(event.eventDate)
            res.render('events/detailsEvents', { event, userRoles })
        })
        .catch(err => console.log(err))

})


//Edit
router.get("/edit/:event_id", isLoggedIn, checkRoles('ADMIN', 'ME'), (req, res) => {

    const { event_id } = req.params

    Event
        .findById(event_id)
        .then(event => res.render("events/editEvents", event))
        .catch(err => console.log(err))
})


router.post('/edit/:event_id', isLoggedIn, (req, res) => {

    const { event_id } = req.params
    const { eventName, description, platform, eventImg, eventDate, attendees, location } = req.body

    Event
        .findByIdAndUpdate(event_id, { eventName, description, platform, eventImg, eventDate, attendees, location })
        .then(() => res.redirect('/events'))
        .catch(err => console.log(err))
})



//Delete
router.post("/delete/:event_id", isLoggedIn, checkRoles('ADMIN', 'ME'), (req, res) => {

    const { event_id } = req.params

    Event
        .findByIdAndDelete(event_id)
        .then(() => res.redirect('/events'))
        .catch(err => console.log(err))

})


//Add user in event

router.post("/attend/:event_id", isLoggedIn, (req, res) => {

    const { event_id } = req.params;

    Event
        .findByIdAndUpdate(event_id, { $push: { attendees: req.session.currentUser._id } })
        .then(() => res.redirect(`/events/details/${event_id}`))
        .catch(err => console.error(err));
});


//Delete user from event
router.post("/withdraw/:event_id", isLoggedIn, (req, res) => {

    const { event_id } = req.params;

    Event
        .findByIdAndUpdate(event_id, { $pull: { attendees: req.session.currentUser._id } })
        .then(() => res.redirect(`/events/details/${event_id}`))
        .catch(err => console.error(err));
});

module.exports = router;
