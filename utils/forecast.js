const request = require('postman-request')

const forecast = (latitude, longitude, callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=e4cf67843bf40de85cc21fe88ebf09b2&query=' + latitude + ',' + longitude + '&limit=1'

    request({url, json: true}, (error, response, body) => {

        if (error) {
            return callback('Unable to connect weather service', undefined)
        } else if (response.error) {
            return callback('Unable to find location', undefined)
        }

        const{weather_descriptions, temperature, feelslike, humidity} = body.current

        callback(undefined, weather_descriptions[0] + '. It is ' + temperature + ' degree. ' + 'It feels like ' + 
        feelslike + ' degree. ' + 'Humidity is ' + humidity + "%")
    })
}

module.exports = forecast