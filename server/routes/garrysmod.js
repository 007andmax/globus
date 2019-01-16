var express = require('express');
var router = express.Router();
let server_gm = require('../servers/gm');
let User = require('../models/user').User;
let Staff = require('../models/staff').Staff;
let promise = null;
router.get('/infoservers', (req, res, next) => {

    server_gm.GetListServersGarrysmod(res);
});
router.post('/addstaff', (req, res, next) => {
    if (req.user && req.user.group === 1) {
    promise = User.findOne({ steam: req.body.steam }).exec();
    promise.then((data) => {
        if (data) {
            data.group = 2;
            let newStaff = {
                name: data.name,
                rank: "Admin",
                steam: data.steam,
                last_seen: new Date().getTime()
            };
            let StaffObject = new Staff(newStaff);
            StaffObject.save();
            data.save();
            res.send({ result: true });
            //  Trades.findOneAndUpdate({steam: String(offer.partner),tradeId:String(offer.id)},{cancel:true})
        }
        else {
            res.send({ result: false });
        }
    });
}
else
{
    res.send({ result: false });
}

});
router.post('/removestaff', (req, res, next) => {
    if (req.user && req.user.group === 1) {
    promise = Staff.deleteOne({ steam: req.body.steam }).exec();
    promise.then((err) => {
        if (err.n === 1 && err.ok === 1) {
            promise = User.findOneAndUpdate({ steam: req.body.steam }, { $set: { group: 0 } }).exec();
            promise.then((data) => {
                if (data) {
                    res.send({ result: true });
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
}
else
{
    res.send({ result: false });
}
});
router.post('/finduserbyname', (req, res, next) => {
    if (req.user && req.user.group === 1) {
    promise = User.find({ name: { $regex: req.body.name, $options: "i" } }).exec();
    promise.then((data) => {
        if (data) {
            let out = data.map((item) => {
                return { name: item.name, photo: item.photo, steam: item.steam, group: item.group };
            });
            res.send({ result: true, users: out });
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
router.post('/staff', (req, res, next) => {

    server_gm.getStaffGM(res);
});


module.exports = router;