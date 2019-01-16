var express = require('express');
var router = express.Router();
let totp = require('notp').totp;
let https = require('https');
let request = require('request');
let base32 = require('thirty-two');
let server_csgo = require('../servers/csgo');
let TopRules = require('../models/toprules').TopRules;
let promise = null;
let csgochat = require("../models/chatcsgo").CsGoChat;
router.post('/infoservers', (req, res, next) => {

    server_csgo.GetListServersCsGo(res);
});
router.get('/chat/get', (req, res, next) => {
    promise = csgochat.find().sort({ _id: -1 }).limit(50).exec();
    promise.then((data) => {
        if (data) {
            res.send({ result: true, list: data });
        }
        else {
            res.send({ result: false });
        }
    });
   
});
router.post('/chat/sendmessage', (req, res, next) => {
    if (req.user && req.user.ban === false) {
        let rules = new csgochat({
            name: req.user.displayName,
            photo: req.user.photo,
            message: req.body.message,
            steam: req.user.steamId,
            date: new Date()
        });
        rules.save((err, data) => {
            if (data) {
    
                res.send({ result: true });
            }
            else {
                res.send({ result: false });
            }
        });
       
    }else
    {
        res.send({ result: false });
    }
   
});
router.get('/top/getlastsinners', (req, res, next) => {

    server_csgo.getLastWinners(res);
});
router.get('/staff', (req, res, next) => {

    server_csgo.getStaffCsGo(res);
});
router.get('/getlastrule', (req, res, next) => {

    promise = TopRules.findOne().sort({_id:-1}).exec();
    promise.then((doc) =>
    {
        if (doc)
        {
            res.send({result:true,data:doc});
        }
        else
        {
            res.send({result:false});
        }
    });
});
router.get('/admin/getskins', (req, res, next) => {
    if (req.user && req.user.group === 1) {
    request(`http://distour.com:1234/csgo/getskins`, { json: true }, (err, response, body) => {
        if (!err && response.statusCode == 200) {
            res.send(body);
        }
        else {
            res.send(body);
        }
    });
}else
{
    res.send({result:false});
}
});
router.get('/listrules', (req, res, next) => {

    promise = TopRules.find().sort({_id:-1}).exec();
    promise.then((doc) =>
    {
        if (doc)
        {
            res.send({result:true,list:doc});
        }
        else
        {
            res.send({result:false});
        }
    });
});
router.post('/admin/addrules', (req, res, next) => {
    if (req.user && req.user.group === 1) {
server_csgo.addRules(req,res);
    }
    else
    {
        res.send({result:false}); 
    }
});
 
router.get('/top/get', (req, res, next) => {
   
    server_csgo.getTop(res);
  
});
/*router.post('/shop', (req, res, next) => {

    request(`http://distour.com:1234/csgocase/allitemshop?page=${req.body.page}&sort=${req.body.sort}`, { json: true }, (err, response, body) => {
        if (!err && response.statusCode == 200) {
            res.send(body);
        }
        else {
            res.send(body);
        }
    });
  
});*/
router.post('/user/data', (req, res, next) => {
    if (req.user && req.user.ban === false) {
        res.send({ result: true, user: { name: req.user.displayName, photo: req.user.photos[0].value, steam: true, money: 0 } });
    }
    else {
        res.send({ result: false });
    }

});
/*router.post('/shop/paypal', (req, res, next) => {
    
    //paypal.setPayment();
   

});*/
/*router.post('/shop/buy', (req, res, next) => {
     if (req.user) {

    request.post(
        'http://distour.com:1234/csgocase/shop/buy',
        { json: { items: req.body.items, steam: req.body.steam } },
        (error, response, body) => {
            if (!error && response.statusCode == 200) {
                res.send(body);
            }
            else {
                res.send(body);
            }
        }
    );
     }
      else {
          res.send({ result: false });
      }

});*/
/*router.post('/shop/filter', (req, res, next) => {
    request.post(
        'http://distour.com:1234/csgocase/allitemshop/filter',
        { json: { page: req.body.page, filter: req.body.filter } },
        (error, response, body) => {
            if (!error && response.statusCode == 200) {
                res.send(body);
            }
            else {
                res.send(body);
            }
        }
    );
});*/

module.exports = router;
