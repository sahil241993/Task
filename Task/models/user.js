const mongoose=require('mongoose');
const bcrypt=require('bcryptjs');
const config=require('../config/database');

const UserSchema=mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    task:{
        type:[]
    },
});



const User=module.exports=mongoose.model('User',UserSchema);


module.exports.getUserById=(id,callback)=>{
    User.findById(id,callback);
}

module.exports.addTask=(t,id,callback)=>{
    console.log("in model task")
   
    User.update({_id:id},{$push:{
        task:{
            ta:t,
            date:new Date(Date.now())
        }
    }},callback);
    
}
module.exports.getUserByUsername=(username,callback)=>{
    const query={username:username}
    User.findOne(query,callback);
}

module.exports.addUser=(newUser,callback)=>{
    bcrypt.genSalt(10,(err,salt)=>{
        bcrypt.hash(newUser.password,salt,(err,hash)=>{
            if(err)
            throw err;
            newUser.password=hash;
            newUser.save(callback);
        })
    })
}

module.exports.comparePassword=function(candidatePassword,hash,callback){
    
    bcrypt.compare(candidatePassword,hash,(err,isMatch)=>{
        if(err) 
            throw err;
        callback(null,isMatch);
    })
}