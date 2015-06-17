// refactor otype is array into eqp

// doc that functions are saved as ['function', [params list], [operations]]

var lij = {};

// here put built-in library, load libraries to extend it with
lij.cx = {};

lij.sp = function(list, pcx, caller){

    cx = Object.create(pcx||this.pcx||lij.cx);
    caller = caller||this.caller;

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
	    var plist = list[0].toString().split(')')[0].slice(10).split(',');

	    if(plist.length === 3){// function call
		return list[0](list.slice(1).map(lij.sp.bind({pcx:cx, caller:list[0]})), cx, pcx);

	    }else if(plist.length === 2){// macro call
//		if(caller.noRunMacro) // caller property run macro?
//		    return list[0](list.slice(1));
//		else
		    return lij.sp(list[0](list.slice(1)), cx, list[0]);
	    }

	}else if(otype(list[0]) === '[object String]'){

	    return (typeof cx[list[0]].type === 'function')?
		lij.sp([cx[list[0]]].concat(list.slice(1)), pcx):
		[list[0]].concat(list.slice(1).map(lij.sp.bind({pcx:cx, caller:list[0]})));

	}else{
	    // the first thing isn't sp able -- perhaps there could be plugins that handle these?
	    // ie: promise, observable, ng-component, regex, generator/iterable
	    return list;
	}
    }
};
