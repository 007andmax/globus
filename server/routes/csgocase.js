var express = require('express');
var router = express.Router();
let totp = require('notp').totp;
let https = require('https');
let request = require('request');
let base32 = require('thirty-two');
let DB = require('../csgocase-fb/index');
let TransactionCard = require("../models/transaction-card").TransactionCard;
let TransactionServices = require("./transaction/index");
let CardServices = require("./card/index");
let Card = require("../models/card").Card;
let User = require("../models/user").User;
let transaction = require('../models/transaction').Transaction;
var braintree = require("braintree");
let promise = null;
var gateway = braintree.connect({
    environment: braintree.Environment.Sandbox,
    merchantId: "mzxr5s52k4m5zkkw",
    publicKey: "ntymvshr4d9w3m3p",
    privateKey: "fc9748d8f5898e8227dcfba7353812ad"
});
/*User.findOne({steam: "76561198366380345"},(e,data) => {
if (data)
{
    console.log('data',data);
    data.money = 100;
    data.save();
}
});*/
router.post('/services/chat/sendmessage', (req, res, next) => {
    if (req.user) {
        DB.serviceSendMessageChat(req.body.key, req.user.displayName, req.user.photo, req.body.message, res);
    }
    else {
        res.send({ result: false });
    }
});
router.post('/services/review/sendmessage', (req, res, next) => {
    if (req.user) {
        DB.serviceSendReview(req.body.key, req.user.displayName, req.user.photo, req.body.message, req.body.raiting, res);
    }
    else {
        res.send({ result: false });
    }
});
router.get('/stats', (req, res, next) => {

    DB.getStats(res);

});
router.get('/services/getuserservices', (req, res, next) => {
    if (req.user) {
        DB.getUserServices(req.user.steamId, res);
    }
    else {
        res.send({ result: false });
    }
});
router.get('/chat/get', (req, res, next) => {

    DB.getChat(res);

});
router.get('/services/getall', (req, res, next) => {

    DB.getServicesAll(res);

});
router.get('/services/getmini', (req, res, next) => {

    DB.getServices(res);

});
router.get('/service/get', (req, res, next) => {

    DB.getService(req.query.key, res);

});
router.post('/chat/sendmessage', (req, res, next) => {
    if (req.user && req.user.ban === false) {
        DB.chatSendMessage(req.user.displayName, req.user.photo, req.body.message, res);
    }
    else {
        res.send({ result: false });
    }
});

router.post('/setmoney', (req, res, next) => {
    if (req.user) {
        var saleRequest = {
            amount: req.body.amount,
            paymentMethodNonce: req.body.nonce,
            options: {
                submitForSettlement: true
            }
        };
        gateway.transaction.sale(saleRequest, function (err, result) {
            if (err) {
                res.send({ result: false, err: err });

            } else if (result.success) {
                res.send({ result: true });
                let trans = new transaction({
                    id: String(result.transaction.id),
                    name: 'WebSite CS GO Case',
                    nonce: req.body.nonce,
                    amount: req.body.amount,
                    steam: req.user.steamId,
                    game: 'CSGOCASE',
                    date: new Date()
                });
                trans.save();
                console.log("result.transaction.id", result.transaction.id);
            } else {
                res.send({ result: false, err: result.message });
                console.log("result.message", result.message);
            }
        });
    }else
    {
        res.send({ result: false });
    }
});
router.post('/getlisttrans', (req, res, next) => {
     if (req.user) {

      promise = User.findOne({
        steam: String(req.user.steamId)
      }).populate("cards").populate("transactionsCard").exec();
      promise.then(data => {
        if (data) {

 res.send({ result: true, listTrans: data.transactionsCard, listCards: (data.cards) ? data.cards.cards : [] });

        }
      });
    }else
    {
        res.send({ result: false });
    }
});

router.post("/transaction/get", function(req, res, next) {
 
  if (req.user) {
      promise = TransactionCard.find({
        steam: String(req.user.steamId)
      }).sort({_id:-1}).exec();
      promise.then(data => {
        if (data) {
          res.send({ result: true, list: data });
        } else {
          res.send({ result: false });
        }
      });
    } else {
      res.send({ result: false });
    }
  });

  router.post("/withdrawals/get", function(req, res, next) {
 
    if (req.user) {
        promise = User.findOne({
          steam: String(req.user.steamId)
        }).populate("scrills").populate("paypals").exec();
        promise.then(data => {
          if (data) {
              let scrills =data.scrills.map((item) => {
                  item.type = "Scrill";
                  return item;
              });
              let paypals =data.paypals.map((item) => {
                item.type = "PayPal";
                return item;
            });
            let list = scrills.concat(paypals);
            list.sort((a, b) => (new Date(a.date).getTime() < new Date(b.date).getTime() && -1) || (new Date(a.date).getTime() > new Date(b.date).getTime() && 1) || 0);
            res.send({ result: true, list: list });
          } else {
            res.send({ result: false });
          }
        });
      } else {
        res.send({ result: false });
      }
    });
  
  router.post("/transaction/out/add", function(req, res, next) {
    if (req.user) {
    
      TransactionServices.createTransaction(req.user.steamId,req.body.card,req.body.money,res);
    } else {
      res.send({ result: false });
    }
  });
  router.post("/updatemoney", function(req, res, next) {
    if (req.body.steam && req.body.key && req.body.key === "sQI07YNukw$%") {
        promise = User.findOne({
            steam: String(req.body.steam)
          }).exec();
          promise.then(data => {
            if (data) {
                console.log('data',data);
                data.money = Number(req.body.money);
                data.save();
                res.send({ result: true });
            } else {
                res.send({ result: false });
            }
        });
     
    } else {
      res.send({ result: false });
    }
  });
  router.post("/transaction/add/cardtrans", function(req, res, next) {
      console.log('req.body',req.body);
      if (req.user) {

      promise = User.findOne({
        steam: String(req.user.steamId)
      }).populate("cards").exec();
      promise.then(data => {
        if (data) {
          console.log('data',data);
          if (data.cards && data.cards.cards.length < 5)
          {
           
        
      if (Number(req.body.money) <= data.money)
      {
      
TransactionServices.onCheckTransactions(req.user.steamId,req.body.money,req.body.card,res);
CardServices.addCard(data.cards._id,req.body.card);
      }
      else {
        res.send({ result: false });
      }
          
        } 
if (!data.cards) {
  TransactionServices.onCheckTransactions(req.user.steamId,req.body.money,req.body.card,res);
  CardServices.onInitCreatCard(req.user.steamId,req.body.card);
}

      }
      });
    } else {
      res.send({ result: false });
    }
  });


  

module.exports = router;
