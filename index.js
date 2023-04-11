const express=require('express')
const Connection=require('./config/db.connect')
const authRouter = require('./routes/auth.route')
const postRouter = require('./routes/post.route')
const app=express()
require('dotenv').config()


app.use(express.json())
app.use("/auth",authRouter)
app.use("/post",postRouter)



app.listen(process.env.PORT,async()=>{
    try{
        await Connection()
        console.log(`server started in ${process.env.PORT}`)
    }catch(err){
        console.log(err)
    }
})