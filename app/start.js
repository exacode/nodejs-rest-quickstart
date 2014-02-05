'use strict';

console.log("Starting logger...");
var Logger = require('./modules/logger');
var logger = Logger.create('Server');
Logger.overrideConsole(Logger.create('Console'));
logger.info("Logger started");

var config = require('./modules/config/config');
logger.info("Environment: " + config.env);
if (config.env === 'development') {
	logger.info({ "config" : config }, "Active configuration");
}

logger.info("Starting web application...");
var app = require('./app');
app.start();
logger.info("Web application successfully started. Waiting for incoming connections...");

// Process error handling
process.on('uncaughtException', function (error) {
	logger.error({err: error}, 'An uncaughtException was found, the program will end.');
	process.exit(1);
});
