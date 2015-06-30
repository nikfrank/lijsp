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
		["'", ['blah', 'hmm']],

		// defun, degfun, setfun, setgfun

		['setgfun', 'reverse', function(pms, cx, pcx){
		    return pms[0].split('').reverse().join('');
		}],

		['reverse', 'blah'],

		[['setfun', 'caps', function(pms, cx, pcx){
		    return pms[0].toUpperCase();
		}], 'blah'],

		['caps', 'hmm'],

		[function(pms, cx, pcx){
		    return pms[0].toUpperCase();
		}, 'now'],

		['get', 'reverse'],

		['map', 'reverse', ['\'', 'blah', 'hmm', 'now']],


		['map', function(pms, cx, pcx){
		    return pms[0].toUpperCase();
		}, ['\'', 'blah', 'hmm', 'now']],

		['set', 'greeting', 'rawr'],
		['get', 'greeting'],

		['setg', 'greeting', 'rawr'],
		['get', 'greeting'],

		[['fn', 'echo', ['txt'],
		 ['set', 't', 'txt'],
		 ['get', 't']
		], 'rawrr'],

		['degfun', 'echo', ['txt'],
		 ['set', 't', 'txt'],
		 ['get', 't']
		], 
		['echo', 'rAawrr']
	    ];

	    var superCurry = [[[[[[['func','v0'],'v1'],'v2'],'v3'],'v4'],'v5'],'v6'];
	    // isn't that beautiful!

	    // church numbers as the functional interpretation of
	    var church = [3, 'f', '... params'];
	    // would apply f(f(f(...params)))

	    // differentiate between 'blah' and (new String('blah')) ?
	    var strs = ['v1function', 'v2whatever', (new String('s1'))];

	    var objStr = (new String('blah'));
	    (typeof objStr); // object
	    Object.prototype.toString.call(objStr); // [object String]

	    var str = 'blah';
	    (typeof str); // string
	    Object.prototype.toString.call(str); // [object String]


	    items.forEach(function(i){
		console.log(i, lij.sp(i));
	    });

	    setTimeout(function(){
		done();
	    }, 500);

	});
    });

});
