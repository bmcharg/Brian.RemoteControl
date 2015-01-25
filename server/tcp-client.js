module.exports = function(){

	var net = require('net');
	var tcp = {};


	tcp.sendCommand = function(command, res){

		console.info("Sending command " + command.code);

		var client = new net.Socket();
		client.connect(command.port, command.ip, function() {

		    console.info('CONNECTED TO: ' + command.ip + ':' + command.port);

		    client.write(command.code + '\r\n');

		    if (!command.waitForResponse){

			    var response = {
			    	"status": true,
			    	"command": command.code,
			    	"device": {
			    		"name": command.device,
			    		"ip": command.ip,
			    		"port": command.port
			    	}
			    };

				res.type("application/json");
				res.send(response);		    	

		    }

		});

		// Add a 'data' event handler for the client socket
		// data is what the server sent to this socket
		client.on('data', function(data) {

			if (command.waitForResponse){

				var response = {
					"success": true,
					"request": {
						"command": command.code,
						"device": {
							"name": command.device,
							"ip": command.ip,
							"port": command.port
						}
					},
					"response": data.toString()
				};

				res.type("application.json");
				res.send(response);
			    // Close the client socket completely
			}

		    client.destroy();
		    
		});

	}

	return tcp;

}();	