module.exports = function(){

	var net = require('net');
	var tcp = {};


	tcp.sendCommand = function(command, res){

		console.log("***" + config.AMP_PORT);

		var client = new net.Socket();
		client.connect(command.port, command.ip, function() {

		    console.log('CONNECTED TO: ' + command.ip + ':' + command.port);
		    // Write a message to the socket as soon as the client is connected, the server will receive it as message from the client 
		    client.write(command.code + '\r\n');


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

		});

		// Add a 'data' event handler for the client socket
		// data is what the server sent to this socket
		client.on('data', function(data) {
		    
		    console.log('DATA: ' + data);
		    // Close the client socket completely
		    client.destroy();
		    
		});

	}

	return tcp;

}();	