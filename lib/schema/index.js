'use strict';

const fs = require('fs');
const { at, flow, fromPairs, head, reduce, tap } = require('lodash/fp');
const { applyDefaults, applyTransforms, applyValidations, buildPairs, buildType, executeParsers } = require('./helpers');

module.exports.getParser = (schemaName) => {
  let configFile = fs.readFileSync(`lib/ingestionConfig/${schemaName}.json`);
  let fields = JSON.parse(configFile).schema.fields;

  const parsers = reduce((accum, val) => {
    accum.push(flow([
      at(val.source), //Get Data
      applyDefaults(val.default), // apply defaults
      applyValidations(val.validation), // Apply Validation
      applyTransforms(val.transforms),// Apply Transforms
      head,
      buildType(val.type),// Enforce Type
      buildPairs(val.target), // Set Target
    ]));
    return accum;
  }, [])(fields);

  return flow([
    executeParsers(parsers),
    fromPairs,
    JSON.stringify,
    (s) => s + '\n'
  ]);
}
