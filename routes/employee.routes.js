const { response } = require('express')
const express =require('express')
const router = express.Router()
const employeeTemplateCopy = require('../models/EmployeeModels')

router.get('/',(req,res)=>{
    employeeTemplateCopy.find()
    .then(employees => res.json(employees))
    .catch(error => res.status(400).json('Error:'+error));
})

router.post('/add',(req,res)=>{
    const employee = new employeeTemplateCopy(req.body)
    employee.save()
    .then(data => res.json(data))
    .catch(error => res.status(400).json('Error:'+error))
})

router.get('/:id',(req,res)=>{
    employeeTemplateCopy.findById(req.params.id)
    .then(emp => res.json(emp))
    .catch(error => res.status(400).json('Error:'+error));
})

router.delete('/:id',(req,res)=>{
    employeeTemplateCopy.findByIdAndDelete(req.params.id)
    .then(() => res.json('employee details deleted.'))
    .catch(error => res.status(400).json('Error:'+error));
})

router.post('/update/:id',(req,res)=>{
    employeeTemplateCopy.findByIdAndUpdate(req.params.id,{
        $set:req.body
    },
    (err)=> {if(err) return res.status(400).json({success:false,err})
    return res.status(200).json({success:true});
});
    
})



module.exports = router