let Scrill = require("../../models/scrill").Scrill;
let User = require("../../models/user").User;
let DB = require("../../csgocase-fb/index");
let promise = null;
let newScrill = null;
onCheckScrillsWithdrawals = (steam, email, game, amount, res) => {
  promise = User.findOne({
    steam: String(steam)
  })
    .populate("scrills")
    .exec();
  promise.then(data => {
    if (data) {
      
      let money = 0;
      for (let i = 0; i < data.scrills.length; i++) {
        if (!data.scrills[i].closed) {
          money += data.scrills[i].amount;
        }
      }
      if (
        data.scrills.length === 0
      ) {
       
         
            createScrill(steam, email, game, amount,"-", res);
          
        }
       
      if (data.scrills.length > 0)
      {
        if ((money + Number(amount)) >= data.money) {
          res.send({ result: false });
        } else {
         
          createScrill(steam, email, game, amount,"-", res);
          
        }
      }
     
    }
  });
};
createScrill = (steam, email, game, amount,action, res) => {
  newScrill = {
    steam: String(steam),
    email: String(email),
    amount: Number(amount),
    action:action,
    game: game,
    time: new Date()
  };
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
};
addScrillUser = (steam, id) => {
  promise = User.findOne({
    steam: String(steam)
  }).exec();
  promise.then(data => {
    if (data) {
      let scrills = data.scrills;
      scrills.push(id);
      data.scrills = scrills;
      data.save();
    }
  });
};


module.exports.onCheckScrillsWithdrawals = onCheckScrillsWithdrawals;
