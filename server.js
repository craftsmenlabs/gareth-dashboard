var express = require('express')
    , http = require('http')
    , fs = require('fs');

var expressApp = express();

var garethConfig = {
    'backendExperimentUrl': process.env.GARETH_BACKEND_URL || '/data/experiments.json'
};


expressApp.use(express.static(__dirname + '/public'));
expressApp.use("/config.json", function (req, res) {
    res.set("Content-Type", "application/json");
    res.json(garethConfig);
});
var listeningPort = 8765;
http.createServer(expressApp).listen(listeningPort);

console.log('Server is listening on port ' + listeningPort);
