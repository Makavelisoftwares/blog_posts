const Router=require('express').Router();
const controller=require('../controllers/authController');

Router.get('/login',controller.login_Page);
Router.get('/register',controller.register_Page);
Router.post('/register',controller.register_user);
Router.post('/login',controller.login_user);
Router.get('/logout',controller.logout_get);





module.exports=Router;