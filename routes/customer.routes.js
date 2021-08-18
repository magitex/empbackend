const { response } = require('express')
const express =require('express')
const router = express.Router()
const customerTemplateCopy = require('../models/CustomerModels')

router.get('/',(req,res)=>{
    customerTemplateCopy.find()
    .then(customers => res.json(customers))
    .catch(error => res.status(400).json('Error:'+error));
})

router.post('/add',(req,res)=>{
    const customer = new customerTemplateCopy(req.body);
    customer.save()
    .then(data => res.json(data))
    .catch(error => res.status(400).json('Error:'+error))
})

router.get('/:id',(req,res)=>{
    customerTemplateCopy.findById(req.params.id)
    .then(cus => res.json(cus))
    .catch(error => res.status(400).json('Error:'+error));
})

router.delete('/:id',(req,res)=>{
    customerTemplateCopy.findByIdAndDelete(req.params.id)
    .then(() => res.json('customer details deleted.'))
    .catch(error => res.status(400).json('Error:'+error));
})

router.post('/update/:id',(req,res)=>{
    customerTemplateCopy.findById(req.params.id)
    .then(cus =>{
        cus.firstname=req.body.firstname;
        cus.lastname=req.body.lastname;
        cus.address1=req.body.address1;
        cus.address2=req.body.address2;
        cus.city=req.body.city;
        cus.state=req.body.state;
        cus.country=req.body.country;
        cus.zipcode=req.body.zipcode;
        cus.email=req.body.email;
        cus.phone=req.body.phone;
        cus.gst=req.body.gst;
        
        cus.save()
        .then(() => res.json('Customer detail updated.'))
        .catch(error => res.status(400).json('Error:'+error))
    })
    .catch(error => res.status(400).json('Error:'+error))
})



module.exports = router