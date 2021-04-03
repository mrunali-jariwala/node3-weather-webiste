const express = require('express')
const geocode = require('../utils/geocode')
const forecast = require('../utils/forecast')

const app = express()
const router = express.Router()

router.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Mrunali Jariwala'
    },(error, html) => {
        if (error) {
            return res.status(500).send({error})
        }

        res.send(html)
    })
})

router.get('/json', (req, res) => {

    const {address} = req.query

    if (!address) {
        return res.status(400).send({
            error: 'You must provide address'
        })
    }
    
    geocode(address, (error, {latitude = 21.17, longitude = 72.83, location} = {}) => {

        if (error) {
            return res.status(500).send({error})
        }
    
        forecast(latitude, longitude, (error, forecast) => {
            if (error) {
                return res.status(500).send({error})
            }
    
            res.json({
                location, 
                latitude,
                longitude,
                forecast})
        })
    })
})

module.exports = router