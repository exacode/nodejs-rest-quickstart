'use strict';

var logger = require('../lib/logger').create('App');

exports.resourceNotFoundErrorHandler = function (req, res) {
	res.send(404, 'Resource not found');
};

exports.serverErrorHandler = function(err, req, res, next) {
	if(!err) return next();
	logger.error({"err": err}, "Server error");
	res.send(500, "Server Error");
};