'use strict';

const fs = require('fs');
const { parse, transform } = require('csv');
const parser = require('./schema/parser');

/**
 * @function ingest
 * @description Takes a source, destination and config name, and parses the source file to destination
 * @param {string} sourceFile - Path to the source file to ingest
 * @param {string} destFile - Path to write the parsed file to
 * @param {string} configName - Name of the config to load. Currently only example
 */
module.exports.ingest = (sourceFile, destFile, configName) => {

    const schemaParser = parser.getParser(configName);
    const csvParser = parse({ columns: true });
    const readStream = fs.createReadStream(sourceFile);
    const writeStream = fs.createWriteStream(destFile);
    const t = transform((record, cb) => {

        try {
            cb(null, schemaParser(record));
        }
        catch (e) {
            const line = {
                message: `Unable to parse line. ${e.message}.`,
                record
            };
            console.error(line);
            cb();
        }
    });

    readStream
        .pipe(csvParser)
        .pipe(t)
        .pipe(writeStream);
};
