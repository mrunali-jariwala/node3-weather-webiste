const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express()
const port = process.env.PORT || 3000

const publicDirectoryPath = path.join(__dirname, '../public')
const viewDirectoryPath = path.join(__dirname, '../templates/views')
const partialsDirectoryPath = path.join(__dirname, '../templates/partials')

app.use(express.static(publicDirectoryPath))

app.set('view engine', 'hbs')
app.set('views', viewDirectoryPath)

hbs.registerPartials(partialsDirectoryPath)

app.use('/weather', require('./weather'));

app.get('', (req, res) => {
    res.redirect('/weather')
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Mrunali Jariwala'
    },(error, html) => {
        if (error) {
            return res.status(500).send({error})
        }

        res.send(html)
    })
})

app.get('/help', (req, res) => {

    res.render('help', {
        title: 'Help',
        name: 'Mrunali Jariwala'
    }, (error, html) => {
        if (error) {
            return res.status(500).send({error})
        }

        res.send(html)
    })
})

app.get("*", (req, res) => {
    res.render('404', {
        title: '404 - Not Found',
        name: 'Mrunali Jariwala'
    },(error, html) => {
        if (error) {
            return res.status(500).send({error})
        }

        res.send(html)
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})