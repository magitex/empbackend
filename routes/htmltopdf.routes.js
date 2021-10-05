const { response } = require('express')
const express =require('express')
let app = express();
let ejs = require("ejs");
let pdf = require("html-pdf");
let path = require("path");
const aws = require('aws-sdk')
const { ToWords } = require('to-words');
const toWords = new ToWords();
const invoiceTemplateCopy = require('../models/InvoiceModels')
const customerTemplateCopy = require('../models/CustomerModels')


const router = express.Router()
const updatepdf =({params},res) => {
 //console.log(params);
//console.log(params.invoiceurl);
//console.log(params._id);

  invoiceTemplateCopy.findOneAndUpdate({ _id: params._id },{
      $set:{ invoiceurl: params.invoiceurl },
  },{new: true,useFindAndModify: false},
  function(err, result) {
    if (err) {
      console.log(err);

    } else {
      //console.log('updateddata',result);
    }
  }
//   (err)=> {if(err) return res.status(400).json({success:false,err})
//   return res.status(200).json({success:true});
// }
); 
  
}


 const generateReportWeb = (req, res, next) => {
  
  //var results =await customerTemplateCopy.find( {_id: req.body.companyname});
  //console.log('results',results);
  
  var totalcgst=0;
  var gstpercent=0;

  var totalsgst=0;
  var sgstpercent=0;
  var grtotal=0;

  var total=req.body.invoiceDetails.map(item => eval(item.totalamount)).reduce((prev, next) => prev + next);
  if(req.body.compdtls.country=='India')
  {
if(req.body.compdtls.state=='Telangana')
{
  gstpercent=9;
  sgstpercent=9;

  totalcgst=total*(gstpercent/100);
  totalsgst=total*(sgstpercent/100);
}
else
{
  gstpercent=18;
  totalcgst=total*(gstpercent/100);
  
}
  }
  grtotal=total+totalcgst+totalsgst;
  let words = toWords.convert(grtotal);
  console.log('total',total);

    var invoiceId=req.body.id;
    console.log('INVID',invoiceId);
    console.log(req.body);

    var invoiceURL="";
    ejs.renderFile(path.join(__dirname, "/invoice.ejs"), {
     invDetails: req.body,
     totalcgst: totalcgst,
     totalsgst: totalsgst,
     gstpercent: gstpercent,
     sgstpercent: sgstpercent,
     grtotal:grtotal.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'),
     words:words,

    }, (err, data) => {
      if (err) {
        res.send("Error in report template "+err);
      } else {
        let options = {
          "height": "25in",
          "width": "14.5in",
          "header": {
            "height": "20mm",
          },
          "footer": {
            "height": "20mm",
          },
  
        };
        pdf.create(data, options).toBuffer(function (err, data) {
          if (err) {
            res.send(err);
          } else {
            //console.log('This is a buffer:', data);
  
            aws.config.setPromisesDependency();
            aws.config.update({
              "accessKeyId": 'AKIAXVRNIZQF37FR3FHZ',
              "secretAccessKey": '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',
            });
  
            const s3 = new aws.S3();
            var timeInMss = Date.now();
            //console.log("here "+invoiceId)
  
            var params = {
              ACL: 'public-read',
              Bucket: "customerinvoice",
              Key: `invoice_`+invoiceId,
              Body: data,
              ContentEncoding: "buffer",
              ContentType: "application/pdf"
            };
  
            s3.upload(params, function(err, data) {
  
              if (err) {
                console.log(err);
                console.log("Error uploading data: ", data);
              } else {
                invURL=data.Location;
                console.log("url "+invURL)
                console.log('Data: ',data)
                console.log("data: ", data.Location)
                console.log("succesfully uploaded pdf!")
                params = {"_id":req.body.id, "invoiceurl":data.Location}
  
                updatepdf({params})
              }
  
            });
            var  x= "https://customerinvoice.s3.ap-southeast-1.amazonaws.com/invoice_"+invoiceId;
            res.status(200).json({invoiceURL:x})
          }
        }); //pdf create
      }//else
    });
  }

router.post('/generateReportWeb',
generateReportWeb)


module.exports = router