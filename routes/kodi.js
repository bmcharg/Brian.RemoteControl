module.exports = function(){

	var express = require('express');
	var app = express();

	var client = require('../server/jsonrpc-client.js');
	var commands = require('../config/commands.json');

	app.param('command', function(req, res, next, command){

		req.command = {
			device: "amplifier",
			// code: code,
			ip: commands.kodi.device.ip,
			port: commands.kodi.device.port,
			data: {
				"jsonrpc": "2.0",
				"method": command,
				"id": commands.kodi.commands[command],
				"params": {}
			}
		};

		next();
	});

	app.get('/command/:command', function (req, res){
		client.sendCommand(req.command, res);
	})

	return app;

}();

