// defining environment: NODE_ENV=production node app.js
'use strict';

var _ = require('lodash');
var config = require('./config-default.json');

var env = process.env.NODE_ENV || 'development';
var configEnv = require('./config-' + env + '.json');
config = _.merge(config, configEnv);

module.exports = config;