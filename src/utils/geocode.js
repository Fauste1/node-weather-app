
const request = require('request')

const geocode = (address, callback) => {
    
    const mapboxAccessToken = 'access_token=pk.eyJ1IjoiZmF1c3RpYW4iLCJhIjoiY2p0aG1hNDAxMDMzejN5bWQwN3o5dXdlcSJ9.vUu12TYTRrJ-Ei0wjw7SVQ'
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?${mapboxAccessToken}&limit=1&fuzzyMatch=false`

    request ({ url, json: true}, (error, response, { features }) => {
        if (error) callback('Unable to connect to location services')
        else if (features.length === 0) callback('invalid location address')
        else if (features.length > 0) {
            callback(undefined, {
                longitude: features[0].center[0], 
                latitude: features[0].center[1],
                location: features[0].place_name
            })
        }
    })

}

module.exports = geocode