// refactor otype is array into eqp

// doc that functions are saved as ['function', [params list], [operations]]

var lij = {};

// here put built-in library, load libraries to extend it with
lij.cx = {
    defun:function(pms, cx, pcx){
	// put a lijsp fn ['progn', pms] onto the pcx
    },
    degfun:function(pms, cx, pcx){
	// put a lijsp fn ['progn', pms] onto the lij.cx
    },

    setfun:function(pms, cx, pcx){
	// put a js function into the pcx
	return pcx[pms[0]] = pms[1];
    },
    setgfun:function(pms, cx, pcx){
	// put a js function into the lij.cx
	return lij.cx[pms[0]] = pms[1];
    },

    defmacro:function(pms, cx, pcx){
	// put a lijsp macro onto the pcx
    },
    defgmacro:function(pms, cx, pcx){
	// put a lijsp macro onto the lij.cx
    },

    setmacro:function(pms, cx, pcx){
	// put a js macro (fn) into the pcx
	return pcx[pms[0]] = pms[1];
    },
    setgmacro:function(pms, cx, pcx){
	// put a js macro (fn) into the lij.cx
	return lij.cx[pms[0]] = pms[1];
    },

    '\'':function(pms, cx, pcx){
	return pms;
    },

    '+':function(pms, cx, pcx){return pms.reduce(function(p,c){return p+c;}, 0);},
    '*':function(pms, cx, pcx){return pms.reduce(function(p,c){return p*c;}, 0);},
    '-':function(pms, cx, pcx){return pms.slice(1).reduce(function(p,c){return p-c;}, pms[0]);},
    '/':function(pms, cx, pcx){return pms.slice(1).reduce(function(p,c){return p/c;}, pms[0]);},
    '%':function(pms, cx, pcx){return pms.slice(1).reduce(function(p,c){return p%c;}, pms[0]);},

    date:function(pms, cx, pcx){
	switch(pms.length){
	case 0: return new Date; break;
	case 1: return new Date(pms[0]); break;
	default: return new Date(pms[0],pms[1]||0,pms[2]||0,pms[3]||0,pms[4]||0,pms[5]||0,pms[6]||0);
	}
    }
};

lij.sp = function(list, pcx, caller){

    var cx = Object.create(this.pcx||pcx||lij.cx);

    caller = caller||this.caller;

    var otype = function(e){return Object.prototype.toString.call(e);};

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

	    if(plist[0] === 'pms'){// function call
		return list[0](list.slice(1).map(lij.sp.bind({pcx:cx, caller:list[0]})), cx, pcx);

	    }else if(plist[0].indexOf('cdr')>-1){// macro
		if((plist[0] === 'pcdr')||((caller||'').slice(-2)==='()')){// run macro
		    return lij.sp(list[0](list.slice(1), cx, pcx), cx, list[0]);
		}else return list[0](list.slice(1), cx, pcx);
	    }

	}else if(otype(list[0]) === '[object String]'){
	    return (typeof cx[list[0].split('(')[0]] === 'function')?
		lij.sp([cx[list[0]]].concat(list.slice(1)), cx, list[0]):
		[list[0]].concat(list.slice(1).map(lij.sp.bind({pcx:cx, caller:list[0]})));

	}else{
	    // the first thing isn't sp able -- perhaps there could be plugins that handle these?
	    // ie: promise, observable, ng-component, regex, generator/iterable
	    return list;
	}
    }
};

if(module) module.exports = lij;
