
/**
 * Define an algebra ring structure
 *
 * @param {Object} group
 * @param {*} identity a.k.a one
 * @param {Function} multiplication
 * @param {Function} inversion
 *
 * @returns {Object} ring
 */

function algebraRing (group, identity, multiplication, _inversion) {
  var ring = {}

  // operators

  ring.contains    = group.contains
  ring.notContains = group.notContains
  ring.addition    = group.addition
  ring.negation    = group.negation
  ring.subtraction = group.subtraction
  ring.equality    = group.equality
  ring.disequality = group.disequality

  if (typeof multiplication !== 'function')
    throw new TypeError('"multiplication" operator must be a function')

  if (typeof _inversion !== 'function')
    throw new TypeError('"inversion" operator must be a function')

  function inversion (a) {
    if (ring.equality(a, group.zero))
      throw new TypeError('Cannot divide by zero.')

    return _inversion(a)
  }

  function division (a, b) {
    return multiplication(a, inversion(b))
  }

  ring.multiplication = multiplication
  ring.inversion      = inversion
  ring.division       = division

  // identities

  ring.zero = group.zero

  if (ring.notContains(identity))
    throw new TypeError('"identity" must be contained in ring set')

  ring.one = identity 

  return ring
}

module.exports = algebraRing

