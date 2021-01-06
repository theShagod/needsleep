const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');
const bcrypt = require('bcryptjs');
//the issue is the username
module.exports = (passport) => {
    passport.use(new LocalStrategy(
    (username, password, done)=>{
        User.findOne({where: {email:username}})
            .then(user => {
                //user not found
                console.log('appear')
                if(!user) {
                    console.log('user not found')
                    //check if matches with email
                    return User.findOne({where: {email: email}})
                        .then(user => {
                            console.log('in email')
                            if(!user) return done(null, false)
                            //password doesn't match
                            if (user.password != password) return done(null, false)
                            return done(null, user)
                        }).catch(err=>console.log('FFFF UUU'))
                //password doesn't match
                } else if (user.password != password) return done(null, false)
                return done(null, user)
            })
            .catch(console.log)
    }));
    /*
    Once user is authenticated (logs in with create credentials), which can be accomplished by
    making a post request to the /api/login in this case...
    The user will be serialized and deserialized into the session

    
    */
    passport.serializeUser((user, done) => {
        done(null, user.id)
    });
    passport.deserializeUser((id, done) => {
        User.findOne({where: {id: id}})
        .then(user => {
            done(null, user.id);
        }).catch(console.log)
        
    });

}