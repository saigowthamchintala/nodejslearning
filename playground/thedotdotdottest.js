const jsonobject = {
    "firstname":"Sai Gowtham",
    "lastname":"Chintala"
}
const newjsonobject = {
    ...jsonobject,//... helps in copying the other object properties
    "mobile":"9999999999"
}
console.log(newjsonobject)