const fs = require('fs');
const { parse, transform } = require('csv');
const { getParser } = require('./schema/');

module.exports.ingest = (sourceFile, destFile, configName) => {
  const schemaParser = getParser(configName);
  const parser = parse({columns: true});
  const readStream = fs.createReadStream(sourceFile);
  const writeStream = fs.createWriteStream(destFile);
  const t = transform((record, cb) => {
    try {
      cb(null, schemaParser(record));
    } catch(e) {
      console.log(e);
      console.error(`Unable to parse line. ${e.message}.`)
      cb()
    }
  });

  readStream
    .pipe(parser)
    .pipe(t)
    .pipe(writeStream);
};
