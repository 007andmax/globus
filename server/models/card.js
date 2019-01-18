/**
 * Created by Макс on 18.03.2017.
 */
var mongoose = require("../lib/mongoose"),
    Schema = mongoose.Schema;
var schema = new Schema({
    price: Number,
    status: Boolean,
    name: String,
    ideaDate: Date,
    period:String,
    buyPrice: Number,
    sellPrice: Number,
    logoSrc: String,
    phones: [{type: mongoose.Schema.Types.ObjectId, ref: "Phone"}],

});

exports.Card = mongoose.model("Card", schema);
