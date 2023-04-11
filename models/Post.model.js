const mongoose=require('mongoose')


const postSchema=new mongoose.Schema({
    title:{type:String,require:true},
    desc:{type:String,require:true},
    genre:{type:String,true:true},
    rating:{type:String,require:true},
    username:{type:String,require:true}
    
},{
    timestamps:true
})

const Post=mongoose.model("Post",postSchema)

module.exports=Post