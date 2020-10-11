const fs = require('fs');
const { promises: fsPromises } = fs;

fs.writeFile('example.txt', 'text example', err => {
  if (err) {
    console.log(err);
  }
});

fs.readFile('example.txt', 'utf-8', (err, data) => {
  console.log(data);
});

fs.appendFile('example.txt', ' second write', err => {
  if (err) {
    console.log(err);
  }
});

async function main() {
  try {
    await fsPromises.writeFile('test.txt', 'TEST');
    const file = await fsPromises.readFile('test.txt', 'utf-8');
    console.log(file);
    await fsPromises.appendFile('test.txt', ' SECOND PART');
  } catch (err) {
    console.log(err);
  }
}

main();
