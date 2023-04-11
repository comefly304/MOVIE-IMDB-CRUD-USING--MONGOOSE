const bcrypt = require("bcrypt");
const Post = require("../models/Post.model");
const postRouter = require("express").Router();
const jwt = require("jsonwebtoken");


//CREATE POST
postRouter.post("/create", async (req, res) => {
  try {
    const { title, desc, genre,rating,username } = req.body;
    const post = new Post({
      title,
      desc,
      genre,
      rating,
      username
    });
    await post.save();
    return res.json({
      msg: "post created successfully...",
      data: post,
    });
    }catch(err){
        return res.send(err)
    }
});

//GET POST
postRouter.get("/get",async(req,res)=>{
    try{
    const post=await Post.find()
    return res.json({
        data:post
    })
    }catch(err){
        return res.send(err)
    }
})

//GET BY ID
postRouter.get("/get/:id",async(req,res)=>{
    try{
    const post=await Post.findById(req.params.id)
    return res.json({
        msg:"found!",
        data:post
    })
    }catch(err){
        return res.send(err)
    }
})


//UPDATE
postRouter.put("/update/:id",async (req,res)=>{
    try{
        if(req.body.userId===req.params.id){
            try{
             const updateduser= await Post.findByIdAndUpdate(req.params.id,{
                $set:req.body,
              },{
                new:true
              })
              return res.json({
                msg:"updated successfully...!",
                data:updateduser
              })
            }catch(err){
                res.send(err)
            }
        }else{
            return res.json({
                msg:"You can only update ur account"
            })
        }
    }catch(err){
        res.send(err)
    }
})


//DELETE
postRouter.delete("/delete/:id",async (req,res)=>{
    try{
        if(req.body.userId===req.params.id){
            try{
            await Post.findByIdAndDelete(req.params.id)
            return res.json({
                msg:"user deleted successfully...",
            })
            }catch(err){
                return res.send(err)
            }
        }else{
            return res.json({
                msg:"invalid id!"
            })
        }
    }catch(err){
        return res.send(err)
    }

})


module.exports = postRouter;
