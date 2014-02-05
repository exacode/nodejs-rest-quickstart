'use strict';
var logger = require('../../modules/logger').create('Api_v0');

exports.setup = function(prefix, app) {
	app.get(prefix + '/hello', sayHello);
	app.get(prefix + '/error', showError);
};

function sayHello(req, res){
	logger.info('Saying hello - version 0');
	res.send(200, "Hi there - version 0");
}

function showError(){
	throw new Error('who will catch me?');
}