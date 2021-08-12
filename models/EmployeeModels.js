const mongoose = require('mongoose')


const employeeTemplate = new mongoose.Schema({
    firstname:{type:String,required:true},
    lastname:{type:String,required:true},
    address1:{type:String,required:true},
    address2:{type:String,required:true},
    city:{type:String,required:true},
    state:{type:String,required:true},
    country:{type:String,required:true},
    zipcode:{type:Number,required:true},
    email:{type:String,required:true}, 
    phone:{type:Number,required:true},
    gst:{type:String,required:true},   
    date:{type:Date,default:Date.now}
})

module.exports = mongoose.model('Employees',employeeTemplate)