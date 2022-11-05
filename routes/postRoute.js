const Router=require('express').Router();
const controller=require('../controllers/postController');
const {Protect_Routes,checkUser}=require('../middleware/authmiddleware')

Router.get('/posts',Protect_Routes,controller.createPost_Page);
Router.post('/posts',controller.createPosts_post);
Router.get('/posts/view',controller.view_posts);

module.exports=Router;