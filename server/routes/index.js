var express = require('express');
var router = express.Router();
let User = require('../models/user').User;
let promise = null;

/* GET home page. */
/*router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});*/

router.get('/getdatauser', function (req, res, next) {
  if (req.user && req.user.ban === false) {
    promise = User.findOne({ steam: req.user.steamId }).exec();
    promise.then((data) => {
      if (data) {
        data.photo = req.user.photo;
        res.send({ result: true, user: data })
      }
      else {
        res.send({ result: false });
      }
    });
  } else {
    res.send({ result: false });
  }
});

module.exports = router;
