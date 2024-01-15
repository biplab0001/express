const express= require('express')
const path= require('path')
const moment= require('moment')
const { request } = require('http')
const app=express()
const router= require('./routes/api/members')
const bodyparser=require('body-parser')
const exphbs = require('express-handlebars')
const members= require('./member')


// app.get('/', (req,res) => {
//     res.sendFile(path.join(__dirname, 'page', 'index.html'))
// })

// app.use(express.static(path.join(__dirname, 'page')))

// const logger= (req,res,next)=>{
//     console.log(`${req.protocol}://${req.host}${req.originalUrl}: ${moment().format()}`)
//     next()

// }
// app.use(logger)
//body parser middelware
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended : false}))

//Members Api routes
app.use('/api/member', router)


app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Members List',
        members
    });
    
});

const PORT= process.env.PORT || 5000
app.listen(PORT, ()=> console.log(`The server is running on this port ${PORT}`))