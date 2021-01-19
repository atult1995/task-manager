require('../src/db/mongoose')
const User=require('../src/models/user')

// User.findByIdAndUpdate('5ffa99b1df1d6e3ba8d8bb55',{age:1}).then((user)=>{
//     console.log(user)
//     return User.countDocuments({age:1})
// }).then((count)=>{
//     console.log(count)
// }).catch((e)=>{
//     console.log(e)
// })

const updateAgeAndCountDocs=async(id,age)=>{
    const user=await User.findByIdAndUpdate(id,{age})
    const count=await User.countDocuments({age})
    return count
}
updateAgeAndCountDocs('5ffa99b1df1d6e3ba8d8bb55',25).then((count)=>{ console.log(count)}).catch((e)=>{ console.log(e) })