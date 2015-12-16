var group = require('algebra-group')

/**
 * Define an algebra ring structure
 *
 * @param {Array} identity
 * @param {*}     identity[0] a.k.a zero
 * @param {*}     identity[1] a.k.a uno
 * @param {Object}   given operator functions
 * @param {Function} given.contains
 * @param {Function} given.equality
 * @param {Function} given.addition
 * @param {Function} given.negation
 * @param {Function} given.multiplication
 * @param {Function} given.inversion
 *
 * @returns {Object} ring
 */

function algebraRing (identity, given) {
  // A ring is a group, with multiplication.

  var ring = group({
    identity: identity[0],
    contains: given.contains,
    equality: given.equality,
    compositionLaw: given.addition,
    inversion: given.negation
  })

  // operators

  function multiplication () {
    return [].slice.call(arguments).reduce(given.multiplication)
  }

  function inversion (a) {
    if (ring.equality(a, ring.zero)) {
      throw new TypeError('algebra-ring: Cannot divide by zero.')
    }

    return given.inversion(a)
  }

  function division (a) {
    var rest = [].slice.call(arguments, 1)

    return given.multiplication(a, rest.map(given.inversion).reduce(given.multiplication))
  }

  ring.multiplication = multiplication
  ring.inversion = inversion
  ring.division = division

  // Multiplicative identity.

  var one = identity[1]

  if (ring.notContains(one)) {
    throw new TypeError('algebra-ring: "identity" must be contained in ring set')
  }

  // Check that one*one=one.
  if (ring.disequality(given.multiplication(one, one), one)) {
    throw new TypeError('algebra-ring: "identity" is not neutral')
  }

  if (ring.notContains(identity[1])) {
    throw new TypeError('algebra-ring:"identity" must be contained in ring set')
  }

  ring.one = identity[1]

  return ring
}

module.exports = algebraRing
