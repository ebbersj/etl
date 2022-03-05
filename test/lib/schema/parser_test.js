'use strict';

const fs = require('fs');
const Lab = require('@hapi/lab');
const should = require('should/as-function');
const sandbox = require('sinon').createSandbox();
const { getParser } = require('../../../lib/schema/parser');
const helpers = require('../../../lib/schema/helpers/index');

const lab = exports.lab = Lab.script();

lab.experiment('/lib/schema/parser', () => {

    let applyDefaultsStub;
    let applyTransformsStub;
    let applyValidationsStub;
    let buildPairsStub;
    let buildTypeStub;
    let readFileSyncResult;
    let readFileSyncStub;

    lab.beforeEach(() => {

        applyDefaultsStub = sandbox.stub(helpers, 'applyDefaults').returns(() => ['applyDefaults']);
        applyTransformsStub = sandbox.stub(helpers, 'applyTransforms').returns(() => ['applyTransforms']);
        applyValidationsStub = sandbox.stub(helpers, 'applyValidations').returns(() => ['applyValidations']);
        buildPairsStub = sandbox.stub(helpers, 'buildPairs').returns(() => ['build', 'pairs']);
        buildTypeStub = sandbox.stub(helpers, 'buildType').returns(() => ['buildType']);
        readFileSyncResult = JSON.stringify({
            'schema': {
                'fields': [
                    {
                        'source': ['foo'],
                        'default': 'def',
                        'validation': 'valid',
                        'transforms': 'tforms',
                        'type': 'tpe',
                        'target': 'baz'
                    }
                ]
            }
        });
        readFileSyncStub = sandbox.stub(fs, 'readFileSync').returns(readFileSyncResult);
    });

    lab.afterEach(() => {

        sandbox.restore();
    });

    lab.test('getParser Should accept a schema and run the function chain', () => {

        const actual = getParser('testSchema')({ 'foo': 'bar' });
        should(actual).eql('{"build":"pairs"}\n');

        //Test the flow
        should(readFileSyncStub.calledWith('lib/ingestionConfig/testSchema.json')).be.true;
        should(applyDefaultsStub.calledWith(['def'])).be.true;
        should(applyValidationsStub.calledWith('valid')).be.true;
        should(applyTransformsStub.calledWith('tforms')).be.true;
        should(buildTypeStub.calledWith('tpe')).be.true;
        should(buildPairsStub.calledWith('baz')).be.true;
    });
});
