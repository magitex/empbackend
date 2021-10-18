const { response } = require('express')
const express =require('express')
const router = express.Router()
const offerTemplateCopy = require('../models/OfferletterModels')

router.get('/',(req,res)=>{
    offerTemplateCopy.find()
    .then(invoice => res.json(invoice))
    .catch(error => res.status(400).json('Error:'+error));
})

router.post('/add',(req,res)=>{
    const offer = new offerTemplateCopy(req.body)
    offer.save()
    .then(data => res.json(data))
    .catch(error => res.status(400).json('Error:'+error))
})

router.get('/:id',(req,res)=>{
    offerTemplateCopy.findById(req.params.id)
    .then(inv => res.json(inv))
    .catch(error => res.status(400).json('Error:'+error));
})

router.delete('/:id',(req,res)=>{
    offerTemplateCopy.findByIdAndDelete(req.params.id)
    .then(() => res.json('invoice details deleted.'))
    .catch(error => res.status(400).json('Error:'+error));
})

router.post('/update/:id',(req,res)=>{
    offerTemplateCopy.findByIdAndUpdate(req.params.id,{
        $set:req.body
    },
    (err)=> {if(err) return res.status(400).json({success:false,err})
    return res.status(200).json({success:true});
});
    
})



module.exports = router