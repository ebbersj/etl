'use strict';

const Lab = require('@hapi/lab');
const should = require('should/as-function');
const sinon = require('sinon');

const executeParsers = require('../../../../lib/schema/helpers/executeParsers');

const lab = exports.lab = Lab.script();

lab.experiment('/lib/schema/helpers/executeParsers', () => {

    lab.test('Should call each function in the array with the record', () => {

        const f1 = sinon.stub().returns(1);
        const f2 = sinon.stub().returns(2);
        const data = { 'foo': 'bar' };

        const actual = executeParsers([f1, f2])(data);
        should(actual).deepEqual([1, 2]);
        should(f1.calledWith(data)).be.true;
        should(f2.calledWith(data)).be.true;
    });
});
