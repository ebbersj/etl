'use strict';

const { reduce } = require('lodash/fp').convert({ 'cap': false });

const productIdRegex = /^([a-zA-Z0-9\-\ ]+)$/;

class ValidationException extends Error {

    constructor(message) {

        super(message);
        this.name = 'ValidationException';
    }
}

/**
 * @defType ValidationTypes
 * @property {string} PRODUCTID
 */

/**
 * @function buildValidation
 * @description Takes a Validation Type Enum and Returns the corrects
 * Validation function. Currently only PRODUCTID
 * @param {ValidationTypes} [ValidationTypes]
 * @throws {ValidationException|Error}
 */
const buildValidation = (validationEnum) => {

    if (validationEnum === 'PRODUCTID') {
        return (str) => {

            if (productIdRegex.test(str) === true) {
                return str;
            }

            throw new ValidationException(`Invalid ${validationEnum}: "${str}"`);
        };
    }

    // This isn't ideal, we should be validating configs up stream, but this quicker to code
    throw new Error(`Unknown Validation: "${validationEnum}"`);
};

module.exports = (validation) => {

    if (validation) {
        return reduce((accum, val, index) => {

            return [...accum, buildValidation(validation)(val)];
        }, []);
    }

    return (pt) => pt;
};
