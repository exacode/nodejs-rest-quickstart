'use strict';

var should = require('chai').should();
var Calculator = require('../../app/lib/calculator.js').Calculator;

describe('Calculator',function(){

	it('should return 3 when adding 1 and 2', function() {
		var calc = new Calculator();
		calc.add(1, 2).should.equal(3);
	});

});