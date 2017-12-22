const express=require('express');
const path=require('path');
const bodyParser=require('body-parser');
const cors=require('cors');
const passport=require('passport');
const mongoose=require('mongoose');
const users=require('./Route/user');
const fs=require('fs')
const config=require('./config/database');

mongoose.connect(config.database);


mongoose.connection.on('connected',()=>{
    console.log('connected to database'+config.database)
})

mongoose.connection.on('error',(err)=>{
    console.log("Error occured",err)
})

const app=express();

const port=process.env.PORT || 8080;

app.use(cors());

app.use(bodyParser.json());

//passport middelware

app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

app.use('/users',users)
 
app.use(express.static(path.join(__dirname,'public')))

app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,'public/index.html'));
})

app.listen(port,() =>{
    console.log('Server started on port' + port);
})