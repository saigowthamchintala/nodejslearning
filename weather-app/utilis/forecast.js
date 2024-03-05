const request = require('request')
const forecast = (latitude,longitude,callback)=>{
    url = 'http://api.weatherstack.com/current?access_key=632b891526368d69d6db006bc7a5c851&query='+ latitude +','+ longitude
    request({url,json:true},(error,{body})=>{
        if(error){
            callback('Unable to connect to weather service!',undefined)
        }
        else if(body.error){
            callback('Unable to find location',undefined)
        }
        else{
            callback(undefined,body.current.weather_descriptions[0]+". It is currently "+body.current.temperature+" degrees.It feels like "+body.current.feelslike+" degrees out.")
        }
    })

}
module.exports = forecast