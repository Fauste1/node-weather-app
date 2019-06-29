
const request = require('request')

const forecast = (longitude, latitude, callback) => {
    
    const darkskyKey = 'e0fe7f044c17a502d2c5270fda8f150a'
    const url = `https://api.darksky.net/forecast/${darkskyKey}/${longitude},${latitude}?units=si`
    
    request({ url, json: true}, (error, response, { error:bodyError, currently}) => {
        if (error) callback('Unable to connect to weather services')
        else if (bodyError) callback(bodyError)
        else {
            callback(undefined, `Weather is: ${currently.summary}, It's currently ${currently.temperature} degrees celsius. The chance of rain is ${currently.precipProbability*100} %`)
        }
    })
}

module.exports.forecast = forecast
    // callback(undefined, {
    //     summary: `${currently.summary}, It's currently ${currently.temperature}`
        
    //     // summary: currently.summary,
    //     // temperature: currently.temperature
    // })

// https://api.darksky.net/forecast/e0fe7f044c17a502d2c5270fda8f150a/-71.0589,42.3601?units=si