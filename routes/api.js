const router = require("express").Router();
const Transaction = require("../models/transaction.js");

router.post("/api/transaction", ({body}, res) => {
  // console.log("body prints:\n", body);
  // console.log("{body} prints:\n", {body});
  Transaction.create(body)
    .then(dbTransction => {
      //console.log("dbTransaction prints:\n", dbTransaction);
      res.json(dbTransaction);
    })
    .catch(err => {
      res.status(404).json(err);
    });
});

router.post("/api/transaction/bulk", ({body}, res) => {
  Transaction.insertMany(body)
    .then(dbTransaction => {
      res.json(dbTransaction);
    })
    .catch(err => {
      res.status(404).json(err);
    });
});

router.get("/api/transaction", (req, res) => {
  Transaction.find({}).sort({date: -1})
    .then(dbTransaction => {
      res.json(dbTransaction);
    })
    .catch(err => {
      res.status(404).json(err);
    });
});

module.exports = router;