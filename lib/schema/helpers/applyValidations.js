const { reduce } = require('lodash/fp').convert({ 'cap': false });
const productIdRegex = /^([a-zA-Z0-9\-\ ]+)$/

class ValidationException extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationException";
  }
}

/**
 * @defType ValidationTypes
 * @property {string} PRODUCTID
 */

/**
 * @function buildValidation
 * @description Takes a Validation Type Enum and Returns the corrects
 * Validation function or a Passthru
 * @param {ValidationTypes}
 * @throws {ValidationException}
 */
const buildValidation = (validationEnum) => {
  if (validationEnum == "PRODUCTID") {
    return (str) => {
      if (productIdRegex.test(str) == true) {
        return str;
      } else {
        throw new validationException(`Invalid ${validationEnum}: "${str}"`);
      }
    }
  }
  return (f) => f;
}

module.exports = (validation) => {
  if (validation) {
      return reduce((accum, val, index) => {
        return [...accum, buildValidation(validation)(val)];
      }, []);
  }
  return (pt) => pt;
}
