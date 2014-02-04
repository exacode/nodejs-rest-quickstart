/* global module, require */
'use strict';

module.exports = function (grunt) {
	// show elapsed time at the end
	require('time-grunt')(grunt);
	// load all grunt tasks
	require('load-grunt-tasks')(grunt);
	// configurable paths
	var paths = {
		app: 'app',			// points to main source directory
		test: 'test',		// points to test source directory
		tmp: 'tmp'			// points to tmp directory that keeps logs and build reports	
	};

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		// chekstyle for js
		jshint: {
			options: {
				jshintrc: '.jshintrc',				// file with checkstyle rules
				reporter: require('jshint-stylish')	// nicer output for jshint
			},
			all: [paths.app + '/**/*.js']
		},
		// test js code
		mochaTest: {
			test: {
				options: {
					reporter: 'spec',
					require: paths.test + '/blanket'
				},
				src: [paths.test + '/**/*.js']
			},
			coverage: {
				options: {
					reporter: 'html-cov',
					quiet: true,
					captureFile: paths.tmp + '/coverage.html'
				},
				src: [paths.test +  '/**/*.js']
			}
		},
		// watch changes in js files and validate them
		watch: {
			js: {
				files: [
					paths.app + '/**/*.js',
					paths.test + '/**/*.js'
				],
				tasks: ['test']
			}
		},
		// remove temporary directories
		clean: {
			tmp: [paths.tmp],
		},
		// create temporary directories
		mkdir: {
			tmp: {
				options: {
					create: [ paths.tmp ]
				}
			}
		}
	});
	// Log updated files from 'watch' events
	grunt.event.on('watch', function(action, filepath, target) {
		grunt.log.writeln(target + ': ' + filepath + ' has ' + action);
	});

	// Reporting
	grunt.registerTask('report', [
		'jshint',				// check code quality
		'mochaTest:coverage'	// check test coverage
	]);

	// Testing
	grunt.registerTask('test', [
		'mochaTest:test'		// BDD tests with jasmine 
	]);

	// Development
	grunt.registerTask('develop', [
		'watch'					// watch for changes in js files in order to run tests
	]);

	// Default task
	grunt.registerTask('default', [
		'clean',				// cleans temporary directories
		'mkdir',				// creates directory structure if missin
		'test',					// run tests
		'report'				// generate reports
	]);

};