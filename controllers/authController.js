const {users,posts}=require('../models')
const bcrypt=require('bcrypt');
const jwt = require('jsonwebtoken');

const createToken=(id)=>{
    return jwt.sign({id},'secret')
}

const register_Page=(req,res)=>{
    res.render('register')
}


const register_user=async(req,res)=>{
    const {username,password}=req.body;
    try {
        const hashPassword=await bcrypt.hash(password,10);
        const user=await users.create({username,password:hashPassword})
        // res.status(200).json(user)

        res.redirect('/login')
    } catch (error) {
        res.status(404).json(error)
    }
}

const login_user=async(req,res,next)=>{
    const {username,password}=req.body;
    try {
        const user=await users.findOne({where:{username}});
        if(user){
            const validatePassword=await bcrypt.compare(password,user.password);
            if(validatePassword){
                const token=createToken(user.id);
                res.cookie('auth',token);
                next();

                res.redirect('/posts');
            }else{
                res.status(404).json('password not matching')
            }
        }else{
            res.status(404).json('no such user')
        }
    } catch (error) {
        res.status(404).json(error)
    }

}

const logout_get=(req,res)=>{
    res.cookie('auth','',{maxAge:1});
    res.redirect('/');
}

const login_Page=(req,res)=>{
    res.render('login')
}


module.exports={
    register_Page,
    login_Page,
    logout_get,
    register_user,
    login_user
}