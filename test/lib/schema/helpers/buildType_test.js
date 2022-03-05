'use strict';

const Lab = require('@hapi/lab');
const should = require('should/as-function');

const buildType = require('../../../../lib/schema/helpers/buildType');

const lab = exports.lab = Lab.script();

lab.experiment('/lib/schema/helpers/buildTypes', () => {

    lab.test('String should cast String', () => {

        should.strictEqual(buildType('STRING')(12345), '12345');
    });

    lab.test('Float should cast a Float', () => {

        should.strictEqual(buildType('FLOAT')('123.456'), 123.456);
    });

    lab.test('Integer should cast an Integer', () => {

        should.strictEqual(buildType('INTEGER')('987'), 987);
    });

    lab.test('No type should passthru', () => {

        should.strictEqual(buildType(undefined)('foo'), 'foo');
    });
});
