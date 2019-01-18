var mongoose = require("mongoose");
var session = require("express-session");
var MongoStore = require("connect-mongo")(session);

var sessionStore = new MongoStore({  url : "mongodb://localhost:27017/globus"});

module.exports = sessionStore;