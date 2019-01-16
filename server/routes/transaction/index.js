let TransactionCard = require("../../models/transaction-card").TransactionCard;
let User = require("../../models/user").User;
let promise = null;
let newTrans = null;
onCheckTransactions = (steam, outMoney, card,res) => {
  promise = User.findOne({
    steam: String(steam)
  })
    .populate("transactionsCard")
    .exec();
  promise.then(data => {
    if (data) {
      
      let money = 0;
      for (let i = 0; i < data.transactionsCard.length; i++) {
        if (!data.transactionsCard[i].closed) {
          money += data.transactionsCard[i].money;
        }
      }
      if (
        data.transactionsCard.length === 0
      ) {
       
         
            createTransaction(steam,card,outMoney,res);
          
        }
       
      if (data.transactionsCard.length > 0)
      {
        if ((money + Number(outMoney)) >= data.money) {
          res.send({ result: false });
        } else {
         
            createTransaction(steam,card,outMoney,res);
          
        }
      }
     
    }
  });
};
createTransaction = (steam,card,money, res) => {
  newTrans = {
    steam: String(steam),
    action: "-",
    card: String(card),
    money: Number(money),
    time: new Date()
  };
  let transObject = new TransactionCard(newTrans);
  transObject.save((err, transData, affected) => {
    if (err) {
      res.send({ result: false });
    }
    if (transData) {
      addTransactionUser(steam, transData._id);
      res.send({ result: true, trans: transData });
    }
  });
};
addTransactionUser = (steam, id) => {
  promise = User.findOne({
    steam: String(steam)
  }).exec();
  promise.then(data => {
    if (data) {
      let transactionsCard = data.transactionsCard;
      transactionsCard.push(id);
      data.transactionsCard = transactionsCard;
      data.save();
    }
  });
};
module.exports.createTransaction = createTransaction;
module.exports.addTransactionUser = addTransactionUser;
module.exports.onCheckTransactions = onCheckTransactions;
