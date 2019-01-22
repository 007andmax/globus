var express = require("express");
var router = express.Router();
let Card = require("../models/card").Card;
let DB = require("../db/index");
var path = require("path");
var mime = require("mime");
var fs = require("fs");
let promise = null;

router.get("/download", function(req, res){

  var file = __dirname + "/../public/" + req.query.pathfile;
  var filename = path.basename(file);
  var mimetype = mime.lookup(file);

  res.setHeader("Content-disposition", "attachment; filename=" + filename);
  res.setHeader("Content-type", mimetype);

  var filestream = fs.createReadStream(file);
  filestream.pipe(res);
});
router.get("/getards", function (req, res, next) {
 
 if (req.query.sort !== "income")
 {
  promise = Card.find({}).sort({[req.query.sort]: -1}).exec();
  promise.then((data,error) => {
    if (error)
    {
      console.log("error",error);
    }
    if (data) {
      res.send({ result: true, cards: data })
    }
    else {
      res.send({ result: false });
    }
  });
 }
 else {
  promise = Card.find({}).exec();
  promise.then((data,error) => {
    if (error)
    {
      console.log("error",error);
    }
    if (data) {
      let sortData = data.sort((a, b) => (((a.price - a.buyPrice) * 100) / a.buyPrice < ((b.price - b.buyPrice) * 100) / b.buyPrice && 1) || (((a.price - a.buyPrice) * 100) / a.buyPrice > ((b.price - b.buyPrice) * 100) / b.buyPrice && -1) || 0);
       
      res.send({ result: true, cards: sortData })
    }
    else {
      res.send({ result: false });
    }
  });
 }
   
  
});
router.post("/addphone", function (req, res, next) {
 if (req.body._id)
 {
  DB.addPhone(req.body._id,req.body.phone,res);
 } else {
  res.send({ result: false });
 }
  

});


module.exports = router;
