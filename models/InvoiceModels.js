const mongoose = require('mongoose')


const invoiceTemplateCopy = new mongoose.Schema({
    companyname:{type:String,required:true},
    invoiceDetails:[{
        description:{type:String,required:false},
        totalhours:{type:Number,required:true},
        hourlyrate:{type:Number,required:true},
        totalamount:{type:Number,required:true},

    }],
    invoiceurl:{type:String,required:false},
    invoicenumber:{type:Number,required:true},
    ponumber:{type:Number,required:true},
    invoicedate:{type:Date,default:Date.now},
    podate:{type:Date,default:Date.now}
})

module.exports = mongoose.model('Invoice',invoiceTemplateCopy)