var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var config = require('../conf/index');

mongoose.connect(config.get('mongoose:uri'), config.get('mongoose:options'));

module.exports = mongoose;