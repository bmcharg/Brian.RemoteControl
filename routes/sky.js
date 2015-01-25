module.exports = function(){

	var express = require('express');
	var app = express();

	var client = require('../server/soap-client.js');
	var commands = require('../config/commands.json');

var http = require('http');
var url = require('url');

	app.param('channel', function(req, res, next, channel){
		req.command = {
			device: "sky",
			// code: commands.sky.commands[command],
			// ip: commands.amplifier.device.ip,
			// port: commands.amplifier.device.port,
			channel: channel
		};
		next();
	});

	app.get('/channel/:channel', function (req, res, channel){


		var channelActions = {
			header : '"urn:schemas-nds-com:service:SkyPlay:2#SetAVTransportURI"',
			getBody : function(channel) {

			return 	'<?xml version="1.0" encoding="utf-8"?>' +
					'<s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/">' + 
    				'<s:Body><u:SetAVTransportURI xmlns:u="urn:schemas-nds-com:service:SkyPlay:2"><InstanceID>0</InstanceID><CurrentURI>xsi://feb</CurrentURI></u:SetAVTransportURI></s:Body>' + 
					'</s:Envelope>'

				// return '<?xml version="1.0" encoding="utf-8"?>' + 
				// 			'<s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body>' + 
				// 			'<u:SetAVTransportURI xmlns:u="urn:schemas-nds-com:service:SkyPlay:2">' + 
				// 			'<InstanceID>0</InstanceID><CurrentURI>xsi://' + req.command.channel + '</CurrentURI></u:SetAVTransportURI></s:Body></s:Envelope>'
			}
		}

			var options = {
				host : "192.168.0.113",
				path : '/444D5276-3247-536B-7943-0019fbb4317eSkyPlay',
				port : 49153,
				method : 'POST',
				headers : {
					'USER-AGENT' : 'SKY_skyplus', 
					'SOAPACTION' : '"urn:schemas-nds-com:service:SkyPlay:2#SetAVTransportURI',
					'CONTENT-TYPE' : 'text/xml; charset="utf-8"'
				}
			};

			var commandRequest = http.request(options, function(res) {
				console.log('connected');
				res.setEncoding('utf8');
				res.on('data', function(chunk) {
					initRes.end(chunk);
				});
			});

			console.log("Sending command");

			commandRequest.write(channelActions.getBody(req.command.channel));
			commandRequest.end();

			commandRequest.on('error', function(e) {
				console.log('Error in Comms with SKY Box ' + e.message);
			});

			res.type("application/json");
		 	res.send({"Done": "DONE"});		    	

	})

	return app;

}();