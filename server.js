const express = require('express');
const app = express();
const PORT = process.env.PORT || 5050;
const exphbs = require('express-handlebars');
const session = require('express-session');
const flash = require('connect-flash');
//passport config
const passport = require('passport')
require('./config/passport')(passport)

//accepts json payloads
app.use(express.json())
//parses urlencoded payloads
app.use(express.urlencoded({extended: false}))

//session
app.use(session({
    secret:'cats',
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000*60*60*24 * 30 //expires in 30 days
    }
}))

//connect-flash
app.use(flash());
//globals for flash
app.use((req, res, next)=> {
    res.locals.success_msg = req.flash('success_msg'); // msgs from routes/api-routes
    res.locals.errors = req.flash('errors');
    res.locals.error = req.flash('error'); //msgs are from config/passport
    next();
})

//passport
app.use(passport.initialize());
app.use(passport.session());

//handlebars view engine 
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

const path = require('path')

//other assets like css, js
app.use('/',express.static('./public'))
//routes
app.use('/api', require('./routes/api-routes'))
app.use('/', require('./routes/html-routes'))


app.listen(PORT, ()=> {
    console.log('Listening on Port', PORT)
})