/**
 * Created by Макс on 18.03.2017.
 */
var mongoose = require('../lib/mongoose'),
    Schema = mongoose.Schema;
var schema = new Schema({
  
    price: {
        type: Number
    },
    status: {
        type: Boolean
    },
    name: {
        type: String
    },
    ideaDate: {
        type: new Date()
    },
    period: {
        type: String
    },
    buyPrice: {
        type: Number
    },
    sellPrice: {
        type: Number
    },
    logoSrc: {
        type: String
    },

});

exports.Card = mongoose.model('Card', schema);
