let Card = require("../models/card").Card;
let Phone = require("../models/phone").Phone;

onAddCard = () => {
  let cardObject = new Card({
    price: 12.25,
    status: false,
    name: "Идея по ETF UVXY",
    ideaDate: new Date("2018-03-22T16:13:00Z"),
    period: "2 месяца",
    buyPrice: 16.72,
    sellPrice: 41.15,
    logoSrc: "images/20/9f0650ba586aad1a8ea23f3b566a190a.png"
  });
  cardObject.save((err, data) => {
    if (err) {
      console.log("err", err);
    } else {
      if (data) {
        console.log("data", data);
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
//onAddCard();
module.exports.addPhone = addPhone;
module.exports.onAddCard = onAddCard;
