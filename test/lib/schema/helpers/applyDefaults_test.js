'use strict';

const Lab = require('@hapi/lab');
const should = require('should/as-function');

const applyDefaults = require('../../../../lib/schema/helpers/applyDefaults');

const lab = exports.lab = Lab.script();

lab.experiment('/lib/schema/helpers/applyDefaults', () => {

    lab.test('Should apply defaults', () => {

        const defaults = ['foo', 'bar'];
        const actual = applyDefaults(defaults)([undefined,undefined]);
        const expected = ['foo', 'bar'];

        should(actual).deepEqual(expected);
    });

    lab.test('Should not apply defaults if none are passed', () => {

        const defaults = undefined;
        const actual = applyDefaults(defaults)(['baz', 'boo']);
        const expected = ['baz', 'boo'];

        should(actual).deepEqual(expected);
    });
});
