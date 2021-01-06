const express = require('express');
const app = express();
const PORT = process.env.PORT || 5050;
const exphbs = require('express-handlebars');
const session = require('express-session')
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
    saveUninitialized: true
}))

//passport
app.use(passport.initialize());
app.use(passport.session());

//handlebars view engine 
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

const path = require('path')

app.use('/',express.static('./public'))
//routes
app.use('/api', require('./routes/api-routes'))
app.use('/', require('./routes/html-routes'))


app.listen(PORT, ()=> {
    console.log('Listening on Port', PORT)
})