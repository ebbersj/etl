'use strict';

const { Command } = require('commander');
const { ingest } = require('./lib/index');

if (require.main === module) {

    const program = new Command();

    program
        .name('etl')
        .description('CLI tool for the Crisp ETL exercise')
        .version('0.1.0');

    program
        .command('ingest')
        .argument('[String]', 'path to the source file to be ingested', 'orders.csv')
        .argument('[String]', 'path to the destination file', 'ordersParsed.csv')
        .argument('[String]', 'path to the schema to load', 'lib/ingestionConfig/example.json')
        .action((source, destination, pathToConfig) => ingest(source, destination, pathToConfig));

    program.parse();
}

module.exports.ingest = ingest;
