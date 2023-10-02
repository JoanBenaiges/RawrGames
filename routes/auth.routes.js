const router = require("express").Router()
const bcrypt = require('bcryptjs')
const User = require("../models/User.model")
const { isLoggedOut } = require('../middlewares/routes');
const uploaderMiddleware = require('../middlewares/cloudinary.routes')

const saltRounds = 10


// Register
router.get('/register', isLoggedOut, (req, res, next) => res.render('auth/register'))

router.post('/register', isLoggedOut, uploaderMiddleware.single('avatarImg'), (req, res, next) => {

    const { username, email, password, nickname } = req.body

    const avatarImg = req.file?.path

    bcrypt
        .genSalt(saltRounds)
        .then(salt => bcrypt.hash(password, salt))
        .then(hashedPassword => User.create({ username, email, avatarImg, password: hashedPassword, nickname }))
        .then(() => res.redirect('/auth/login'))
        .catch(error => next(error))
})


// Login
router.get('/login', isLoggedOut, (req, res, next) => res.render('auth/login'))

router.post('/login', isLoggedOut, (req, res, next) => {

    const { email, password } = req.body

    if (email.length === 0 || password.length === 0) {
        res.render('auth/login', { errorMessage: 'Faltan campos que rellenar' })
        return
    }


    User
        .findOne({ email })
        .then(foundUser => {

            if (!foundUser) {
                res.render('auth/login', { errorMessage: 'Usuari@ incorrecto' })
                return
            }

            if (!bcrypt.compareSync(password, foundUser.password)) {
                res.render('auth/login', { errorMessage: 'Contraseña incorrecta' })
                return
            }

            req.session.currentUser = foundUser
            res.redirect('/events')
        })
        .catch(err => next(err))
})


//Logout

router.get('/logout', (req, res) => {
    req.session.destroy(() => res.redirect('/'))
})

module.exports = router