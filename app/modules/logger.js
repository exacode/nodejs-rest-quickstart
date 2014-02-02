'use strict';

var bunyan = require('bunyan');
var config = require('./config/config.js');
var logDir = __dirname + '/../../tmp/';

switch (config.env) {
	case 'production': {
		var streams = [{
			type: 'rotating-file',
			path: logDir + config.env + '.log',
			period: '1d',	// daily rotation
			count: 7		// keep 3 back copies
		}];
	}
	break;
	default: {
		var PrettyStream = require('bunyan-prettystream');
		var prettyStdOut = new PrettyStream({
			mode: 'short',
			useColor: true
		});
		prettyStdOut.pipe(process.stdout);
		var streams = [
			{
				level: 'trace',
				type: 'raw',
				stream: prettyStdOut
			},
			{
				level: 'trace',
				path: logDir + config.env + '.log',
				type: 'file'
			}
		];
	}
}

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
	console.debug = function() {
		logger.debug.apply(logger, arguments);
	};
	console.info = function() {
		logger.info.apply(logger, arguments);
	};
	console.error = function() {
		logger.error.apply(logger, arguments);
	};
};