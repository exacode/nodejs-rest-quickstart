'use strict';

var logger = require('./modules/logger').create('App');
var config = require('./modules/config/config');

var express = require('express');
var app = express();

// Express configuration
if (config.log.request || config.log.response) {
	// Request/Reponse logging
	app.use(function(request, response, next){
		if (config.log.request)
			logger.trace({req: request}, "HTTP Request %s", request.url);
		next();
		if (config.log.response)
			logger.trace({res: response}, "HTTP Response %s", response.url);
	});
}
app.use(app.router);
app.use(function(err, req, res, next) {
	// Error handling
	if(!err) return next();
	logger.error({"err": err}, "Server error!!!");
	res.send("error!!!");
});
app.use(express.bodyParser());
app.use(express.methodOverride());

// Defining routings
var versions = {'v0': 'Pre-release', 'v1': 'Version 1'};

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
app.use(function(req, res){
	res.send(404, 'Resource not found');
});

exports.start = function start() {
	var port = config.app.port;
	app.listen(port);
	logger.info("Listening on port %s", port);
};