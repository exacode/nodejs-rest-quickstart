'use strict';

var Logger = require('./modules/logger');
var logger = Logger.create('App');
Logger.overrideConsole(Logger.create('Console'));

var config = require('./modules/config/config');
var restify = require('restify');

var server = restify.createServer({
	name : config.app.name
});

if (config.env === 'development') {
	// Request logging
	server.pre(function (request, response, next) {
		logger.trace({req: request}, 'HTTP Request');
		return next();
	});

	// Response logging
	server.on('after', function (request, response) {
		logger.trace({res: response}, "HTTP Response");
	});
	
	// Initaialization log
	server.listen(config.app.port, config.app.host, function(){
		logger.info('%s listening at %s ', server.name , server.url);
		logger.debug({'configuration': config});
	});

	// Overriden logging through console for sub modules
	console.log("console.log");
	console.debug("console.debug");
	console.info("console.info");
	console.error("console.error");
}

server.get({path : '/hello' , version : '0.0.1'} , sayHello);

function sayHello(req, res , next){
	logger.info('Saying hello');
	res.send(200 , "Hi there!");
	return next();
}