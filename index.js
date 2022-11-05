const express=require('express');
const app=express();
const helmet=require('helmet');
const morgan=require('morgan');
const bodyParser=require('body-parser');
require('dotenv').config();
const methodOverride=require('method-override');
const {sequelize}=require('./models')
const cookieParser=require('cookie-parser');
const port=5000;
const homeRoute=require('./routes/homeRoute');
const authRoute=require('./routes/authRoute');
const postRoute=require('./routes/postRoute');

// connecting mongodb database 
sequelize.authenticate()
    .then(()=>{
        console.log('connected to the practise database');
        app.listen(port,()=>{
            console.log('listening to requests on port http://localhost:'+port)
        })
    })
    .catch((err)=>console.log(err))

// setting the view template and enabling the static files
app.set('view engine','ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static('public'));
app.use(morgan('common'));
app.use(helmet());
app.use(methodOverride('_method'));
app.use(cookieParser());



// using routes  
app.use(homeRoute);
app.use(authRoute);
app.use(postRoute);