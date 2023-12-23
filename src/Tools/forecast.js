const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = "https://api.weatherapi.com/v1/current.json?key=eec94890f7624c55b97131903232111&q=" + latitude + "," + longitude
    request({ url, json: true }, (error, res) => {
        if (error) {
            callback("Sorry , Error has occured", undefined)
        } else if (res.body.error) {
            callback(res.body.error.message, undefined)
        } else {
            callback(undefined,
                {
                    region: "Region: " + res.body.location.region,
                    condition: "Condition: " + res.body.current.condition.text,
                    temp: "Temperature: " + res.body.current.temp_c + " C"
                }
            )
        }
    })

}

module.exports = forecast