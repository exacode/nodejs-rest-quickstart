'use strict';
var logger = require('../../lib/logger').create('Api_v1');

var app = require('express')();

module.exports = app;

app.get('/hello', sayHello);

function sayHello(req, res) {
	logger.info('Saying hello in version 1');
	res.send("Hi there - version 1");
}