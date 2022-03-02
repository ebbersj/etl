const { flow, parseInt, replace, toString } = require('lodash/fp');
const nonFloatRegex = /[^0-9\.]/gm

/**
 * @function pFloat
 * @description Takes a float like string, returns a function that removes non float characters
 * and returns the value as  float
 * @param {string} String to convert into a float
 * @return {function}
 *
 */
const pFloat = flow([
  replace(nonFloatRegex, ''),
  Number.parseFloat
]);

const typeMap = {
  'INTEGER': parseInt(0),
  'FLOAT': pFloat,
  'STRING': toString
};

/**
 * @typeDef DataType
 * @property {string} INTEGER
 * @property {string} FLOAT
 * @property {string} STRING
 */

/**
 * @function buildType
 * @description Takes an enumerted DataType and returns a function that converts a
 * string to that DataType, default retuns Passthru
 * @param {DataType} [DataType] - Optional Data Type
 * @return {function}
 */
module.exports = (type) => (type) ? typeMap[type] : (pt) => pt;
