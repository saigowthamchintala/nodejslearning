fs = require('fs')
const data_Buffer = fs.readFileSync('1-json.json')
const data = data_Buffer.toString()
const data_JSON = JSON.parse(data)
data_JSON.name="Gowtham"
data_JSON.age = 22
const new_data = JSON.stringify(data_JSON)
console.log(new_data)
fs.writeFileSync('1-json.json',new_data)
//
//Challenge:Work with JSON and the file system
//
//1.Load And Parse JSON Data
//2.Change the name and age property using your info
//3.Stringify the changed object and overwrite the original data
//4.Test your work by viewing data in the JSON file
//


// const book= {
//     title:'Ego is the Enemy',
//     author:'Ryan Holiday'
// }
// const bookJSON = JSON.stringify(book)
// const dataBuffer = fs.readFileSync('1-json.json')
// const data_JSON=dataBuffer.toString()
// const data = JSON.parse(data_JSON)
// console.log(data.title)
// console.log(data.author)
//fs.writeFileSync('1-json.json',bookJSON)
//console.log(bookJSON)
//const parsed_data = JSON.parse(bookJSON)
//console.log(parsed_data.author)
