// this already needs to be refactored for async?
// or could async (promises) be integrated with a dialect?

var lij = {};

lij.sp = function(list, cx){

    context = context||{};

    var otype = Object.prototype.toString.call;

    if((otype(list) !== '[object Array]')&&(otype(list) !== '[object Object]')) return list; // literals
    else{
	if((otype(list) !== '[object Array]')&&(!list.length)) return null;
	else if(otype(list[0]) === '[object Array]'){
	    // sp the array, then start over
	    return lij.sp([lij.sp(list[0], cx)].concat(list.slice(1)), cx);

	}else if(otype(list[0]) === '[object Object]'){
	    // sp the rest of the list for each k:v pair
	    // return the object withe returns in place
	    return Object.keys(list[0]).reduce(function(obj, key){
		obj[key] = lij.sp([list[0][key]].concat(list.slice(1)), cx);
		return obj;
	    }, {});

	}else if(otype(list[0]) === '[object String]'){

	    // check macros, run the macro on the rest of the list


	    // lookup a function from this string

	    // loop through list.slice(1), lij.sp all of them in cx

	    // set nucx with prototype of cx to pass to this function

	    // lij.sp( [fn, ...spdRest], nucx )


	}else{
	    // the first thing isn't sp able -- perhaps there could be plugins that handle these?
	    // ie: promise, observable, ng-component, regex, generator/iterable
	    return list;
	}
    }
};
