const express = require('express')
router = express.Router();
const {ensureAuthenticated} = require('../config/auth')
router.get('/', (req,res)=>{
    res.render('index')
})

router.get('/login', ensureAuthenticated('render', 'login'), (req,res)=>{
    res.redirect('/dashboard')
})

router.get('/signup', ensureAuthenticated('render', 'signup'), (req,res)=>{
    res.redirect('/dashboard')
})

router.get('/dashboard', ensureAuthenticated('redirect', '/login'), (req,res)=>{
    res.render('dashboard')
})

module.exports = router