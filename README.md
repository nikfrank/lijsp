lisjp javascript lisp dialect

quirky like js

expressive like lisp

---

use this to process query lists into batch calls or whatever
which can be executed parallel if you want (which is a jsql function)

there are no pointer types in lisp.


list of default functions needed
set, setq, retString


list of built in macros needed
defun


if is a macro def?


if not a list
if a string, return the context value ||| string literal
otherwise, return the literal

loop through the list

if the first item isn't a string function or object, return the list (non-string literals are data)

if it's a function, call it with (rest, context)
else, resolve the string in the function context. if not found, throw an error

what to do about non-function objects as first members?
--> for .. in loop them as first values?
	    // sp the rest of the list for each k:v pair
	    // return the object withe returns in place

we'll likely have options from the functions table
look at the params (process any which are arrays) to determine which function to call

if the fn is native, call it with the param values
if the fn is written in jsl, run the defun macro on it, then jsl.process