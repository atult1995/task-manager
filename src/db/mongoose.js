const mongoose=require('mongoose')
const validator=require('validator')
// mongoose.connect('mongodb://127.0.0.1:27017/taske-manager-api',{
//     useNewUrlParser:true,
//     useCreateIndex:true,
//     useFindAndModify:false
// })

mongoose.connect(process.env.MONGODB_URL,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useFindAndModify:false
})



// const Task=mongoose.model('Task',{
//     description:{
//         type:String
//     },
//     completed:{
//         type:Boolean
//     }
// })
// const task=new Task({
//     description:"first",
//     completed:false
// })

// task.save().then(()=>{
//     console.log(task)
// }).catch((e)=>{
//     console.log(e)
// })