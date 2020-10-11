const path = require('path');
const { promises: fsPromises } = require('fs');

async function main() {
  const pathToPackageJson = path.join(__dirname, '../example.json');
  console.log(await fsPromises.readFile(pathToPackageJson, 'utf-8'));
}

main();
