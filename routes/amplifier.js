module.exports = function(){

	var express = require('express');
	var app = express();

	var client = require('../server/tcp-client.js');
	var commands = require('../config/commands.json');

	app.param('command', function(req, res, next, command) {
		req.command = commands.amplifier[command];
		next();
	});

	app.param('code', function(req, res, next, command) {
		req.code = code;
		next();
	});


	app.get('/command/:command', function (req, res){
		client.sendCommand(req.command);
	})

	app.get('/code/:code', function (req, res){
		client.sendCommand(req.code);
	})


	return app;

}();