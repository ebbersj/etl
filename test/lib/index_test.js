'use strict';

const fs = require('fs');
const Lab = require('@hapi/lab');
const should = require('should/as-function');
const sandbox = require('sinon').createSandbox();
const getParser = require('../../lib/schema/parser');
const { ingest } = require('../../lib/index');
const { ObjectReadableMock, ObjectWritableMock } = require('stream-mock');

const lab = exports.lab = Lab.script();

lab.experiment('/lib/index', () => {

    let createReadStreamMock;
    let createWriteStreamMock;
    let getParserStub;
    let errorStub;
    let parserStub;

    lab.beforeEach(() => {

        parserStub = sandbox.stub().returns('success');
        createReadStreamMock = sandbox.stub(fs, 'createReadStream');
        createWriteStreamMock = sandbox.stub(fs, 'createWriteStream');
        getParserStub = sandbox.stub(getParser, 'getParser').returns(parserStub);
        errorStub = sandbox.stub(console, 'error');
    });

    lab.afterEach(() => {

        sandbox.restore();
    });

    lab.test('Should parse the data', () => {

        createReadStreamMock.returns(new ObjectReadableMock('msg\nmsg1'));
        createWriteStreamMock.returns(new ObjectWritableMock());

        ingest('source.file', 'dest.file', 'config.name');
        should(createReadStreamMock.calledWith('source.file')).be.true;
        should(createWriteStreamMock.calledWith('dest.file')).be.true;
        should(getParserStub.calledWith('config.name')).be.true;
        should(parserStub.calledWith('msg1')).be.true;
    });

    lab.test('Should log errors', () => {

        createReadStreamMock.returns(new ObjectReadableMock('msg\nmsg2'));
        createWriteStreamMock.returns(new ObjectWritableMock());
        parserStub.throws('test error');
        ingest('source.file', 'dest.file', 'config.name');

        should(errorStub.calledOnce).be.true;
    });
});
