const mongoose = require('mongoose')


const invoiceTemplateCopy = new mongoose.Schema({
    companyname:{type:String,required:true},
    invoiceurl:{type:String,required:false},
    description:{type:String,required:true},
    totalhours:{type:Number,required:true},
    hourlyrate:{type:Number,required:true},
    fixedrate:{type:Number,required:true},
    invoicenumber:{type:Number,required:true},
    ponumber:{type:Number,required:true},
    invoicedate:{type:Date,default:Date.now},
    podate:{type:Date,default:Date.now}
})

module.exports = mongoose.model('Invoice',invoiceTemplateCopy)