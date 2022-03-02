/**
 * @function buildPairs
 * @description Returns a function that will build an Array pair based on
 * passed in key
 * @param {string} field Field to use in pair
 * @return {buildPairsInner}
 */

/**
 * @function buildPairsInner
 * @description builds name value array pairs
 * @param {any} val Value to be returned from the Key Value Pair
 * @return {array.<string: key, string: value>}
 */
module.exports = (field) => (val) => [field, val];
