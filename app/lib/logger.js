'use strict';

var bunyan = require('bunyan');
var config = require('./config');
var fs = require('fs');
var path = require('path');

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
	var filePath = (config.path || './app.log').replace(/^\.\//, projectDir);
	createDirWithParents(path.dirname(filePath));
	return {
		type: 'file',
		path: filePath,
		level: config.level || 'trace'
	};
}

function generateRotatingFileStream(config, projectDir) {
	var filePath = (config.path || './app.log').replace(/^\.\//, projectDir);
	createDirWithParents(path.dirname(filePath));
	return {
		type: 'rotating-file',
		path: filePath,
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

function createDirWithParents(dirname) {
	if (fs.existsSync(dirname)) {
		return;
	}
	var parent = path.dirname(dirname);
	if (!fs.existsSync(parent)) {
		createDirWithParents(parent);
	}
	if (!fs.existsSync(dirname)) {
		fs.mkdirSync(dirname);
	}
}