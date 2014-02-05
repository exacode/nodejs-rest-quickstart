'use strict';

var bunyan = require('bunyan');
var config = require('./config/config.js');
var projectDir = __dirname + '/../../';

var streams = [];
config.logger.streams.forEach(function(streamConf) {
	switch (streamConf.type) {
		case "file":
			streams.push({
				type: 'file',
				path: (streamConf.path || './app.log').replace(/^\.\//, projectDir),
				level: streamConf.level || 'trace'
			});
		break;
		case "rotating-file":
			streams.push({
				type: 'rotating-file',
				path: (streamConf.path || './app.log').replace(/^\.\//, projectDir),
				period: streamConf.period || '1d',	// daily rotation
				count: streamConf.count || 3,		// keep 3 back copies
				level: streamConf.level || 'trace'
			});
		break;
		default: // case "console":
			var PrettyStream = require('bunyan-prettystream');
			var prettyStdOut = new PrettyStream({
				mode: streamConf.colors || 'short',
				useColor: streamConf.colors || true
			});
			prettyStdOut.pipe(process.stdout);
			streams.push({
				type: 'raw',
				stream: prettyStdOut,
				level: streamConf.level || 'trace'
			});
		break;
	}
});

exports.create = function(name) {
	return bunyan.createLogger({
		name: name,
		streams: streams,
		serializers: {
			err: bunyan.stdSerializers.err,
			req: bunyan.stdSerializers.req,
			res: bunyan.stdSerializers.res
		}
	});
};

exports.overrideConsole = function(logger) {
	console.log = function() {
		logger.trace.apply(logger, arguments);
	};
	console.info = function() {
		logger.info.apply(logger, arguments);
	};
	console.error = function() {
		logger.error.apply(logger, arguments);
	};
};