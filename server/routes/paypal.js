var express = require('express');
var PayPal = require('./paypal/index');
var router = express.Router();

router.post("/add", function(req, res, next) {
    if (req.user) {
    console.log('onCheckPayPalsWithdrawals');
      PayPal.onCheckPayPalsWithdrawals(req.user.steamId,req.body.email,req.body.game,req.body.amount,res);
    } else {
      res.send({ result: false });
    }
  });

  module.exports = router;