module.exports = function(){

	var http = require('http');
	var url = require('url');

	var httpClient = {};

	httpClient.sendCommand = function(command, res){

			console.info("Sending command " + JSON.stringify(command.data));

			var options = {
				host : "192.168.0.20",
				path : '/jsonrpc',
				port : 80,
				method : 'POST',
				headers : {
					'USER-AGENT' : 'SKY_skyplus', 
					'SOAPACTION' : '"urn:schemas-nds-com:service:SkyPlay:2#SetAVTransportURI',
					'CONTENT-TYPE' : 'application/json'
				}
			};

			var commandRequest = http.request(options, function(commandResponse) {
				commandResponse.setEncoding('utf8');
				var responseString = "";

				  commandResponse.on('data', function(data) {
				    responseString += data;
				  });

				  commandResponse.on('end', function() {
				    var resultObject = JSON.parse(responseString);
					res.type("application/json");
				    res.send(resultObject);
				  });
			});

			commandRequest.write(JSON.stringify(command.data));
			commandRequest.end();

			commandRequest.on('error', function(e) {
				console.log('Error in Comms with SKY Box ' + e.message);
			});


	}

	return httpClient;

}();	