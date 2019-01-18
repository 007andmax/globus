/**
 * Created by Макс on 18.03.2017.
 */
var mongoose = require("../lib/mongoose"),
    Schema = mongoose.Schema;
var schema = new Schema({
    phone: String,
    date: Date
});

exports.Phone = mongoose.model("Phone", schema);
