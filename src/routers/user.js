const express=require('express')
const User=require("../models/user")
const auth=require("../middleware/auth")
const multer=require('multer')
const sharp=require('sharp')
const router=new express.Router()


// router.post('/users',(req,res)=>{
//     const user=new User(req.body)
//     user.save().then(()=>{
//         res.send(user)
//     }).catch((e)=>{
//         res.status(400).send(e)
//     })
// })
router.post('/users',async(req,res)=>{
    const user=new User(req.body)
    try{
        await user.save()
        const token=await user.generateAuthToken()
        res.send({user,token})
    }catch(e){
        res.status(400).send(e);
    }
})

// router.get('/users',(req,res)=>{
//         User.find({}).then((users)=>{
//             res.send(users)
//         }).catch((e)=>{
//             res.send(e)
//         });
//     })
router.get('/users',auth,async(req,res)=>{

    try{
        const user =await User.find({})
        res.send(user)
    }catch(e){
        res.status(400).send(e)
    }
})
// router.get('/users/:id',async(req,res)=>{
//    const _id=req.params.id
//     try{
//         const user=await User.findById(_id)
//         if(!user){
//             return res.status(400).send(user)
//         }
//         res.status(201).send(user)
//     }catch(e){
//         res.status(500).send(e)
//     }
// })



// router.patch('/user/:id',async(req,res)=>{
//     try{
//        const user= await User.findByIdAndUpdate(req.params.id,{age:27},{new:true, runValidators:true})
//        res.send(user)
//     }catch(e){
//         console.log(e)
//         res.status(400).send(e)
//     }

// })

// router.patch('/user/:id',async(req,res)=>{
//     const updates=Object.keys(req.body)
//     const allowedUpdate=["name","age","email","password"]
//     const isValidOperation=updates.every((update)=>allowedUpdate.includes(update))
//     if(!isValidOperation){
//         return res.status(400).send("Invalid updates")
//     }
//     try{
//       // const user= await User.findByIdAndUpdate(req.params.id,req.body,{new:true, runValidators:true})
//         const user=await User.findById(req.params.id)

//         updates.forEach((update)=>user[update]=req.body[update])
//         await user.save()

//        if(!user){
//         return res.status(401).send("User not found")
//        }
//        res.send(user)
//     }catch(e){
//         console.log(e)
//         res.status(400).send(e)
//     }

// })

// router.delete('/user/:id',async(req,res)=>{
//     try{
//         const user=await User.findByIdAndDelete(req.params.id)
//         if(!user){
//             return res.status(500).send("User not found")
//         }
//         res.send(user)
//     }catch(e){
//         console.log("error:",e)
//         res.status(400).send()
//     }
// })

router.post("/users/login",async(req,res)=>{
    try{
        const user=await User.findByCredentials(req.body.email,req.body.password)
        const token=await user.generateAuthToken()
        //console.log("token: ",token)
        res.send({user,token})
    }catch(e){
       
            res.status(400).send("Unable to login")
            console.log(e)
        
    }
})
router.get('/users/me',auth,async(req,res)=>{
   res.send(req.user)
})

router.post('/users/logout',auth,async (req,res)=>{
    try{
        req.user.tokens=req.user.tokens.filter((token)=>{
            return token.token!==req.token
        })
        console.log("user",req.user.token)
        await req.user.save()
        res.send("logout")
    }catch(e){
        res.status(400).send(e)
        console.log(e)
    }
})

router.post("/users/logoutAll",auth,async(req,res)=>{
    try{
        req.user.tokens=[]
        await req.user.save()
        res.send("logout from all devices")
    }catch(e){
        res.status(400).send(e)
    }
})

router.delete("/users/me",auth,async(req,res)=>{
    try{
        //const user=await User.findByIdAndDelete(req.user._id)
        // if(!user){

        // }
        await req.user.remove()
        res.send(req.user)
    }catch(e){
        res.status(400).send(e)
    }

})
router.patch('/users/me',auth,async(req,res)=>{
    const updates=Object.keys(req.body)
    const allowedUpdate=["name","age","email","password"]
    const isValidOperation=updates.every((update)=>allowedUpdate.includes(update))
    if(!isValidOperation){
        return res.status(400).send("Invalid updates")
    }
    try{
        updates.forEach((update)=>req.user[update]=req.body[update])
        await req.user.save()
       res.send(req.user)
    }catch(e){
        console.log(e)
        res.status(400).send(e)
    }

})
const upload=multer({
    // dest:'Avatar',
    limits:{
        fileSize:10000000000
    },
    fileFilter(req,file,cb){
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){
            return cb(new Error('Please upload a image'))
        }
        cb(undefined,true)
    }
})
// router.post('/users/me/avatar',upload.single('avatar'),(req,res)=>{
//     res.send()
// },(error,req,res,next)=>{
//     res.status(400).send({error:error.message})
// })

router.post('/users/me/avatar',auth,upload.single('avatar'),async(req,res)=>{
    //req.user.avatar=req.file.buffer
    const buffer=await sharp(req.file.buffer).resize({width:250,height:250}).png().toBuffer()
    req.user.avatar=buffer
    await req.user.save()
    res.send()
},(error,req,res,next)=>{
    res.status(400).send({error:error.message})
})
router.delete('/users/me/avatar',auth,async(req,res)=>{
    req.user.avatar=undefined
    await req.user.save()
    res.send()
})
router.get('/users/:id/avatar',async(req,res)=>{
    try{
        const user=await User.findById(req.params.id)
        if(!user || !user.avatar){
            throw new Error("no")
        }

        res.set('Content-Type','image/jpg')
        res.send(user.avatar)
    }catch(e){
        res.status(400).send(e)
    }
})
module.exports=router