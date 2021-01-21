const express = require('express');
const app = express();
const PORT = process.env.PORT || 5050;
const exphbs = require('express-handlebars');
const session = require('express-session');
const flash = require('connect-flash');
//passport config
const passport = require('passport')
require('./config/passport')(passport)
//connects to db
const sequelize = require('./models')

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

//other assets like css, js
app.use('/',express.static('./public'))

//handlebars view engine 
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

const { test } = require('qunit');

//routes
app.use('/api', require('./routes/user-routes'))
app.use('/api', require('./routes/bed-routes'))
app.use('/', require('./routes/html-routes'))

async function seqTest(){
    const {User, Bed} = sequelize.models
    user = await User.create({username:'ff', password: '1234567890', email:'ff@gmail.com'})
    const users = await User.findAll()
    bed = await Bed.create({type:'wake', test: '69'})
    bed2 = await Bed.create({type:'sleep', test: '70'})
    await user.addBeds(bed)
    await user.addBeds(bed2)
    console.log(await user.getBeds())
}

app.listen(PORT, async ()=> {
    try {
        await sequelize.authenticate(); //check if connection made
    } catch {
        console.log('db connection failed.')
    }
    
    await sequelize.sync({force:false});
    //await seqTest()
    console.log('Listening on Port', PORT)
})