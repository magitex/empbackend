const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const routesUrls = require('./routes/routes')
const profileUrls = require('./routes/profile.route')
const invoiceUrls = require('./routes/invoice.route')
const offerletterUrls = require('./routes/offerletterpdf')
const pdfUrls = require('./routes/htmltopdf.routes')
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
app.use('/profile',profileUrls)
app.use('/employees',employeeUrls)
app.use('/invoice',invoiceUrls)
app.use('/offerletter',offerletterUrls)
app.use('/pdf',pdfUrls)
app.use('/customers',customerUrls)
app.use('/projects',projectUrls)

app.listen(5000,() =>console.log('server is running...'))