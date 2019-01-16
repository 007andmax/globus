var express = require('express');
var router = express.Router();
let User = require('../models/user').User;
let chatcsgo = require('../models/chatcsgo').CsGoChat;
let promise = null;

/*let newUser = {
    photo:"https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/0a/0ad1936556f8da7346414535c3a0219590a6686c_full.jpg",
    name:  "distour",
    steam: "76561198021680079",
    url: "",
    money:0,
    group: 0,
    ban:false
};
let UserObject = new User(newUser);
UserObject.save();*/
router.post('/csgo/chat/removemessage', (req, res, next) => {
    if (req.user && req.user.group === 1) {
    promise = chatcsgo.findOneAndRemove({ _id: req.body._id }).exec();
    promise.then((data) => {
        if (data) {
          
            res.send({ result: true});
        }
        else {
            res.send({ result: false });
        }
    });
     }
     else {
         res.send({ result: false });
     }
});
router.post('/finduserbyname', (req, res, next) => {
    if (req.user && req.user.group === 1) {
    promise = User.find({ name: { $regex: req.body.name, $options: "i" } }).exec();
    promise.then((data) => {
        if (data) {
          
            res.send({ result: true, users: data });
        }
        else {
            res.send({ result: false });
        }
    });
     }
     else {
         res.send({ result: false });
     }
});
router.post('/unban', function (req, res, next) {
    if (req.user && req.user.group === 1) {
       promise = User.findOne({steam:req.body.steam}).exec();
       promise.then((data) => {
         if (data) {
             data.ban = false;
             data.save();
           res.send({ result: true})
         }
         else {
           res.send({ result: false });
         }
       });
     } else {
       res.send({ result: false });
     }
   });
router.post('/banuser', function (req, res, next) {
    if (req.user && req.user.group === 1) {
       promise = User.findOne({steam:req.body.steam}).exec();
       promise.then((data) => {
         if (data) {
             data.ban = true;
             data.save();
           res.send({ result: true})
         }
         else {
           res.send({ result: false });
         }
       });
    } else {
       res.send({ result: false });
     }
   });
   
router.get('/getuser', function (req, res, next) {
    if (req.user && req.user.group === 1) {
    promise = User.find().exec();
    promise.then((data) => {
      if (data) {
        res.send({ result: true, list: data })
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
