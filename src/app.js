const { log } = require('console');
const express = require('express');
const app = express();
const port = process.env.PORT || 3003

////////////////////////////////////////////////////////////////////

const hbs = require('hbs');
app.set('view engine', 'hbs');
const path = require('path');

////////////////////////////////////////////////////////////////////

const publicDirectory = path.join(__dirname, '../public')
app.use(express.static(publicDirectory))

////////////////////////////////////////////////////////////////////

const viewsDirectory = path.join(__dirname, '../Temp1/views')
app.set('views', viewsDirectory);

////////////////////////////////////////////////////////////////////

const partialsPath = path.join(__dirname, "../Temp1/partials")
hbs.registerPartials(partialsPath)

////////////////////////////////////////////////////////////////////

app.get('/', (req, res) => {
    res.render('index', {
        desc: "Welcome to weather cast. Enter any country and see the weather forecast.",
    })
})


app.get('/weatherCast', (req, res) => {
    res.render('weatherCast', {
        desc: "This weather Cast page"
    })
})

////////////////////////////////////////////////////////////////////////////

const forecast = require("./Tools/forecast")
const geocode = require("./Tools/geocode");

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide address'
        })
    }
    geocode(req.query.address, (error, data) => {
        if (error) {
            return res.send({ error })
        }
        forecast(data.latitude, data.longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                country: "Country: " + req.query.address.toUpperCase(),
                region: forecastData.region,
                condition: forecastData.condition,
                temp: forecastData.temp,
                longitude: "latitude: " + data.latitude,
                latitude: "longitude: " + data.longitude
            })
        })
    })
})

////////////////////////////////////////////////////////////////////////////

app.get('*', (req, res) => {
    res.send({
        error: 'ERROR 404'
    })
})
////////////////////////////////////////////////////////////////////////////


app.listen(port, () => {
    console.log(port + " , Is Working");
})

