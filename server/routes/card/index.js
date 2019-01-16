let Card = require("../../models/card").Card;
let User = require("../../models/user").User;
onInitCreatCard = (steam, card) => {
  let newCard = {
    cards: [String(card)]
  };
  let cardObject = new Card(newCard);
  cardObject.save((err, cardData) => {
    if (cardData) {
      addCardUser(steam, cardData._id);
    }
  });
};
addCardUser = (steam, id) => {
  promise = User.findOne({
    steam: String(steam)
  }).exec();
  promise.then(data => {
    if (data) {
      let cards = [id];
      data.cards = cards;
      data.save();
    }
  });
};

addCard = (id,card) => {
  promise = Card.findOne({
    _id: id
  }).exec();
  promise.then(data => {
    if (data) {
      let cards = data.cards;
      cards.push(card);
      data.cards = cards;
      data.save();
    }
  });
}
module.exports.addCard = addCard;
module.exports.onInitCreatCard = onInitCreatCard;
