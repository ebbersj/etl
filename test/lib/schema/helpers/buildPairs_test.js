'use strict';

const Lab = require('@hapi/lab');
const should = require('should/as-function');

const buildPairs = require('../../../../lib/schema/helpers/buildPairs');

const lab = exports.lab = Lab.script();

lab.experiment('/lib/schema/helpers/buildPairs', () => {

    lab.test('Should return a key, value array', () => {

        should(buildPairs('foo')('bar')).deepEqual(['foo', 'bar']);
    });
});
