// refactor otype is array into eqp

// doc that functions are saved as ['function', [params list], [operations]]

var lij = {};

lij.cx = {}; // here put built-in library, load libraries to extend it with

lij.sp = function(list, pcx){

    cx = Object.create(pcx||lij.cx);

    var otype = Object.prototype.toString.call;

    if((otype(list) !== '[object Array]')&&(otype(list) !== '[object Object]')) return list;
    else{
	if((otype(list) === '[object Array]')&&(!list.length)) return null;
	else if(otype(list[0]) === '[object Array]'){
	    return lij.sp([lij.sp(list[0], cx)].concat(list.slice(1)), cx);

	}else if(otype(list[0]) === '[object Object]'){
	    return Object.keys(list[0]).reduce(function(obj, key){
		obj[key] = lij.sp([list[0][key]].concat(list.slice(1)), cx);
		return obj;
	    }, {});

	}else if(otype(list[0]) === '[object Function]'){
	    // lij.sp( [fn, ...spdRest], nucx )

		// check the function's signature is (params, cx, pcx)
	        // or (whatever it is) for a macro

	}else if(otype(list[0]) === '[object String]'){

	    // check macros, run the macro on the rest of the list

	    if((typeof cx[list[0]] === 'function')||
	       ((otype(cx[list[0]]) === '[object Array]')&&(cx[list[0]][0] === 'function'))){
		// check the function's signature is (params, cx, pcx)
		
		// loop through list.slice(1.. n), lij.sp all of them in cx

		// call that mafk
	    }

	}else{
	    // the first thing isn't sp able -- perhaps there could be plugins that handle these?
	    // ie: promise, observable, ng-component, regex, generator/iterable
	    return list;
	}
    }
};
