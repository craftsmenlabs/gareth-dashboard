var express = require('express')
    , http = require('http')
    , fs = require('fs');

var expressApp = express();

var configFile = process.env.DASHBOARD_CONFIG || "dev.js";

console.log("config file used", configFile)


expressApp.use(express.static(__dirname + '/public'));
expressApp.use("/config.js", express.static(__dirname + '/config/' + configFile));
var listeningPort = 8765;
http.createServer(expressApp).listen(listeningPort);

console.log('Server is listening on port ' + listeningPort);
