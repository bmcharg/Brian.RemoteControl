module.exports = function(){

	var net = require('net');
	var tcp = {};


	tcp.sendCommand = function(command){

		console.log("***" + config.AMP_PORT);

		var client = new net.Socket();
		client.connect(config.AMP_PORT, config.AMP_IP_ADDRESS, function() {

		    console.log('CONNECTED TO: ' + config.AMP_IP_ADDRESS + ':' + config.AMP_PORT);
		    // Write a message to the socket as soon as the client is connected, the server will receive it as message from the client 
		    client.write(command + '\r\n');

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