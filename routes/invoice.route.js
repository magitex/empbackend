const { response } = require('express')
const express =require('express')
const router = express.Router()
const invoiceTemplateCopy = require('../models/InvoiceModels')

router.get('/',(req,res)=>{
    invoiceTemplateCopy.find()
    .then(invoice => res.json(invoice))
    .catch(error => res.status(400).json('Error:'+error));
})

router.post('/add',(req,res)=>{
    const invoice = new invoiceTemplateCopy(req.body)
    invoice.save()
    .then(data => res.json(data))
    .catch(error => res.status(400).json('Error:'+error))
})
router.get('/:id',(req,res)=>{
    //const invoice = new invoiceTemplateCopy(req.body)
    //invoice.save()
    if(req.params.id=='daily')
    {

        var currentdate="";
        currentdate= new Date();
        console.log(currentdate);
        var prevmonths ="";
        prevmonths = new Date(currentdate.setMonth(0));
       console.log(prevmonths);
       //console.log( prevmonths.toISOString());
       //console.log(currentdate.toISOString());
    //var cur=new Date(currentdate);
    //var prv=new Date(prevmonths);
       invoiceTemplateCopy.aggregate([
            // First Stage
            {
              $match : {
                "invoicedate": { $gte: new Date(new Date().getTime() - 1000 * 86400 * 30) , $lt: new Date()  }
               }
            },
            // Second Stage
            {
              $group : {
                _id : { month: { $month: "$invoicedate" }, day: { $dayOfMonth: "$invoicedate" }, year: { $year: "$invoicedate" } },
                totalSaleAmount: { 
                    "$sum": { "$sum": "$invoiceDetails.totalamount" } 
                }
    
                 
              }
            }
           ])
          
        .then(data => res.json(data))
        .catch(error => res.status(400).json('Error:'+error))
    }
    else if(req.params.id=='quarterly')
    {
        var currentdate="";
        currentdate= new Date();
        console.log(currentdate);
        var prevmonths ="";
        prevmonths = new Date(currentdate.setMonth(0));
       console.log(prevmonths);
       //console.log( prevmonths.toISOString());
       //console.log(currentdate.toISOString());
    //var cur=new Date(currentdate);
    //var prv=new Date(prevmonths);
       invoiceTemplateCopy.aggregate([
            // First Stage
            {
              $match : {
                "invoicedate": { $gte:new Date(), $lt: new Date(new Date().setMonth(new Date().getMonth()+2))  }
               }
            },
            // Second Stage
            {
              $group : {
                _id: {$substr: ['$invoicedate', 5, 2]}, 
                totalSaleAmount: { 
                    "$sum": { "$sum": "$invoiceDetails.totalamount" } 
                }
    
                 
              }
            }
           ])
          
        .then(data => res.json(data))
        .catch(error => res.status(400).json('Error:'+error))
    }
    else
    {
        var currentdate="";
        currentdate= new Date();
        console.log(currentdate);
        var prevmonths ="";
        prevmonths = new Date(currentdate.setMonth(0));
       console.log(prevmonths);
       //console.log( prevmonths.toISOString());
       //console.log(currentdate.toISOString());
    //var cur=new Date(currentdate);
    //var prv=new Date(prevmonths);
       invoiceTemplateCopy.aggregate([
            // First Stage
            {
              $match : {
                "invoicedate": { $gte: new Date(new Date().setMonth(0)), $lt: new Date()  }
               }
            },
            // Second Stage
            {
              $group : {
                _id: {$substr: ['$invoicedate', 5, 2]}, 
                totalSaleAmount: { 
                    "$sum": { "$sum": "$invoiceDetails.totalamount" } 
                }
    
                 
              }
            }
           ])
          
        .then(data => res.json(data))
        .catch(error => res.status(400).json('Error:'+error))
    }
  
 
})
router.get('/:id',(req,res)=>{
    invoiceTemplateCopy.findById(req.params.id)
    .then(inv => res.json(inv))
    .catch(error => res.status(400).json('Error:'+error));
})

router.delete('/:id',(req,res)=>{
    invoiceTemplateCopy.findByIdAndDelete(req.params.id)
    .then(() => res.json('invoice details deleted.'))
    .catch(error => res.status(400).json('Error:'+error));
})

router.post('/update/:id',(req,res)=>{
    invoiceTemplateCopy.findByIdAndUpdate(req.params.id,{
        $set:req.body
    },
    (err)=> {if(err) return res.status(400).json({success:false,err})
    return res.status(200).json({success:true});
});
    
})



module.exports = router