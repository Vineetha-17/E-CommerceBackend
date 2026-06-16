const { Timestamp } = require('mongodb')
const mongoose=require('mongoose')

let userschema=new mongoose.Schema({
username: {type:String,required:true,unique:true},
password:{type:String,required:true},
email:{type:String,required:true,unique:true},
role:{type:String,required:true,enum:["seller","buyer"]}
},{timestamps:true})

module.exports=mongoose.model('users',userschema)