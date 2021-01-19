const express=require('express')
const Task=require("../models/task")
const auth=require("../middleware/auth")
const router=new express.Router()


router.post('/tasks',auth,async(req,res)=>{
    //const task=new Task(req.body)
    const task=new Task({
        ...req.body,
        owner:req.user._id
    })
    try{
        await task.save()
        res.send({task})
    }catch(e){
        res.status(400).send(e);
    }
})

router.get('/tasks/:id',auth,async(req,res)=>{
    const _id=req.params.id
    try{
        const task=await Task.findOne({_id,owner:req.user._id})
        if(!task){
            return res.status(400).send("not found")
        }
        res.send(task)
    }catch(e){
        res.status(400).send(e)
    }


})
// GET/tasks?completed=true ->return only completed=true wala task
//GET/tasks?completed=false ->return only completed=false wala task
//GET/tasks ->return all task


//GET/tasks?limit=2 -> show only first 2 task
//GET/tasks?limit=2&skip=1  ->if we hacve 4 task then it will skip first and show 2nd and 3rd task
//GET/tasks?limit=3&skip=3  ->if we hacve 4 task then it will skip three task and show last task i.2 4th task

//createdAt:1 for asc and createdAt:-1 for desc
router.get('/tasks',auth,async(req,res)=>{
    try{
        match={}
        sort={}
        if(req.query.completed){
            match.completed=req.query.completed==='true'
        }
        if(req.query.sortBy){
            const parts=req.query.sortBy.split(':')
            sort[parts[0]]=parts[1]==='desc'?-1:1
            console.log(parts[0]+"  "+parts[1])
        }
        await req.user.populate({
            path:'tasks',
            match,
            options:{
                limit:parseInt(req.query.limit),
                skip:parseInt(req.query.skip),
                sort
            }
        }).execPopulate()
        res.send(req.user.tasks)
    }catch(e){
        res.status(400).send(e)
    }
})
router.patch('/tasks/:id',auth,async(req,res)=>{
    const updates=Object.keys(req.body)
    const allowedUpdate=["description","completed"]
    const isValidOperation=updates.every((update)=>allowedUpdate.includes(update))
    if(!isValidOperation){
        return res.status(400).send("Invalid updates")
    }
    try{
        const task=await Task.findOne({_id:req.params.id,owner:req.user._id})
        console.log(task)
        if(!task){
            return res.status(400).send("not found")
        }
        updates.forEach((update)=>task[update]=req.body[updates])
        await task.save()
        res.send(task)
    }catch(e){
        res.status(400).send(e)
    }
})

router.delete('/tasks/:id',auth,async(req,res)=>{
    try{
        const task=await Task.findOneAndDelete({_id:req.params.id,owner:req.user._id})
        if(!task){
            return res.status(400).send("not found")
        }
        res.send(task)
    }catch(e){
        res.status(400).send(e)
    }
})



module.exports=router