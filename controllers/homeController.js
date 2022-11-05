const {users,posts}=require('../models');
// const jwt=require('jsonwebtoken');
const findAll_posts=async(req,res)=>{
    try {
        const allPosts=await posts.findAll({include:users});
        res.render('index',{allPosts})
        // res.json(allPosts)
    } catch (error) {
        res.status.json(error)
    }
}


module.exports={
    findAll_posts
}