module.exports = function(){

	var express = require('express');
	var app = express();

	var client = require('../server/tcp-client.js');
	var commands = require('../config/commands.json');

	app.param('code', function(req, res, next, command){
		req.command = {
			device: "amplifier",
			code: code,
			ip: commands.amplifier.device.ip,
			port: commands.amplifier.device.port
		};
		next();
	});

	app.param('command', function(req, res, next, command){
		req.command = {
			device: "amplifier",
			code: commands.amplifier.commands[command],
			ip: commands.amplifier.device.ip,
			port: commands.amplifier.device.port
		};
		next();
	});

	app.param('code', function(req, res, next, command) {
		req.code = code;
		next();
	});


	app.get('/command/:command', function (req, res){
		console.log("Sending command " + req.command);
		client.sendCommand(req.command, res);
	})

	app.get('/code/:code', function (req, res){
		console.log("Sending code " + req.command);
		client.sendCommand(req.command, res);
	})


	return app;

}();