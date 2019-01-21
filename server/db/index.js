let Card = require("../models/card").Card;
let Phone = require("../models/phone").Phone;
let indexCard = 0;
let cards = [{
  "price" : 257,
  "status" : false,
  "name" : "Идея по акциям компании nVidia",
  "ideaDate" : new Date("2017-11-09T13:41:00Z"),
  "period" : "6 месяцев",
  "buyPrice" : 204.79,
  "sellPrice" : 250,
  "logoSrc" : "images/20/faf57550829abbade3bebcce94dd8e94.png"
},
{
  "price" : 193.2,
  "status" : true,
  "name" : "Идея по акциям компании Alibaba",
  "ideaDate" : new Date("2017-11-10T19:06:00Z"),
  "period" : "3 месяца",
  "buyPrice" : 186.15,
  "sellPrice" : 210,
  "logoSrc" : "images/20/c0f0f029184defccf0ce5a1b724e4254.png"
},
{
  "price" : 215,
  "status" : true,
  "name" : "Идея по акциям компании Сбербанк",
  "ideaDate" : "2017-11-13T13:09:00Z",
  "period" : "6 месяцев",
  "buyPrice" : 220.97,
  "sellPrice" : 260,
  "logoSrc" : "images/20/292f4cde8164fbc2afecf12b6dfabb8f.png"
},
{
  "price" : 920,
  "status" : true,
  "name" : "Идея по акциям компании Северсталь",
  "ideaDate" : new Date("2017-11-29T18:19:00Z"),
  "period" : "6 месяцев",
  "buyPrice" : 899.95,
  "sellPrice" : 1000,
  "logoSrc" : "images/20/a17167f1babd3d1dc91759eeb63636e3.png"
},
{
  "price" : 170,
  "status" : true,
  "name" : "Идея по акциям компании Palo Alto Networks",
  "ideaDate" : new Date("2017-12-11T18:42:00Z"),
  "period" : "6-12 месяцев",
  "buyPrice" : 144.38,
  "sellPrice" : 180,
  "logoSrc" : "images/20/9128419148f6c5a3bebedeaf81563777.png"
},
{
  "price" : 530,
  "status" : false,
  "name" : "Идея по акциям компании Татнефть",
  "ideaDate" : new Date("2017-12-14T13:25:00Z"),
  "period" : "1-2 месяца",
  "buyPrice" : 501.9,
  "sellPrice" : 530,
  "logoSrc" : "images/20/0f3fc17810f242e7a951d64e8e77aaf2.png"
},
{
  "price" : 45,
  "status" : false,
  "name" : "Идея по акциям компании Cree",
  "ideaDate" : new Date("2018-03-15T18:13:00Z"),
  "period" : "3-4 месяца",
  "buyPrice" : 42.6,
  "sellPrice" : 50,
  "lastModifBy" : "pavel@Berlin.ov",
  "logoSrc" : "images/20/b892a3789cdab65efcb91285b78283d3.png"
},
{
  "price" : 12.25,
  "status" : false,
  "name" : "Идея по ETF UVXY",
  "ideaDate" : new Date("2018-03-22T16:13:00Z"),
  "period" : "2 месяца",
  "buyPrice" : 16.72,
  "sellPrice" : 41.15,
  "logoSrc" : "images/20/9f0650ba586aad1a8ea23f3b566a190a.png"
}
];


onInitCheckDb = () => {
  promise = Card.find({}).exec();
  promise.then(data => {
    console.log('data');
    if (data.length === 0) {
      onAddCard();
    }});
}
onAddCard = () => {
  let cardObject = new Card(cards[indexCard]);
  cardObject.save((err, data) => {
    if (err) {
      console.log("err", err);
    } else {
      if (data) {
        indexCard ++;
        if (cards.length !== indexCard)
        {
          onAddCard();
        }
      }
    }
  });
};
addPhone = (id, phone,res) => {
  let phoneObject = new Phone({
    phone: phone,
    date: new Date()
  });
  phoneObject.save((err, dataPhone) => {
    if (err) {
      console.log("err", err);
    } else {
      if (dataPhone) {
        promise = Card.findOne({ _id: id }).exec();
        promise.then(data => {
          if (data) {
            let phones = data.phones;
            phones.push(dataPhone._id);
            data.phones = phones;
            data.save();
            res.send({ result: true });
          } else {
            res.send({ result: false });
          }
        });
      }
    }
  });
};
onInitCheckDb();
module.exports.addPhone = addPhone;
module.exports.onAddCard = onAddCard;
