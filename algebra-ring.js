const group = require('algebra-group')
const staticProps = require('static-props')

const pkg = require('./package.json')

/**
 * Prepend package name to error message
 */

function msg (str) {
  return pkg.name + ': ' + str
}

const error = {
  cannotDivideByZero: msg('Cannot divide by zero'),
  doesNotContainIdentity: msg('"identity" must be contained in ring set'),
  identityIsNotNeutral: msg('"identity" is not neutral')
}

/**
 * Define an algebra ring structure
 *
 * @param {Array} identities
 * @param {*}     identities[0] a.k.a zero
 * @param {*}     identities[1] a.k.a uno
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

function algebraRing (identities, given) {
  // A ring is a group, with multiplication.

  const ring = group({
    identity: identities[0],
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
      throw new TypeError(error.cannotDivideByZero)
    }

    return given.inversion(a)
  }

  function division (a) {
    const rest = [].slice.call(arguments, 1)

    return given.multiplication(a, rest.map(inversion).reduce(given.multiplication))
  }

  ring.multiplication = multiplication
  ring.inversion = inversion
  ring.division = division

  // Multiplicative identity.

  const one = identities[1]

  if (ring.notContains(one)) {
    throw new TypeError(error.doesNotContainIdentity)
  }

  // Check that one*one=one.
  if (ring.disequality(given.multiplication(one, one), one)) {
    throw new TypeError(error.identityIsNotNeutral)
  }

  if (ring.notContains(identities[1])) {
    throw new TypeError(error.doesNotContainIdentity)
  }

  ring.one = identities[1]

  return ring
}

staticProps(algebraRing)({error: error})

module.exports = algebraRing
