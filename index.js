'use strict';

const { Command } = require('commander');
const program = new Command();

const { ingest } = require('./lib/index');

program
  .name('crisp-etl-exercise')
  .description('CLI tool for the Crisp ETL exercise')
  .version('0.1.0');

program
  .command('ingest')
  .argument('[String]', 'path to the source file to be ingested', 'orders.csv')
  .argument('[String]', 'path to the destination file', 'ordersParsed.csv')
  .option('-c, --config', 'config to use when ingesting the file', 'example')
  .action((source, destination, opts) => ingest(source, destination, opts.config));

program.parse();

module.exports.ingest = ingest;
