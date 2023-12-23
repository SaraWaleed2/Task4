const request = require('request');

const geocode = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + address + ".json?access_token=pk.eyJ1Ijoic2FyYTF3IiwiYSI6ImNscDhzbTdpdjJqc3Aya281dWNydHFjbHMifQ.v03XEqilUyFQC-2AkBo4xg"
    request({ url, json: true }, (error, res) => {
        if (error) {
            callback("Sorry , Error has occured , can't load all services", undefined)
        } else if (res.body.message) {
            callback(res.body.message, undefined)
        } else if (res.body.features.length == 0) {
            callback("Your search is invalid", undefined)
        }
        else {
            callback(undefined,
                {
                    latitude: res.body.features[0].center[0],
                    longitude: res.body.features[0].center[1]
                }
            )
        }
    })

}

module.exports = geocode