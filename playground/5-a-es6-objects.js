//Object property shorthand

const name = 'Andrew'
const userAge = 27

const user = {
    //name:name,
    name,//Shorthand Property
    age:userAge,
    location:'Philadelphia'
}
console.log(user)

//Object Destructuring

const product = {
    label:'Red notebook',
    price:3,
    stock:201,
    salePrice:undefined,
    rating:4.2
}

//const label = product.label
//const stock = product.stock

// const {label:productLabel,price,rating=5} =product
// //console.log(label)
// console.log(productLabel)
// console.log(price)
// console.log(rating)

// const transaction =(type,myProduct)=>{
//     const {} =myProduct
// }

const transaction =(type,{label,stock=0}={})=>{
    console.log(type,label,stock)
}
transaction('order',product)
transaction('order')