// const pet = {
//     name:'Hal'
// }

// pet.toJSON = function(){
//     console.log(this)
//     return this
// }
// console.log(JSON.stringify(pet))

//Output

//{ name: 'Hal', toJSON: [Function (anonymous)] }
//{"name":"Hal"}

const pet = {
    name:'Hal'
}

pet.toJSON = function(){
    return {}
}
console.log(JSON.stringify(pet))

//Output

//{}

//Note: res.send() implicitly uses JSON.stringify() on the user which has toJSON property