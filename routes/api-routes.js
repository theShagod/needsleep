const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/User');
router.post('/signup', (req, res) => {
    if(!req.body.username || !req.body.password || !req.body.email){
        return res.send('must have username, password and email.')
    } else {
        User.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        }).then(() => res.redirect('/login'))
        .catch(err => {
            console.log("User was not created. Something when wrong.")
            res.redirect('/')
        })
        
    }
});

router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/'
    })(req, res, next)
})

module.exports = router