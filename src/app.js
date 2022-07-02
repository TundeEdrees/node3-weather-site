const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geoCode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// console.log(__dirname)
// console.log(path.join(__dirname, '../public'))

const app = express()

const port = process.env.PORT || 3000

// define path for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// set up handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

// set up static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('',(req, res) => {
    res.render('index', {
        title:'Weather',
        name: 'Idrees'
    })
})

app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About me',
        name: "Idrees"
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        msg: 'Nothing for you, b',
        title: 'Help',
        name: 'Idrees'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'Please provide an address'
        })
    }
    geoCode(req.query.address, (error,{latitude,longitude,location }={}) => {
        if (error) {
            return res.send({error})
        }
        forecast(latitude,longitude, (error, forecastData) => {
            if(error) {
                return res.send(error)
            }
    
            res.send({
                location,
                forecast:forecastData,
                address:req.query.address
            })
    })
    })
})

app.get('/products',(req,res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })

    }
    console.log(req.query.search)
    res.send({
        products:[]
    })
})

app.get('/help/*',(req, res) => {
    res.render('errorpage',{
        title: '404',
        descrip: 'Help articles not found',
        name: 'Idrees'
    })
})


app.get('*',(req, res) => {
    res.render('errorpage',{
        title:'404',
        descrip: 'Page not found',
        name: 'Idrees'
    })
})
// app.com
// app.com/help
// app.com/about

app.listen(port, () => {
    console.log('Server is up on port ' +port)
})