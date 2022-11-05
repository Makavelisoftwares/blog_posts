const Router=require('express').Router();
const controller=require('../controllers/homeController');

Router.get('/',controller.findAll_posts);



module.exports=Router;