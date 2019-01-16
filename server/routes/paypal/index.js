let PayPal = require("../../models/paypal").PayPal;
let User = require("../../models/user").User;
let promise = null;
let newPayPal = null;
onCheckPayPalsWithdrawals = (steam, email, game, amount, res) => {
  console.log('steam',steam);
  console.log('email',email);
  console.log('game',game);
  console.log('amount',amount);
  promise = User.findOne({
    steam: String(steam)
  })
    .populate("paypals")
    .exec();
  promise.then(data => {
    if (data) {
      console.log('data',data);
      let money = 0;
      for (let i = 0; i < data.paypals.length; i++) {
        if (!data.paypals[i].closed) {
          money += data.paypals[i].amount;
        }
      }
      if (
        data.paypals.length === 0
      ) {
       
         
            createPaypal(steam, email, game, amount,"-",res);
          
        }
       
      if (data.paypals.length > 0)
      {
        if ((money + Number(amount)) >= data.money) {
          console.log('1');
          res.send({ result: false });
        } else {
         
            createPaypal(steam, email, game, amount,"-", res);
          
        }
      }
     
    }
  });
};
createPaypal = (steam, email, game, amount,action, res) => {
    newPayPal = {
    steam: String(steam),
    email: String(email),
    amount: Number(amount),
    action:action,
    game: game,
    time: new Date()
  };
  let papalObject = new PayPal(newPayPal);
  papalObject.save((err, paypalData, affected) => {
    if (err) {
      console.log('2');
      res.send({ result: false });
    }
    if (paypalData) {
      addPayPalUser(steam, paypalData._id);
      res.send({ result: true, paypal: paypalData });
    }
  });
};
addPayPalUser = (steam, id) => {
  promise = User.findOne({
    steam: String(steam)
  }).exec();
  promise.then(data => {
    if (data) {
      let paypals = data.paypals;
      paypals.push(id);
      data.paypals = paypals;
      data.save();
    }
  });
};


module.exports.onCheckPayPalsWithdrawals = onCheckPayPalsWithdrawals;
