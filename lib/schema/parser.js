'use strict';

const fs = require('fs');
const { at, flow, fromPairs, head, reduce } = require('lodash/fp');
const helpers = require('./helpers');

/**
 * @function getParser
 * @description Take a schemaName to load. Loads that schema and returns a parser function
 * @param {string} schemaName - The name of the schema to load (omit extension). Loads from lib/ingestionConfig
 * @return {Function}
 */
module.exports.getParser = (schemaName) => {

    const configFile = fs.readFileSync(`lib/ingestionConfig/${schemaName}.json`);
    const fields = JSON.parse(configFile).schema.fields;

    const parsers = reduce((accum, val) => {

        accum.push(flow([
            at(val.source), //Get Data
            helpers.applyDefaults(val.default), // apply defaults
            helpers.applyValidations(val.validation), // Apply Validation
            helpers.applyTransforms(val.transforms),// Apply Transforms
            head,
            helpers.buildType(val.type),// Enforce Type
            helpers.buildPairs(val.target) // Set Target
        ]));

        return accum;
    }, [])(fields);

    return flow([
        helpers.executeParsers(parsers),
        fromPairs,
        JSON.stringify,
        (s) => s + '\n'
    ]);
};
