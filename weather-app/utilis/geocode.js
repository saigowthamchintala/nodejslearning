const request= require('request')
const geocode = (address,callback)=>{
    //const geoCodeURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ address+'.json?access_token=pk.eyJ1Ijoic2FpZ293dGhhbWNoaW50YWxhIiwiYSI6ImNsZXpkZXVyNjA4NjQzdHFnc2k2ZnM5MmYifQ.stP360LcwDgRXTUhjHZX-w&limit=1'
    const geoCodeURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address)+'.json?access_token=pk.eyJ1Ijoic2FpZ293dGhhbWNoaW50YWxhIiwiYSI6ImNsZXpkZXVyNjA4NjQzdHFnc2k2ZnM5MmYifQ.stP360LcwDgRXTUhjHZX-w&limit=1'

    request({url:geoCodeURL,json:true},(error,response)=>{
        if(error){
            callback('Unable to Connect to GeoCoding Service',undefined)
        }
        else if(response.body.features.length === 0){
            callback('Unable to search location.Try Another search',undefined)
        }
        else{
            callback(undefined,{
                latitude:response.body.features[0].center[1],
                longitude:response.body.features[0].center[0],
                location:response.body.features[0].place_name
            })
        }

    })
}

module.exports = geocode