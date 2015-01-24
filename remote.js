var net = require('net');
var express = require('express')
var bodyParser = require('body-parser');
var colors = require('colors');

var app = express();
app.use(bodyParser.json());

// Load the configuration
process.env.NODE_ENV = process.env.NODE_ENV || "development";
config = require('./config/config.json')[process.env.NODE_ENV];

// Routes
app.use('/amp', require('./routes/amplifier'));

// Configuration all done - start the server
var server = app.listen(3000, function () {

	var host = server.address().address
	var port = server.address().port

	// Clear the console
	process.stdout.write('\033c');

	// Output server information to the console for reference
	console.log("################################################################################");
	console.log("");	
	console.log(colors.green("   " + packageJSON.name + " :: Version " + packageJSON.version + ""));
	console.log(colors.grey("   " + packageJSON.repository.url));
	console.log("");	
	console.log("   Server started at " + new Date().toLocaleString());
	console.log("   Configuration: " + process.env.NODE_ENV);
	console.log("   Server IP Address: " + host);
	console.log("   Listening on port: " + port);
	if (process.env.NODE_ENV == "production"){
		console.log("");	
		console.log(colors.red("   RUNNING IN PRODUCTION MODE"));	
	}
	console.log("");	
//	console.log(colors.green("   Server available at " + config.SERVER_URL + ":" + config.SERVER_PORT));
	console.log("");	
	console.log("");	
	console.log("################################################################################");
	console.log("");	

	console.log("");	


})

