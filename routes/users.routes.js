const express = require('express');
const router = express.Router();
const { isLoggedIn, checkRoles } = require('../middlewares/routes')
const User = require("../models/User.model");


//Go to user list
router.get('/userlist', isLoggedIn, (req, res, next) => {
    

    User
        .find()
        .then(users => res.render('users/userList', { users }))
        .catch(err => console.log(err))
})


//View profile
router.get('/details/:user_id', isLoggedIn, (req, res) => {


    const userRoles = {
        isAdmin: req.session.currentUser?.role === 'ADMIN',
    }

    const { user_id } = req.params

    User
        .findById(user_id)
        .then(user => {
            res.render("users/profile", { user, userRoles })
        })

        .catch(err => console.log(err))

})


//Edit profile
router.get("/edit/:user_id", isLoggedIn, (req, res) => {

    const { user_id } = req.params

    const adminRole = {
        isAdmin: req.session.currentUser.role === 'ADMIN',
    }
    const idOwner = {
        isOwner: req.session.currentUser._id === user_id
    }

    if (adminRole.isAdmin || idOwner.isOwner) {

        User
            .findById(user_id)
            .then(user => res.render("users/editUser", user))
            .catch(err => console.log(err))
    } else {
        res.redirect('/users/userlist')
    }
})


router.post('/edit/:user_id', isLoggedIn, (req, res) => {

    const { user_id } = req.params
    const { username, email, nickname, avatarImg, aboutMe, password } = req.body

    User
        .findByIdAndUpdate(user_id, { username, email, nickname, avatarImg, aboutMe, password })
        .then(() => res.redirect('/users/userList'))
        .catch(err => console.log(err))
})


//Delete user

router.post("/delete/:user_id", isLoggedIn, checkRoles('ADMIN'), (req, res) => {

    const { user_id } = req.params

    User
        .findByIdAndDelete(user_id)
        .then(() => res.redirect('/users/userList'))
        .catch(err => console.log(err))

})

module.exports = router;