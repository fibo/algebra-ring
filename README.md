# algebra-ring

> define an [algebra ring][1] structure

```
var algebraGroup = require('algebra-group'),
    algebraRing  = require('algebra-ring')

function contains (a) {
  // NaN, Infinity and -Infinity are not allowed
  return (typeof a === 'number' && isFinite(a))
}

function equality (a, b) { return a === b }

function addition (a, b) { return a + b }

function negation (a) { return -a }

var realGroup = algebraGroup(contains, 0, equality, addition, negation)

function multiplication (a, b) { return a * b }

function inversion (a) { return 1 / a }

var R = algebraRing(realGroup, 1, multiplication, inversion)

R.equality(R.division(2, 2), R.one)
```

  [1]: https://en.wikipedia.org/wiki/Ring_(mathematics) "Ring"

