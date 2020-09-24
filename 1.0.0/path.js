const path = require('path');
const { promises: fsPromises } = require('fs');

async function main() {
  const pathToJson = path.join(__dirname, '../example.json');
  console.log(pathToJson);
  console.log(await fsPromises.readFile(pathToJson, 'utf-8'))
}

main();
