const express=require('express')
require('./db/mongoose')
//const User=require('./models/user')
const userRouter=require("./routers/user")
const taskRouter=require("./routers/task")

const app=express()

//const port=process.env.PORT || 3000
const port=process.env.PORT 

// app.use((req,res,next)=>{
//     //console.log(req.method,req.path)
//     //next()
//     if(req.method=="GET"){
//         res.send("GET request are disabled")
//     }else{
//         next()
//     }
// })

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)
// const router=new express.Router()
// router.get('/test',(req,res)=>{
//     res.send("hie")
// })
// app.use(router)

// const bcrypt=require('bcryptjs')
// const myFunction=async()=>{
//     const password="Read123!"
//     const hashedPassword=await bcrypt.hash(password,8)
//     console.log(password)
//     console.log(hashedPassword)

//     const isMatch=await bcrypt.compare('Read123!',hashedPassword)
//     console.log(isMatch)
// }
// myFunction()

// const jwt=require('jsonwebtoken')

// const myFunction=async()=>{
//     const token=jwt.sign({_id:"abcd123"},'thisismynewcourse',{expiresIn:"7 days"}) //2 weeks, 1sec , 
//     console.log("token",token)

//     console.log(jwt.verify(token,'thisismynewcourse'))
// }
// myFunction()

// const pet={
//     name:"Hai"
// }
// pet.toJSON=function(){
//     // console.log(this)
//     // return this
//     return {}
// }
// console.log(JSON.stringify(pet))

const Task=require('./models/task')
const User = require('./models/user')
// const main=async()=>{
//     const task=await Task.findById('60007c21de0fdf3a90c1722d')
//     console.log(task.owner)
//     await task.populate('owner').execPopulate()
//     console.log(task.owner)

//     const user=await User.findById('6000660345dc7e19b0e14456')
//     await user.populate('tasks').execPopulate()
//     console.log(user.tasks)




// }
// main()
const multer=require('multer')
// const upload=multer({
//     dest:'images'
// })
const upload=multer({
    dest:'images',
    limits:{
        fileSize:100000
    },
        fileFilter(req,file,cb){
            //cb(new Error('file must bea pdf),undefine) or cb(undefine,false)
            //cb(undefine,true)
            // if(!file.originalname.endsWith('.pdf')){
                if(!file.originalname.match(/\.(doc|docx|pdf)$/)){
                return cb(new Error('Please upload a pdf file or word file'))
            }

            cb(undefined,true)
            
        }
    
})

// const errorMiddleware=(req,res,next)=>{
//     throw new Error("From middleware side")
// }
app.post('/upload',upload.single('upload'),(req,res)=>{
    res.send()
},(error,req,res,next)=>{
    res.status(400).send({error:error.message})
})



app.listen(port,()=>{
    console.log("Server is at port "+port)
})

