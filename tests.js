var assert = require('assert');

var env = 'test';

var lij = require('./lijsp');

describe('lijsp', function(){

    before(function(done){
	done();
    });

    after(function(done){
	// ?
	done();
    });

//---------------------------------------------------------------------------


//---------------------------------------------------------------------------
    describe('verify', function(){
	it('checks the scripts are evaluated correctly', function(done){

	    var items = [
		true,
		0,
		'blah',
		function(){},
		/blah/,
		new Date,

		[],
		[2015, 5, 16, 17, 28, 30],
		['date', 2015,5,16,17,28,30],
		['+', 1, 2, 3, 4],
		['+', 1, ['+', 2, 3, 4, 5], 3, 4],
		['-', 1, 2, 3, 4],
		[{sum:'+', diff:'-'}, 50, 13, 25, 22],

		["'", 'blah', 'hmm'],
		["'", ['blah', 'hmm']]
	    ];

	    items.forEach(function(i){
		console.log(i, lij.sp(i));
	    });

	    setTimeout(function(){
		done();
	    }, 500);

	});
    });

});
