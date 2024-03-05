const path = require('path')
const express = require('express')
const exp = require('constants')
const hbs = require('hbs')
const forecast = require('./utilis/forecast')
const geocode = require('./utilis/geocode')

//
//Goal:Create a partial for the footer
//
//1.Setup the template for the footer partial "Created by Some Name"
//2.Render the partial at the bottom of all three pages
//3.Test your work by visiting all three pages

const app = express()

// console.log(__dirname)
// console.log(__filename)
//console.log(path.join(__dirname,'../public'))

//Define paths for Express config
const publicDirectorypath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)




//Setup static directory to serve.
app.use(express.static(publicDirectorypath))

//Using hbs
app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather',
        name:'Gowtham'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:"About Me",
        name:"Gowtham"
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:"You must provide an address"
        })
    }
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({
                error:error
            })
        }
        forecast(latitude,longitude, (error, forecastData) => {
        if(error){
            return res.send({
                error:error
            })
        }
        res.send({
            forecast:forecastData,
            location,
            address:req.query.address
        })
        })
    
    })
})

//
//Goal:Update weather endpoints to accept address
//
//1.No addresss? Send back an error message 
//2.Address ? Send back the static json
//      -Add address property onto JSON which returns the provided address
//3.Test /weather and /weather?address=philadelphia

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products:[]
    })
})

//
//Goal:Create a template for help page
//
//1.Setup a help template to render a help message to the screen
//2.Setup the help route and render the template with an example message
//3.Visit the route in the browser and see your help message print

app.get('/help',(req,res)=>{
    res.render('help',{
        helpText:"This is some helpful text",
        title:"Help",
        name:"Gowtham"
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:"404",
        name:"Gowtham",
        errorMessage:"Help Article Not Found"
    })
})
 
app.get('*',(req,res)=>{
    res.render('404',{
        title:"404",
        name:"Gowtham",
        errorMessage:"Page not found"
    })
})

//
//Goal:Create and render a 404 page with handlers
//
//1.Setup the template to render the header and footer
//2.Setup the template to render an error message in a paragraph
//3.Render the template for both 404 pages
//  -Page not found
//  -Help article not found
//4.Test your work.Visit /what and /help/units



// app.get('',(req,res)=>{
//     res.send('<h1>Hello Express!</h1>')
// })
// app.get('/help',(req,res)=>{
//     res.send({
//         name:"Andrew",
//         age:22
//     })
// })
// //
// //Goal:Update routes
// //
// //1.Setup about route to render a title with HTML
// //2.Setup a weather route to send back JSON
// //  -Object with forecast and location strings
// //3.Test your work by visiting both in browser

// app.get('/about',(req,res)=>{
//     res.send('<h1>About Page</h1>')
// })
// app.get('/weather',(req,res)=>{
//     res.send({
//         forecast:'It is snowing',
//         location:'Philadelphia'
//     })
// })
app.listen(3000,()=>{
    console.log('Server is Up on port 3000!')
})

// //
// //Goal:Setup two new routes
// //
// //1.Setup an about route and render a page title
// //2.Setup a weather route and render a page title
// //3.Test your work by visiting both in the browser

// //app.com
// //app.com/about