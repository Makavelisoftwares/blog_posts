const jwt=require('jsonwebtoken');
const {users,posts}=require('../models')


const Protect_Routes=(req,res,next)=>{
    token=req.cookies.auth;
    if(token){
        jwt.verify(token,'secret',(err,decodedToken)=>{
            if(err){
                res.redirect('/login')
                next()
            }else{
                console.log(decodedToken)
                next();
            }
        })
    }else{
        res.redirect('/login');
        next()
    }
    next()
}


const checkUser=(req,res,next)=>{
    const token=req.cookies.auth;
    if(token){
        jwt.verify(token,'secret',async(err,decodedToken)=>{
            if(err){
                console.log(err);
                next()
            }else{
                const user=await users.findOne({where:{id:decodedToken.id},include:posts});
                if(user){
                    res.locals.users=user
                    next()
                }
            }
        })
        next()
    }
    next()
}

module.exports={
    Protect_Routes,
    checkUser
}