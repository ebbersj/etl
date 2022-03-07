
## Crisp ETL Code Challenge

#### This Application parses a file based on the config rules specified in the exercise utilizing a config file

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
node index.js ingest [sourceFile] [destinationFile] [schemaConfig]
```
To run with defaults via the CLI. This will use the orders.csv source file, example config and write to ordersParsed.csv
```bash
node index.js ingest
```

Code can be run as a library
```node
// Assuming 1 directory above the etl project
const etl = require('./etl');

etl.ingest('etl/orders.csv', 'etl/orders2.csv', 'etl/lib/ingestionConfig/example.json');
```

## Configs
A list of available configs in found in lib/ingestionConfig
All *.json files are available as config parsers

### Config file format
An abitrary number of fields objects may be appendd to the array. The steps inside fields are executed sequentially, with the rest of the previous step being used for the next, in the order listed here.
* source (Array) - The field name(s) in the source CSV to read from
* default (Array) - (Optional) Default values will be added to the field(s) specified from source, in the same order. I.e. Array key 0 in source will get extracted, and Array key 0 in default will be applied.
* validation (Enum) - (Optional) Validation to be applied to source field(s). Full list available in: lib/schema/helpers/applyValidations.js
* transforms (Array) - (Optional) Transformations to be applied to source field(s). Full list available in: lib/schema/helpers/applyTransformations.js
* type (Enum) - [INTEGER | STRING | FLOAT] The field will be converted to this data type
* target (String) - Field name to output the data as in the final .csv
```json
{
	"schema": {
		"fields": [{
				"source": ["Order Number"],
                "default": ["kg"],
                "validation": "PRODUCTID",
				"type": "INTEGER",
				"transforms": ["PASSTHRU"],
				"target": "OrderID"
			}]
    }
}
```