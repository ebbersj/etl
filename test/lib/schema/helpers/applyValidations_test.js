'use strict';

const Lab = require('@hapi/lab');
const should = require('should/as-function');

const applyValidations = require('../../../../lib/schema/helpers/applyValidations');

const lab = exports.lab = Lab.script();

lab.experiment('/lib/schema/helpers/applyValidations', () => {

    lab.test('Should passthru if there are no validations', () => {

        const actual = applyValidations(undefined)(['foo']);
        should(actual).deepEqual(['foo']);
    });

    lab.test('Should validate Product Ids', () => {

        const actual = applyValidations('PRODUCTID')(['SOME - PROCUCTID 123']);
        should(actual).deepEqual(['SOME - PROCUCTID 123']);
    });

    lab.test('Should throw on invalid ProductIds', () => {

        should(() => applyValidations('PRODUCTID')(['&^%']))
            .throw('Invalid PRODUCTID: "&^%"');
    });

    lab.test('Should throw on unknown validation', () => {

        should(() => applyValidations(['Nope'])(['foo']))
            .throw('Unknown Validation: "Nope"');
    });
});
