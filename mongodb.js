// const mongodb=require('mongodb')
// const MongoClient=mongodb.MongoClient

// const ObjectID=mongodb.ObjectID

const {MongoClient,ObjectID}=require('mongodb')

const connectionURL='mongodb://127.0.0.1:27017'

const databaseName='task-manager'

const id=new ObjectID()
console.log(id)

MongoClient.connect(connectionURL,{useNewUrlParser:true},(error,client)=>{
    if(error){
        return console.log("Unable to connect database")
    }
    
    const db=client.db(databaseName)

    // db.collection('users').insertOne({
    //     name:"Atul",
    //     age:27
    // },(error,result)=>{
    //     if(error){
    //         return console.log(error)
    //     }
    //     console.log(result.ops)
    // })

    // db.collection('users').insertMany([
    //     {
    //         name:"Bablu",
    //         age:50
    //     },{
    //         name:"Neelu",
    //         age:49
    //     }

    // ],(error,result)=>{
    //     if(error){
    //         return console.log(error)
    //     }
    //     console.log(result.ops)
    // })

    // db.collection('tasks').insertMany([
    //     {
    //         description:"first",
    //         completed:true
    //     },
    //     {
    //         description:"second",
    //         completed:false
    //     },
    //     {
    //         description:"third",
    //         completed:false
    //     }

    // ],(error,result)=>{
    //     if(error){
    //         return console.log(error)
    //     }
    //     console.log(result.ops)
    // })

    // db.collection('users').findOne({name:'Atul'},(error,user)=>{
    //     if(error){
    //         return console.log(error)
    //     }
    //     console.log(user)
    // })
    // db.collection('users').findOne({name:'Atul',age:1},(error,user)=>{
    //     if(error){
    //         return console.log(error)
    //     }
    //     console.log(user)
    // })//(  it will give null)
    // db.collection('users').findOne({_id:new ObjectID("5ff93c3fa4e7b52c4cd4afae")},(error,user)=>{
    //     if(error){
    //         return console.log(error)
    //     }
    //     console.log(user)
    // })

    // db.collection("users").find({age:27}).toArray((error,user)=>{
    //     if(error){
    //         console.log(error)
    //     }

    //     console.log(user)

    // })
    // db.collection("users").find({age:27}).count((error,count)=>{
    //     if(error){
    //         console.log(error)
    //     }

    //     console.log(count)

    // })
    //  db.collection("users").find().toArray((error,user)=>{
    //     if(error){
    //         console.log(error)
    //     }

    //     console.log(user)

    // })

    // db.collection('users').updateOne(
    //     {_id:new ObjectID("5ff93c3fa4e7b52c4cd4afae")
    // },{
    //     $set:{
    //         name:"Brajesh"
    //     }
    // }).then((result)=>{
    //     console.log(result)
    // }).catch((reject)=>{
    //     console.log(reject)
    // })

    // db.collection('users').updateOne(
    //     {_id:new ObjectID("5ff93c3fa4e7b52c4cd4afae")
    // },{
    //     $inc:{
    //         age:1
    //     }
    // }).then((result)=>{
    //     console.log(result.modifiedCount)
    // }).catch((reject)=>{
    //     console.log(reject)
    // })

    // db.collection('tasks').updateMany(
    //     {
    //         completed:false
    // },{
    //     $set:{
    //         completed:true
    //     }
    // }).then((result)=>{
    //     console.log(result.modifiedCount)
    // }).catch((reject)=>{
    //     console.log(reject)
    // })

    // db.collection('users').deleteMany(
    // {
    //     age:27
    // }).then((result)=>{
    //     console.log(result)
    // }).catch((reject)=>{
    //     console.log(reject)
    // })

    db.collection('tasks').deleteOne(
        {
            description:"first"
        }).then((result)=>{
            console.log(result)
        }).catch((reject)=>{
            console.log(reject)
        })


})