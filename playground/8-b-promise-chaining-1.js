const add = (a,b) =>{
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve(a+b)
        },2000)
    })
}

// add(1,2).then((sum)=>{
//     console.log(sum)
// }).catch((e)=>{
//     console.log(e)
// })

// add(1,2).then((sum)=>{
//     console.log(sum)
//     add(sum,5).then((sum2)=>{
//         console.log(sum2)
//     }).catch((e)=>{
//         console.log(e)
//     })
// }).catch((e)=>{
//     console.log(e)
// })

//Note : From above we can see that code is more nested and complex and so promise chaining resolves this.

add(1,1).then((sum)=>{
    console.log(sum)
    return add(sum,4)
}).then((sum2)=>{
    console.log(sum2)
}).catch((e)=>{
    console.log(e)
})