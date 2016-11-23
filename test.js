const ring = require('algebra-ring')
const test = require('tape')

const error = ring.error

function contains (a) {
  return (typeof a === 'number' && isFinite(a))
}

function equality (a, b) { return a === b }

function addition (a, b) { return a + b }

function negation (a) { return -a }

function multiplication (a, b) { return a * b }

function inversion (a) { return 1 / a }

const R = ring([0, 1], {
  equality: equality,
  contains: contains,
  addition: addition,
  negation: negation,
  multiplication: multiplication,
  inversion: inversion
})

test('Real ring', function (t) {
  t.plan(17)

  t.ok(R.contains(10))
  t.ok(R.contains(-1, 0.5, 5))
  t.ok(R.notContains(Infinity))

  t.equal(R.addition(1, 2), 3)
  t.equal(R.addition(2, 3, 5, 7), 17)

  t.ok(R.equality(R.negation(2), -2))

  t.equal(R.subtraction(2, 3), -1)

  t.equal(R.multiplication(2, 5), 10)
  t.equal(R.multiplication(2, 2, 2, 2), 16)

  t.ok(R.equality(R.inversion(10), 0.1))

  t.equal(R.division(1, 2), 0.5)

  t.ok(R.equality(R.addition(2, R.zero), 2))
  t.ok(R.equality(R.subtraction(2, 2), R.zero))

  t.ok(R.equality(R.multiplication(2, R.one), 2))
  t.ok(R.equality(R.division(2, 2), R.one))

  t.throws(function () {
    R.division(1, 0)
  }, new RegExp(error.cannotDivideByZero))

  t.throws(function () {
    R.inversion(R.zero)
  }, new RegExp(error.cannotDivideByZero))
})
