'use strict';

const Lab = require('@hapi/lab');
const should = require('should/as-function');

const applyTransforms = require('../../../../lib/schema/helpers/applyTransforms');

const lab = exports.lab = Lab.script();

lab.experiment('/lib/schema/helpers/applyTransforms', () => {

    lab.test('Should passthru if no fransforms', () => {

        const actual = applyTransforms(undefined)('foo');
        should(actual).eql('foo');
    });

    lab.test('Passthru should pass thru', () => {

        const transforms = ['PASSTHRU'];
        const actual = applyTransforms(transforms)('bar');
        should(actual).equal('bar');
    });

    lab.test('ProperCase should proper case a string', () => {

        const transforms = ['PROPERCASE'];
        const actual = applyTransforms(transforms)(['sOmEtHiNg tO SaY']);
        should(actual).deepEqual(['Something To Say']);
    });

    lab.test('DateFromParts should create a date (offsetting month)', () => {

        const transforms = ['DATEFROMPARTS'];
        const actual = applyTransforms(transforms)([2020, 5, 10]);
        should(actual).deepEqual([new Date(2020, 4, 10)]);
    });
});
