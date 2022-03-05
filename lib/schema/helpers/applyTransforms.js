'use strict';

const { flow, join, map, reduce, split, toLower } = require('lodash/fp');

/**
 * @function dateFromParts
 * @description Takes an array of keys, yyyy, mm, dd and returns a
 * corresponding Date object
 * @param {array.<Year: number, month: number, Day: number>}
 * @return {date}
 */
module.exports.dateFromParts = (dateParts) => [new Date(dateParts[0], dateParts[1] - 1, dateParts[2])];

/**
 * @function properCase
 * @description Function that takes a string and returns a
 * Proper Cased version of that string
 * @param {string} String to Propet Case
 * @return {function}
 */
module.exports.properCase = flow([
    toLower,
    split(' '),
    map((c) => c.substring(0,1).toUpperCase() + c.substring(1)),
    join(' '),
    (s) => [s]
]);

const transformMap = {
    'PASSTHRU': (pt) => pt,
    'PROPERCASE': module.exports.properCase,
    'DATEFROMPARTS': module.exports.dateFromParts
};

/**
 * @typeDef TransformType
 * @property {string} PASSTHRU
 * @property {string} PROPERCASE
 * @property {string} DATEFROMPARTS
 */

/**
 * @function applyTransforms
 * @description Returns a function to perform the requested Transformation(s)
 * @param {array.<TransformType>} [array] - Enum transformation to perform
 * @return {function}
 */

module.exports = (transforms) => {

    if (transforms) {
        const fTransforms = reduce((accum, val) => {

            return [...accum, transformMap[val]];
        }, [])(transforms);

        return flow(fTransforms);
    }

    return (pt) => pt;
};
