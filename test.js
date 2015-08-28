
var algebraGroup = require('algebra-group'),
    algebraRing  = require('./index'),
    test         = require('tape')

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

test('example', function (t) {
  t.plan(1)                                                                                                                                                      

  t.ok(R.equality(R.division(2, 2), R.one))
})  

