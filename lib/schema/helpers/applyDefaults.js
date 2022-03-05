'use strict';

const { getOr, reduce } = require('lodash/fp').convert({ 'cap': false });

/**
 * @function applyDefaults
 * @description Applies default values if passed in. Applied in order in which they are passed in
 * @param {array}
 * @return Function
 */
module.exports = (defaults) => {

    if (defaults) {
        const funcs = reduce((accum, val, index) => {

            return [...accum, getOr(val, `${index}`)];
        }, [])(defaults);
        return reduce((accum, val, index) => {

            return [...accum, funcs[index](val)];
        }, []);
    }

    return (pt) => pt;
};
