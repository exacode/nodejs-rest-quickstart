'use strict';

console.log("Starting logger...");
var Logger = require('./modules/logger');
var logger = Logger.create('Server');
Logger.overrideConsole(Logger.create('Console'));
logger.info("Logger started");

var config = require('./modules/config/config');
logger.info("Environment: " + config.env);

var app = require('./app');

logger.info("Starting application dispatcher...");
app.start();
logger.info("Successfully started application dispatcher. Waiting for incoming connections...");

// Process error handling
process.on('uncaughtException', function (error) {
	logger.error({err: error}, 'An uncaughtException was found, the program will end.');
	process.exit(1);
});
