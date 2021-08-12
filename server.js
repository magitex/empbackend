const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const routesUrls = require('./routes/routes')
const employeeUrls = require('./routes/employee.routes')
const customerUrls = require('./routes/customer.routes')
const projectUrls = require('./routes/project.routes')

const cors = require('cors')

dotenv.config()

mongoose.connect(process.env.DATABASE_ACCESS, {useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (err)
       console.error(err);
    else
       console.log("Connected to the mongodb"); 
  });

app.use(express.json())  
app.use(cors())

app.use('/api',routesUrls)
app.use('/employees',employeeUrls)
app.use('/customers',customerUrls)
app.use('/projects',projectUrls)

app.listen(4000,() =>console.log('server is running...'))