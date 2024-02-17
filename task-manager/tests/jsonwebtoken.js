//Testing jsonwebtoken node module
const jwt = require('jsonwebtoken') 
const myFunction = async () => {
  const token = jwt.sign({_id:"saigowtham"},'P@ssw0rd123',{expiresIn:'1 hour'})
  console.log(token)
  const data = jwt.verify(token,"P@ssw0rd123")
  console.log(data)
}
myFunction()