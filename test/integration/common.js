'use strict';

var request = require('supertest');
var app = require('../../app/app').app;

exports.request = request(app);