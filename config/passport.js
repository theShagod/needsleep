const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const {User} = require('../models/index').models;
const bcrypt = require('bcryptjs');
//the issue is the username
module.exports = (passport) => {
    /*
    Tests:
    POST .../api/login
    {
	"username": "jfon@gmail.com", //correct login info
	"password": "123456"
    } 
    => passes
    POST .../api/login
    {
	"username": "jfon", //correct login info
	"password": "123456"
    } 
    =>passes

    POST .../api/login
    {
	"username": "jfo", //wrong login info
	"password": "123456"
    } 
    =>fails
    POST .../api/login
    {
	"username": "jfon@gmail.com", //existing username but wrong pass info
	"password": "1234567"
    } 
    => fails
    POST .../api/login
    {
	"username": "jfon", //existing username but wrong pass info
	"password": "1234567"
    } 
    => fails
    */
    passport.use(new LocalStrategy(
    (username, password, done)=>{
        const match = (field, cb) => {
            let search = JSON.parse(`{"${field}":"${username}"}`)
            User.findOne({where: search})
                .then(user => {
                    //user not found
                    if(!user) {
                        return cb()
                    //password doesn't match
                    } else if (bcrypt.compareSync(password, user.password)) return done(null, user)
                    return done(null, false, 'Wrong password')
                    
                }).catch(console.log)
        }
        //finds matching username and if no matching, it will find a matching email
        //if a matching username or email occurs, it will check the password to see
        //if it is matching. done will be returned based on the success of operation
        match("username",()=> {
            match("email", () => done(null, false, 'Username or email not found'))
        })
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