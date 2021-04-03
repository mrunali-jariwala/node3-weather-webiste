const request = require('postman-request')

const geocode = (address, callback) => {
    
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoibXJ1bmFsaWphcml3YWxhIiwiYSI6ImNrbXJhaDFrcjAyOWYycG81NmlhZWhucTUifQ.6hKJ3Nmhw6vt_8tYGw-Q4Q&limit=1'

    request({url, json: true}, (error, response, body) => {
        
        if (error) {
            return callback('Unable to connect location service', undefined)
        } else if (body.message || body.features.length === 0) {
            return callback('Unable to find location. Please try another', undefined)
        }

        const {center, place_name} = body.features[0]

        callback(undefined, {
            latitude: center[1],
            longitude: center[0],
            location: place_name
        })
    })
}

module.exports = geocode