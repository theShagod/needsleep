const express = require('express');
const router = express.Router();
const {ensureAuthenticated} = require('../config/auth')
const {User, Bed} = require('../models').models;
const sequelize = require('../models')
router.post('/addBed', ensureAuthenticated('redirect', '/login'), async (req, res) => {
    //if type is not sleep and not wake
    console.log(req.body)
    if (req.body.type !== 'sleep' && req.body.type !== 'wake') {
        req.flash('error_msg', 'type must be sleep or wake')
        return res.status(500).send('type must be sleep or wake')
    }
    const user = await User.findOne({where: {
        id: req.user
    }})
    const bed = await Bed.create({type: req.body.type, date: req.body.date})
    await user.addBeds(bed)
    //res.redirect('/api/getBed')//this doesn't do anything because the post method in client doesn't do anything with response
    res.json('post was success!')
})

router.get('/getBed', async (req, res) => {
    const user = await User.findOne({where: {
        id: req.user
    }})
    req.session.allBeds = await user.getBeds();
    //res.json('success you got this msg (from bed-routes)')
    res.redirect('/dashboard')
})
module.exports = router