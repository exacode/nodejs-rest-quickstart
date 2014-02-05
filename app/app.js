'use strict';

var logger = require('./modules/logger').create('App');
var config = require('./modules/config/config');
var error = require('./routes/error');

var express = require('express');
var app = express();

var versions = {
	'v0': 'Pre-release',
	'v1': 'Version 1'
};

setupAppConfig();
setupAppRouting();

exports.start = function start() {
	var port = config.app.port;
	app.listen(port);
	logger.info("Listening on port %s", port);
};

exports.app = app;

function setupAppConfig() {
	var logRequest = config.app.log.request;
	var logResponse = config.app.log.response;
	if (logRequest || logResponse) {
		// Request/Reponse logging
		app.use(function(request, response, next){
			if (logRequest)
				logger.trace({req: request}, "HTTP Request %s", request.url);
			next();
			if (logResponse)
				logger.trace({res: response}, "HTTP Response %s", request.url);
		});
	}
	app.use(app.router);
	app.use(error.serverErrorHandler);
	// app.use(express.bodyParser());
	app.use(express.json());
	app.use(express.urlencoded());
	app.use(express.methodOverride());
}

function setupAppRouting() {
	// API version listing
	app.get('/versions', function(req, res) {
		res.json(versions);
	});

	for (var version in versions) {
		logger.info('Version %s', version);
		var prefix = '/' + version;
		var api = require('./routes/' + version + '/api');
		api.setup(prefix, app);
	}

	// 404 mapping - keep it always at the end
	app.use(error.resourceNotFoundErrorHandler);
}