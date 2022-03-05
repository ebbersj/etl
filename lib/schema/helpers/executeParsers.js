'use strict';

/**
 * @function executeParsersInner
 * @description Applies parsers to passed in
 * @param {object} record Record to be processed
 * @return {array} array of results
 */

/**
 * @function executeParsers
 * @description Takes an array of parsers to execute and returns a wired up function
 * @param {array.<function>}
 * @return {executeParsersInner}
 */
module.exports = function (schemaParsers) {

    return (record) => {

        const out = [];
        for (let i = 0; i < schemaParsers.length; i++) {
            out.push(schemaParsers[i](record));
        }

        return out;
    };
};
