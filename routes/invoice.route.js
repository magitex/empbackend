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