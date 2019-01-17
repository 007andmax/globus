var express = require('express');
var router = express.Router();
let Card = require('../models/card').Card;
let promise = null;
let newCard;



onAddCard = () => {
  let period = Math.floor(Math.random() * 12) + 1  ;
  let buyPrice = Math.round(Math.random() * 1000);
  let sellPrice = Math.round(Math.random() * 1000)
  newCard = {
    price: ((sellPrice - buyPrice) * 100) / buyPrice,
  status: (Math.random() > 0.5) ? false : true,
  name: "Идея по акциям компании nVidia",
  ideaDate: new Date().setTime(new Date().getTime() - Math.random() + 10000),
  period: (period === 1 ) ? `${period} + месяц` : (period <= 5) ? `${period} месяца` : `${period} месяцев`,
  buyPrice: buyPrice,
  sellPrice: sellPrice,
  logoSrc: 
  };
}

let scrillObject = new Scrill(newScrill);
scrillObject.save((err, scrillData, affected) => {
  if (err) {
    res.send({ result: false });
  }
  if (scrillData) {
    addScrillUser(steam, scrillData._id);
    res.send({ result: true, scrill: scrillData });
  }
});

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
