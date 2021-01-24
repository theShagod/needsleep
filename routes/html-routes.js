const express = require('express')
router = express.Router();
const {ensureAuthenticated} = require('../config/auth')
router.get('/', (req,res)=>{
    res.render('index')
})
//goes to login by default unless auth where it goes to dashboard
router.get('/login', ensureAuthenticated('render', 'login'), (req,res)=>{
    res.redirect('/dashboard')
})
//goes to signup by default unless auth then it goes to dashboard
router.get('/signup', ensureAuthenticated('render', 'signup'), (req,res)=>{
    res.redirect('/dashboard')
})

router.get('/dashboard', ensureAuthenticated('redirect', '/login'), (req,res)=>{
    //defined allBeds in bed-routes
    console.log(req.session.allBeds)
    res.render('dashboard', {
        data: req.session.allBeds
    })
})

module.exports = router