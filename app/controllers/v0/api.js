'use strict';
var logger = require('../../lib/logger').create('Api_v0');

var app = require('express')();

module.exports = app;

app.get('/hello', sayHello);
app.get('/error', showError);

function sayHello(req, res) {
	logger.info('Saying hello - version 0');
	res.status(200).format({
		html: function(){
			res.send('<strong>Hi there</strong> - version 0');
		},
		text: function(){
			res.send('Hi there  - version 0');
		},
		json: function(){
			res.json({ msg: "Hi there  - version 0"});
		}
	});
}

function showError(){
	throw new Error('who will catch me?');
}