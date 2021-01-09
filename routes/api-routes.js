const express = require('express');
const router = express.Router();
const passport = require('passport');
const sequelize = require('../models/index');
const bcrypt = require('bcryptjs');
const FormValidation = require('../config/FormValidation');

router.post('/signup', (req, res) => {
    var errors = FormValidation.getErrors(req.body.username, req.body.email, req.body.password, req.body['password-confirm'])
    if(!errors) return res.send('Please fill in all fields.')
    if(errors.length === 0) { //there are no errors clientside
        let hashedPass = bcrypt.hashSync(req.body.password , bcrypt.genSaltSync(10))
        sequelize.models.User.create({
            username: req.body.username,
            email: req.body.email,
            password: hashedPass
        }).then(() => {
            req.flash('success_msg', 'You are successfully registered, you can now login.')
            res.redirect('/login')
        }).catch(err => { //backend errors, ex: uniques
            //var regex = /(?<=message: 'users\.)[a-zA-Z]*(?=must be unique)'/
            //console.log(err)
            errors = ['Username or email may be taken.']
            req.flash('errors', errors)
            res.redirect('/signup')
        })
    } else {//there are errors
        req.flash('errors', errors)
        res.redirect('/signup')
    }
});

router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/login',
        failureFlash: true
    })(req, res, next)
})

router.get('/logout', (req, res)=> {
    req.logout();
    req.flash('success_msg', 'Logout successful')
    res.redirect('/login');
    
})

module.exports = router