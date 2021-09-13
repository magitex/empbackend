const aws = require('aws-sdk')
const dotenv = require('dotenv')
const multerS3 = require( 'multer-s3' );
const multer = require('multer');
const uuid = require('uuid');
const path = require( 'path' );
const express = require('express')

const router = express.Router();
dotenv.config()

var s3 = new aws.S3({
    accessKeyId:process.env.AWS_ID,
    secretAccessKey:process.env.AWS_SECRET
})

const storage = multer.memoryStorage({
    destination:function(req,file,callback){
        callback(null,'')
    }
})

multer({
    storage:multerS3({
        s3:s3,
        bucket:process.env.AWS_BUCKET_NAME
    })
})

 const upload = multer({storage}).single('myImag')

router.post('/upload',upload,(req,res)=>{

    //let myFile = req.params.file.originalname
    //const fileType = myFile[myFile.length - 1]
    const s3FileURL = process.env.AWS_Uploaded_File_URL_LINK;

    //console.log(req.file)
   
     const params = {
        Bucket:process.env.AWS_BUCKET_NAME,
         Key:req.file.originalname,
         Body:req.file.buffer
     }

     s3.upload(params,(error,data)=>{
         if(error){
        // res.status(500).send(error)
         }
         else
         {
           var fileLink=s3FileURL + req.file.originalname;
            res.status(200).send(fileLink);  
         }
        // res.status(200).send(data)
     })
})



module.exports = router;