const geocode = require('./utilis/geocode')
const forecast = require('./utilis/forecast')

//
//Goal:Use both destructuring and property shorthand in weather app
//
//1.Use destructuring in app.js,forecast.js and geocode.js
//2.Use property shorthand in forecast.js and geocode.js
//3.Test your work and ensure app still works
//

const address = process.argv[2]

if(!address){
    console.log('Please provide an Address')
}
else{
    geocode(address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return console.log(error)
        }
        forecast(latitude,longitude, (error, forecastData) => {
            if(error){
                return console.log(error)
            }
            console.log(location)
            console.log(forecastData)
          })
    
    })
}

// const address = process.argv[2]

// if(!address){
//     console.log('Please provide an Address')
// }
// else{
//     geocode(address,(error,data)=>{
//         if(error){
//             return console.log(error)
//         }
//         forecast(data.latitude,data.longitude, (error, forecastData) => {
//             if(error){
//                 return console.log(error)
//             }
//             console.log(data.location)
//             console.log(forecastData)
//           })
    
//     })
// }

// const url ='http://api.weatherstack.com/current?access_key=632b891526368d69d6db006bc7a5c851&query=37.8267,-122.4233&units=s'

// request({url:url,json:true},(error,response)=>{
//     //console.log(response)
//     // const data = JSON.parse(response.body)
//     // console.log(data.current)
//     //console.log(response.body.current)
//     if(error){
//         console.log('Unable to connect to weather service')
//     }
//     else if(response.body.error){
//         console.log('Unable to find location')
//     }
//     else{
//         console.log(response.body.current.weather_descriptions[0]+". It is currently "+response.body.current.temperature+" degrees.It feels like "+response.body.current.feelslike+" degrees out.")
//     }
// }) 


//
// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)





//Geocoding
//Address -> Lat/Long -> Weather

//
//Goal:Print the lat/long for Los Angeles
//
//1.Fire off anew request to the URL explored in the browser
//2.Have the request module parse it as JSON
//3.Print both the latitude and longitude to the terminal
//4.Test your work!

//
//Goal:Handle errors for geocoding request
//
//1.Setup an error handler for low-level errors
//2.Test by disabling network request and running the app
//3.Setup error handling for no matching results
//4.Test by altering the search term and running the app.

// const geoCodeURL ="https://api.mapbox.com/geocoding/v5/mapbox.places/philadelphia.json?access_token=pk.eyJ1Ijoic2FpZ293dGhhbWNoaW50YWxhIiwiYSI6ImNsZXpkZXVyNjA4NjQzdHFnc2k2ZnM5MmYifQ.stP360LcwDgRXTUhjHZX-w&limit=1";
// request({url:geoCodeURL,json:true},(error,response)=>{
//     if(error){
//         console.log('Unable to Connect to GeoCoding Service')
//     }
//     else if(response.body.features.length === 0){
//         console.log("Unable to find location.Try Another Location")
//     }
//     else{
//         const latitude = response.body.features[0].center[1]
//         const longitude = response.body.features[0].center[0]
//         console.log(latitude,longitude)
//     }
// })

//
//Goal:Print a small forecast to the user
//
//1.Print:"It is currently 9 degrees out.It feels like 5 degrees out."
//2.Test your work!
//

// console.log('Starting')

// setTimeout(()=>{
//     console.log('2 Second Timer')
// },2000)

// setTimeout(()=>{
//     console.log('0 Second Timer')
// },0)

// console.log('Stopping')


