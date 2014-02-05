'use strict';
var logger = require('../../modules/logger').create('Api_v1');

exports.setup = function(prefix, app) {
	app.get(prefix + '/hello', sayHello);
};

function sayHello(req, res) {
	logger.info('Saying hello in version 1');
	res.send("Hi there - version 1");
}