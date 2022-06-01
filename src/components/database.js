const mongose = require("mongoose");

mongose.connect("mongodb://127.0.0.1:27017/test")
mongose.connection.once('open', _=> console.log('Database Connected'))