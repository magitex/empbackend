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
    const employee = new employeeTemplateCopy({
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        address1:req.body.address1,
        address2:req.body.address2,
        city:req.body.city,
        state:req.body.state,
        country:req.body.country,
        zipcode:req.body.zipcode,
        email:req.body.email, 
        phone:req.body.phone,
        gst:req.body.gst        
    })
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
    employeeTemplateCopy.findById(req.params.id)
    .then(emp =>{
        emp.firstname=req.body.firstname;
        emp.lastname=req.body.lastname;
        emp.address1=req.body.address1;
        emp.address2=req.body.address2;
        emp.city=req.body.city;
        emp.state=req.body.state;
        emp.country=req.body.country;
        emp.zipcode=req.body.zipcode;
        emp.email=req.body.email;
        emp.phone=req.body.phone;
        emp.gst=req.body.gst;
        
        emp.save()
        .then(() => res.json('Employee detail updated.'))
        .catch(error => res.status(400).json('Error:'+error))
    })
    .catch(error => res.status(400).json('Error:'+error))
})



module.exports = router