const {users,posts}=require('../models')
const jwt=require('jsonwebtoken');


const createPost_Page=async(req,res,next)=>{
    res.render('postpage');
    
}

const view_posts=async(req,res,next)=>{
    try {
        const token=req.cookies.auth;
        if(token){
            jwt.verify(token,'secret',async(err,decodedToken)=>{
                if(err){
                   res.redirect('/login')
                   next()
                }else{
                    const post=await posts.findAll({where:{userid:decodedToken.id},include:users});
                    res.render('posts',{post})
                    // res.status(200).json(post)
                    next()
                }
            })
        }
        
    } catch (error) {
        res.status(400).json(error)
    }

}

const createPosts_post=async(req,res,next)=>{
    const {title,body}=req.body;
    try {
        const token=req.cookies.auth;
        if(token){
            jwt.verify(token,'secret',async(err,decodedToken)=>{
                if(err){
                    res.redirect('/login');
                    next()
                }else{
                    const post=await posts.create({title,body,userid:decodedToken.id});
                    res.redirect('/');
                    // res.status(200).json(post);
                    next()
                }
            })
        }else{
            res.redirect('/login')
            next()
        }
        
    } catch (error) {
        res.status(404).json(error)
    }
}


module.exports={
    createPost_Page,
    createPosts_post,
    view_posts
}