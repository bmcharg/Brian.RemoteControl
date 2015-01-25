var net = require('net');
var express = require('express')
var bodyParser = require('body-parser');
var colors = require('colors');

var packageJSON = require('./package.json');

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
	console.info("################################################################################");
	console.info("");	
	console.info(colors.green("   " + packageJSON.name + " :: Version " + packageJSON.version + ""));
	console.info(colors.grey("   " + packageJSON.repository.url));
	console.info("");	
	console.info("   Server started at " + new Date().toLocaleString());
	console.info("   Configuration: " + process.env.NODE_ENV);
	console.info("   Server IP Address: " + host);
	console.info("   Listening on port: " + port);
	if (process.env.NODE_ENV == "production"){
		console.info("");	
		console.info(colors.red("   RUNNING IN PRODUCTION MODE"));	
	}
	console.info("");	
	console.info("");	
	console.info("################################################################################");
	console.info("");	

	console.info("");	


})

