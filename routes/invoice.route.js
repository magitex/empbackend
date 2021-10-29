const { response } = require('express')
const express = require('express')
const router = express.Router()
const invoiceTemplateCopy = require('../models/InvoiceModels')

router.get('/', (req, res) => {
  invoiceTemplateCopy.find()
    .then(invoice => res.json(invoice))
    .catch(error => res.status(400).json('Error:' + error));
})

router.post('/add', (req, res) => {
  const invoice = new invoiceTemplateCopy(req.body)
  invoice.save()
    .then(data => res.json(data))
    .catch(error => res.status(400).json('Error:' + error))
})
router.get('/:id', (req, res) => {
  //const invoice = new invoiceTemplateCopy(req.body)
  //invoice.save()
  //console.log(req.params.id);
  if (req.params.id == 'daily') {

    var currentdate = "";
    currentdate = new Date();
    console.log(currentdate);
    var prevmonths = "";
    prevmonths = new Date(currentdate.setMonth(0));
    console.log(prevmonths);
    //console.log( prevmonths.toISOString());
    //console.log(currentdate.toISOString());
    //var cur=new Date(currentdate);
    //var prv=new Date(prevmonths);
    invoiceTemplateCopy.aggregate([
      // First Stage
      {
        $match: {
          $expr: {
            $and: [
              {
                "$eq": [
                  {
                    "$month": "$invoicedate"
                  },
                  eval(new Date().getUTCMonth()) + 1
                ]
              },
              {
                "$eq": [
                  {
                    "$year": "$invoicedate"
                  },
                  eval(new Date().getUTCFullYear())
                ]
              }
            ]
          }

        }
      },
      // Second Stage
      {
        $group: {
          _id: { month: { $month: "$invoicedate" }, day: { $dayOfMonth: "$invoicedate" }, year: { $year: "$invoicedate" } },
          totalSaleAmount: {
            "$sum": { "$sum": "$invoiceDetails.totalamount" }
          }


        }
      }
    ])

      .then(data => res.json(data))
      .catch(error => res.status(400).json('Error:' + error))
  }
  else if (req.params.id == 'quarterly' || req.params.id == '1') {
    var currentdate = "";
    currentdate = new Date();
    console.log(new Date(new Date().setMonth(5)));
    var prevmonths = "";
    prevmonths = new Date(new Date(new Date().setMonth(2)));
    console.log(prevmonths);
    //console.log( prevmonths.toISOString());
    //console.log(currentdate.toISOString());
    //var cur=new Date(currentdate);
    //var prv=new Date(prevmonths);
    invoiceTemplateCopy.aggregate([
      // First Stage
      {
        $match: {
          "invoicedate": { $gte: new Date(new Date().getUTCFullYear(), 3, 1), $lte: new Date(new Date().getUTCFullYear(), 5, 31) }
        }
      },
      // Second Stage
      {
        $group: {
          _id: { $substr: ['$invoicedate', 5, 2] },
          totalSaleAmount: {
            "$sum": { "$sum": "$invoiceDetails.totalamount" }
          }


        }
      }
    ])

      .then(data => res.json(data))
      .catch(error => res.status(400).json('Error:' + error))
  }
  else if (req.params.id == '2') {
    var currentdate = "";
    currentdate = new Date();
    console.log(new Date(new Date().setMonth(5)));
    var prevmonths = "";
    prevmonths = new Date(new Date(new Date().setMonth(2)));
    console.log(prevmonths);
    //console.log( prevmonths.toISOString());
    //console.log(currentdate.toISOString());
    //var cur=new Date(currentdate);
    //var prv=new Date(prevmonths);
    invoiceTemplateCopy.aggregate([
      // First Stage
      {
        $match: {
          "invoicedate": { $gte: new Date(new Date().getUTCFullYear(), 6, 1), $lte: new Date(new Date().getUTCFullYear(), 8, 31) }
        }
      },
      // Second Stage
      {
        $group: {
          _id: { $substr: ['$invoicedate', 5, 2] },
          totalSaleAmount: {
            "$sum": { "$sum": "$invoiceDetails.totalamount" }
          }


        }
      }
    ])

      .then(data => res.json(data))
      .catch(error => res.status(400).json('Error:' + error))
  }
  else if (req.params.id == '3') {
    var currentdate = "";
    currentdate = new Date();
    console.log(new Date(new Date().setMonth(5)));
    var prevmonths = "";
    prevmonths = new Date(new Date(new Date().setMonth(2)));
    console.log(prevmonths);
    //console.log( prevmonths.toISOString());
    //console.log(currentdate.toISOString());
    //var cur=new Date(currentdate);
    //var prv=new Date(prevmonths);
    invoiceTemplateCopy.aggregate([
      // First Stage
      {
        $match: {
          "invoicedate": { $gte: new Date(new Date().getUTCFullYear(), 9, 1), $lte: new Date(new Date().getUTCFullYear(), 11, 31) }
        }
      },
      // Second Stage
      {
        $group: {
          _id: { $substr: ['$invoicedate', 5, 2] },
          totalSaleAmount: {
            "$sum": { "$sum": "$invoiceDetails.totalamount" }
          }


        }
      }
    ])

      .then(data => res.json(data))
      .catch(error => res.status(400).json('Error:' + error))
  }
  else if (req.params.id == '4') {
    var currentdate = "";
    currentdate = new Date();
    console.log(new Date(new Date().getUTCFullYear(), 0, 1));
    var prevmonths = "";
    prevmonths = new Date(new Date().getUTCFullYear(), 2, 1);
    console.log(prevmonths);
    //console.log( prevmonths.toISOString());
    //console.log(currentdate.toISOString());
    //var cur=new Date(currentdate);
    //var prv=new Date(prevmonths);
    invoiceTemplateCopy.aggregate([
      // First Stage
      {
        $match: {
          "invoicedate": { $gte: new Date(new Date().getUTCFullYear(), 0, 1), $lte: new Date(new Date().getUTCFullYear(), 2, 31) }
        }
      },
      // Second Stage
      {
        $group: {
          _id: { $substr: ['$invoicedate', 5, 2] },
          totalSaleAmount: {
            "$sum": { "$sum": "$invoiceDetails.totalamount" }
          }


        }
      }
    ])

      .then(data => res.json(data))
      .catch(error => res.status(400).json('Error:' + error))
  }
  else {


    console.log(req.params.date);
    var currentdate = "";
    currentdate = new Date();
    console.log(currentdate);
    var prevmonths = "";
    prevmonths = new Date(currentdate.setMonth(0));
    console.log(prevmonths);
    //console.log( prevmonths.toISOString());
    //console.log(currentdate.toISOString());
    //var cur=new Date(currentdate);
    //var prv=new Date(prevmonths);
    invoiceTemplateCopy.aggregate([
      // First Stage
      {
        $match: {
          "invoicedate": { $gte: new Date(new Date().setMonth(0)), $lt: new Date() }
        }
      },
      // Second Stage
      {
        $group: {
          _id: { $substr: ['$invoicedate', 5, 2] },
          totalSaleAmount: {
            "$sum": { "$sum": "$invoiceDetails.totalamount" }
          }


        }
      }
    ])

      .then(data => res.json(data))
      .catch(error => res.status(400).json('Error:' + error))


  }


})
router.get('/:id/:date', (req, res) => {
  //const invoice = new invoiceTemplateCopy(req.body)
  //invoice.save()
  console.log(req.params.id);
  if (req.params.id == 'daily') {
    console.log(req.params.date);

    var currentdate = "";
    currentdate = new Date(req.params.date);
    console.log(currentdate);

    console.log(currentdate.getUTCMonth() + 1);
    console.log(currentdate.getUTCFullYear());
    //console.log( prevmonths.toISOString());
    //console.log(currentdate.toISOString());
    //var cur=new Date(currentdate);
    //var prv=new Date(prevmonths);
    invoiceTemplateCopy.aggregate([
      // First Stage
      {
        $match: {
          $expr: {
            $and: [
              {
                "$eq": [
                  {
                    "$month": "$invoicedate"
                  },
                  eval(new Date(req.params.date).getUTCMonth()) + 1
                ]
              },
              {
                "$eq": [
                  {
                    "$year": "$invoicedate"
                  },
                  eval(new Date(req.params.date).getUTCFullYear())
                ]
              }
            ]
          }

        }
      },
      // Second Stage
      {
        $group: {
          _id: { day: { $dayOfMonth: "$invoicedate" } },
          totalSaleAmount: {
            "$sum": { "$sum": "$invoiceDetails.totalamount" }
          }


        }
      }
    ])

      .then(data => res.json(data))
      .catch(error => res.status(400).json('Error:' + error))
  }
  else if (req.params.id == 'quarterly' || req.params.id == '1') {
    var currentdate = "";
    currentdate = new Date();
    console.log(new Date(req.params.date, 0, 1));
    var prevmonths = "";
    prevmonths = new Date(new Date(new Date().setMonth(2)));
    console.log(prevmonths);
    //console.log( prevmonths.toISOString());
    //console.log(currentdate.toISOString());
    //var cur=new Date(currentdate);
    //var prv=new Date(prevmonths);
    invoiceTemplateCopy.aggregate([
      // First Stage
      {
        $match: {
          "invoicedate": { $gte: new Date(req.params.date, 0, 1), $lte: new Date(req.params.date, 2, 31) }
        }
      },
      // Second Stage
      {
        $group: {
          _id: { $substr: ['$invoicedate', 5, 2] },
          totalSaleAmount: {
            "$sum": { "$sum": "$invoiceDetails.totalamount" }
          }


        }
      }
    ])

      .then(data => res.json(data))
      .catch(error => res.status(400).json('Error:' + error))
  }
  else if (req.params.id == '2') {
    var currentdate = "";
    currentdate = new Date();
    console.log(new Date(new Date().setMonth(5)));
    var prevmonths = "";
    prevmonths = new Date(new Date(new Date().setMonth(2)));
    console.log(prevmonths);
    //console.log( prevmonths.toISOString());
    //console.log(currentdate.toISOString());
    //var cur=new Date(currentdate);
    //var prv=new Date(prevmonths);
    invoiceTemplateCopy.aggregate([
      // First Stage
      {
        $match: {
          "invoicedate": { $gte: new Date(req.params.date, 3, 1), $lte: new Date(req.params.date, 5, 31) }
        }
      },
      // Second Stage
      {
        $group: {
          _id: { $substr: ['$invoicedate', 5, 2] },
          totalSaleAmount: {
            "$sum": { "$sum": "$invoiceDetails.totalamount" }
          }


        }
      }
    ])

      .then(data => res.json(data))
      .catch(error => res.status(400).json('Error:' + error))
  }
  else if (req.params.id == '3') {
    var currentdate = "";
    currentdate = new Date();
    console.log(new Date(new Date().setMonth(5)));
    var prevmonths = "";
    prevmonths = new Date(new Date(new Date().setMonth(2)));
    console.log(prevmonths);
    //console.log( prevmonths.toISOString());
    //console.log(currentdate.toISOString());
    //var cur=new Date(currentdate);
    //var prv=new Date(prevmonths);
    invoiceTemplateCopy.aggregate([
      // First Stage
      {
        $match: {
          "invoicedate": { $gte: new Date(req.params.date, 6, 1), $lte: new Date(req.params.date, 28, 31) }
        }
      },
      // Second Stage
      {
        $group: {
          _id: { $substr: ['$invoicedate', 5, 2] },
          totalSaleAmount: {
            "$sum": { "$sum": "$invoiceDetails.totalamount" }
          }


        }
      }
    ])

      .then(data => res.json(data))
      .catch(error => res.status(400).json('Error:' + error))
  }
  else if (req.params.id == '4') {
    var currentdate = "";
    currentdate = new Date();
    console.log(new Date(new Date().setMonth(5)));
    var prevmonths = "";
    prevmonths = new Date(new Date(new Date().setMonth(2)));
    console.log(prevmonths);
    //console.log( prevmonths.toISOString());
    //console.log(currentdate.toISOString());
    //var cur=new Date(currentdate);
    //var prv=new Date(prevmonths);
    invoiceTemplateCopy.aggregate([
      // First Stage
      {
        $match: {
          "invoicedate": { $gte: new Date(req.params.date, 0, 1), $lte: new Date(req.params.date, 2, 31) }
        }
      },
      // Second Stage
      {
        $group: {
          _id: { $substr: ['$invoicedate', 5, 2] },
          totalSaleAmount: {
            "$sum": { "$sum": "$invoiceDetails.totalamount" }
          }


        }
      }
    ])

      .then(data => res.json(data))
      .catch(error => res.status(400).json('Error:' + error))
  }
  else {
    console.log(req.params.date);
    var start = new Date(req.params.date, 0, 1);
    var end = new Date(req.params.date, 11, 1);
    console.log(start);
    console.log(end);

    invoiceTemplateCopy.aggregate([
      // First Stage
      {
        $match: {
          "invoicedate": { $gte: new Date(req.params.date, 1, 1), $lte: new Date(req.params.date, 11, 31) }
        }
      },
      // Second Stage
      {
        $sort: {
          'invoicedate': 1
        }
      },
      {
        $group: {
          _id: { $substr: ['$invoicedate', 5, 2] },
          totalSaleAmount: {
            "$sum": { "$sum": "$invoiceDetails.totalamount" }
          }


        }
      }
    ])

      .then(data => res.json(data))
      .catch(error => res.status(400).json('Error:' + error))



  }


})
router.get('/:id', (req, res) => {
  invoiceTemplateCopy.findById(req.params.id)
    .then(inv => res.json(inv))
    .catch(error => res.status(400).json('Error:' + error));
})

router.delete('/:id', (req, res) => {
  invoiceTemplateCopy.findByIdAndDelete(req.params.id)
    .then(() => res.json('invoice details deleted.'))
    .catch(error => res.status(400).json('Error:' + error));
})

router.post('/update/:id', (req, res) => {
  invoiceTemplateCopy.findByIdAndUpdate(req.params.id, {
    $set: req.body
  },
    (err) => {
      if (err) return res.status(400).json({ success: false, err })
      return res.status(200).json({ success: true });
    });

})



module.exports = router