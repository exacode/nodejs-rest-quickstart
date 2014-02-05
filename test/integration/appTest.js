'use strict';

var request = require('./common').request;

describe('Application', function(){

	it('should contain description of API versions', function(done) {
		request
			.get('/versions')
			.expect(200)
			.expect(hasPreReleaseVersionDescription)
			.end(done);
	});

	function hasPreReleaseVersionDescription(res) {
		res.body.v0.should.equal('Pre-release');
	}
});