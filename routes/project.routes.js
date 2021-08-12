const { response } = require('express')
const express =require('express')
const router = express.Router()
const projectTemplateCopy = require('../models/ProjectModels')

router.get('/',(req,res)=>{
    projectTemplateCopy.find()
    .then(projects => res.json(projects))
    .catch(error => res.status(400).json('Error:'+error));
})

router.post('/add',(req,res)=>{
    const project = new projectTemplateCopy({
        name:req.body.name,
        module:req.body.module,
        estimatedtime:req.body.estimatedtime,
        status:req.body.status   
    })
    project.save()
    .then(data => res.json(data))
    .catch(error => res.status(400).json('Error:'+error))
})

router.get('/:id',(req,res)=>{
    projectTemplateCopy.findById(req.params.id)
    .then(pro => res.json(pro))
    .catch(error => res.status(400).json('Error:'+error));
})

router.delete('/:id',(req,res)=>{
    projectTemplateCopy.findByIdAndDelete(req.params.id)
    .then(() => res.json('Project details deleted.'))
    .catch(error => res.status(400).json('Error:'+error));
})

router.post('/update/:id',(req,res)=>{
    projectTemplateCopy.findById(req.params.id)
    .then(pro =>{
        pro.name=req.body.name;
        pro.module=req.body.module;
        pro.estimatedtime=req.body.estimatedtime;
        pro.status=req.body.status;
        
        pro.save()
        .then(() => res.json('Project detail updated.'))
        .catch(error => res.status(400).json('Error:'+error))
    })
    .catch(error => res.status(400).json('Error:'+error))
})



module.exports = router