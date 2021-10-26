const mongoose = require('mongoose')


const offerTemplateCopy = new mongoose.Schema({
    employeename:{type:String,required:true},
    offerurl:{type:String,required:false},
    salary:{type:Number,required:true},
     joiningDate:{type:Date,default:Date.now}
})

module.exports = mongoose.model('Offer',offerTemplateCopy)