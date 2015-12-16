# algebra-ring

> defines an [algebra ring][1] structure

[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)

## Example

All code in the examples below is intended to be contained into a [single file](https://github.com/fibo/algebra-ring/blob/master/test.js).

```
var ring = require('algebra-ring')

// Define operators.
function contains (a) {
  // NaN, Infinity and -Infinity are not allowed
  return (typeof a === 'number' && isFinite(a))
}

function equality (a, b) { return a === b }

function addition (a, b) { return a + b }

function negation (a) { return -a }

function multiplication (a, b) { return a * b }

function inversion (a) { return 1 / a }

// Create a ring by defining its identities and operators.
var R = ring([0, 1], {
  equality: equality,
  contains: contains,
  addition: addition,
  negation: negation,
  multiplication: multiplication,
  inversion: inversion
})
```

You get an [algebra ring][1] that is an [algebra group][2] with *multiplication*.
Its inverse operator is *division*.

This is the list of ring operators:
* contains
* notContains
* equality
* disequality
* addition
* subtraction
* negation
* multiplication
* division
* inversion

The neutral element for addition and multiplication are, as usual, called *zero* and *one* respectively.

```
R.contains(10) // true
R.contains(-1, 0.5, Math.PI, 5) // true
R.notContains(Infinity) // true

R.addition(1, 2) // 3
R.addition(2, 3, 5, 7) // 17

R.equality(R.negation(2), -2) // true

R.subtraction(2, 3) // -1

R.multiplication(2, 5) // 10
R.multiplication(2, 2, 2, 2) // 16

R.equality(R.inversion(10), 0.1) // true

R.division(1, 2) // 0.5

R.equality(R.addition(2, R.zero), 2) // true
R.equality(R.subtraction(2, 2), R.zero) // true

R.equality(R.multiplication(2, R.one), 2) // true
R.equality(R.division(2, 2), R.one) // true
```

  [1]: https://en.wikipedia.org/wiki/Ring_(mathematics) "Ring"
  [2]: https://www.npmjs.com/package/algebra-group "algebra-group"

