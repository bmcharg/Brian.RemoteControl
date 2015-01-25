module.exports = function(){

	var express = require('express');
	var app = express();

	var client = require('../server/tcp-client.js');
	var commands = require('../config/commands.json');

	app.param('volume', function(req, res, next, volume){

		// To convert from code to dB
		// var dB = (code * 0.5) - 80.5;

		// To convert from dB to code
		// var code = (dB + 80) + (dB + 81)

		var string2dec = function(num){
			return parseFloat(num).toFixed(2);
		}
		var pad = function(num, size) {
		    var s = "000" + num;
		    return s.substr(s.length-size);
		}

		var code = (string2dec(volume) * 2) + 161;
		
		code = pad(code,3);
		code += "VL";

		req.command = {
			device: "amplifier",
			code: code,
			ip: commands.amplifier.device.ip,
			port: commands.amplifier.device.port
		};

		next();
	});

	app.param('request', function(req, res, next, request){
		req.command = {
			device: "amplifier",
			code: commands.amplifier.requests[request],
			ip: commands.amplifier.device.ip,
			port: commands.amplifier.device.port,
			waitForResponse: true
		};
		next();
	});

	app.param('code', function(req, res, next, code){
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

	app.get('/request/:request', function (req, res){
		var response = client.sendCommand(req.command, res);		
	})

	app.get('/volume/:volume', function (req, res){
		client.sendCommand(req.command, res);
	})


	app.get('/command/:command', function (req, res){
		client.sendCommand(req.command, res);
	})

	app.get('/code/:code', function (req, res){
		client.sendCommand(req.command, res);
	})


	return app;

}();