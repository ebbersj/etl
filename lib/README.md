## Crisp ETL Code Challenge

This Application parses a file based on the config rules specified in the exercise utilizing a config file
-
## Requirements

* NodeJS 16
* Git

## Setup

Clone the repo and install dependencies
```bash
git clone https://github.com/ebbersj/etl.git
cd etl
```

```bash
npm install
```

## Running

Code can be run via the CLI
```bash
node index.js ingest [sourceFile] [destinationFile] -c configToLoad
```
To run with defaults via the CLI. This will use the orders.csv source file, example config and write to ordersParsed.csv
```bash
node index.js ingest
```

Code can be run as a library
```nodejs
const etl = require('path_to_etl');
etl.ingest(sourceFile, destFile, configName)
```