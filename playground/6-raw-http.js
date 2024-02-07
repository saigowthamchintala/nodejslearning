const https = require('http')
const url = 'http://api.weatherstack.com/current?access_key=632b891526368d69d6db006bc7a5c851&query=45,-75&units=f'

const request = https.request(url,(response)=>{
    let data = ''
    response.on('data',(chunk)=>{
        data = data + chunk.toString()
    })
    response.on('end',()=>{
        console.log(JSON.parse(data))
    })
})
request.on('error',(error)=>{
    console.log('An error',error)
})
request.end()