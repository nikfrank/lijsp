var lij = {};

lij.sp = function(list, context){
    // use this to process query lists into batch calls or whatever
    // which can be executed parallel if you want (which is a jsql function)

    // there are no pointer types in lisp.

    
    // list of default functions needed
    // set, setq


    // list of built in macros needed
    // defun


    // if is a macro def?


    // if not a list
    // if a string, return the context value ||| string literal
    // otherwise, return the literal

    // loop through the list

    // if the first item isn't a string, return the list (non-string literals are data)
    
    // else, lookup the string in the function context. if not found, throw an error
    // we'll likely have options from the functions table
    // look at the params (process any which are arrays) to determine which function to call

    // if the fn is native, call it with the param values
    // if the fn is written in jsl, run the defun macro on it, then jsl.process
    
};
