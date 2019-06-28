
// we usually require the core modules before we require the NPM modules
const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const publicDirectoryPath = path.join(__dirname, '../public')

// set up custom path to the views directory, this is optional, works with root directory called 'views' by default
const viewsDir = path.join(__dirname, '../templates/views')
const partialsDir = path.join(__dirname, '../templates/partials')
app.set('views', viewsDir)
hbs.registerPartials(partialsDir)

// set up hbs (handlebars engine for express)
app.set('view engine', 'hbs')

// setup static directory to use
// gotta use the .html extension to serve the correct page though
app.use(express.static(publicDirectoryPath))

// make express render index.hbs to html
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Mousiik Jenkins'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'dis is Weather App',
        name: 'Mousiik Jenkins'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        errorMessage: 'whatcha need?',
        title: 'PLZ HELP!',
        name: 'Mousiik Jenkins'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'All we had to do was follow the damn train CJ'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if(error) {
            return res.send({ error })
        }
        
        forecast.forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                // address: req.query.address
            })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        errorMessage: 'Help article not found',
        title: '404',
        name: 'Mousiik Jenkins'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        errorMessage: 'Page not found',
        title: '404',
        name: 'name nameson'
    })
})

// starts up the server
app.listen(3000, () => {
    console.log('server is up and running 3000')
})

// note for self: if getting an error saying that the views folder cannot be located, need to a) rename the views directory to views (by default), or b) make sure the views directory is in the root folder of the project