const express = require('express');
const router = express.Router();
const {ensureAuthenticated} = require('../config/auth')
const {User, Bed} = require('../models').models;
const sequelize = require('../models')
router.post('/addBed', ensureAuthenticated('redirect', '/login'), async (req, res) => {
    //if type is not sleep and not wake
    if (req.body.type !== 'sleep' && req.body.type !== 'wake') {
        req.flash('error_msg', 'type must be sleep or wake')
        return res.send('type must be sleep or wake')
    }
    const user = await User.findOne({where: {
        id: req.user
    }})
    
    const bed = await Bed.create({type: req.body.type, test: req.body.test})
    await user.addBeds(bed)
    res.redirect('/api/getBed')
})

router.get('/getBed', async (req, res) => {
    const user = await User.findOne({where: {
        id: req.user
    }})
    req.session.allBeds = await user.getBeds();
    res.redirect('/dashboard')
})
module.exports = router