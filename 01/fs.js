const fs = require('fs');
const { promises: fsPromises } = require('fs');

// First argument in callback is Error
// fs.writeFile('example.txt', 'create new file', (err) => {
//   if (err) {
//     console.log(err);
//   }
//
//   fs.readFile('example.txt', 'utf-8', (err, data) => {
//     console.log(data);
//
//     fs.appendFile('example.txt', ' second write', err => {
//       if (err) {
//         console.log(err);
//       }
//     })
//   })
// })
// fs.writeFileSync()

fsPromises.writeFile('example.txt', 'first file')
  .then(() => fsPromises.readFile('example.txt', 'utf-8'))
  .then(() => fsPromises.appendFile('example.txt', 'second string'))
  .catch(err => console.log(err))

async function main() {
  await fsPromises.writeFile('ex.txt', 'file')
  const data = await fsPromises.readFile('ex.txt', 'utf-8')
  console.log(data);
  await fsPromises.appendFile('ex.txt', ' second string')
}

main();
