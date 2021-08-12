const mongoose = require('mongoose')


const projectTemplate = new mongoose.Schema({ 
    name:{type:String,required:true},
    module:{type:String,required:true},
    estimatedtime:{type:String,required:true},
    status:{type:String},
    date:{type:Date,default:Date.now}
})

module.exports = mongoose.model('Projects',projectTemplate)