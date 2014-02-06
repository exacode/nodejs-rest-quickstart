'use strict';

var bunyan = require('bunyan');
var config = require('./config');

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

exports.create = function(name) {
	return bunyan.createLogger({
		name: name,
		streams: generateStreams(),
		serializers: {
			err: bunyan.stdSerializers.err,
			req: bunyan.stdSerializers.req,
			res: bunyan.stdSerializers.res
		}
	});
};

function generateStreams() {
	var projectDir = __dirname + '/../../';
	var streams = [];
	config.logger.streams.forEach(function(streamConf) {
		switch (streamConf.type) {
			case "file":
				streams.push(generateFileStream(streamConf, projectDir));
			break;
			case "rotating-file":
				streams.push(generateRotatingFileStream(streamConf, projectDir));
			break;
			default: // case "console":
				streams.push(generateConsoleStream(streamConf));
			break;
		}
	});
	return streams;
}

function generateFileStream(config, projectDir) {
	return {
		type: 'file',
		path: (config.path || './app.log').replace(/^\.\//, projectDir),
		level: config.level || 'trace'
	};
}

function generateRotatingFileStream(config, projectDir) {
	return {
		type: 'rotating-file',
		path: (config.path || './app.log').replace(/^\.\//, projectDir),
		period: config.period || '1d',	// daily rotation
		count: config.count || 3,		// keep 3 back copies
		level: config.level || 'trace'
	};
}

function generateConsoleStream(config) {
	var PrettyStream = require('bunyan-prettystream');
	var prettyStdOut = new PrettyStream({
		mode: config.colors || 'short',
		useColor: config.colors || true
	});
	prettyStdOut.pipe(process.stdout);
	return {
		type: 'raw',
		stream: prettyStdOut,
		level: config.level || 'trace'
	};
}