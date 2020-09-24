const fs = require('fs');
const { promises: fsPromises } = fs;

fs.writeFile('asd/test.txt', 'text example', err => {
  if (err) {
    console.log(err);
  }

  fs.readFile('example', 'utf-8', (err, data) => {
    console.log(data);

    fs.appendFile('example.txt', 'second write', err => {
      if (err) {
        console.log(err);
      }
    })
  });

});

fsPromises
  .writeFile('example.txt', 'rewrite')
  .then()
// fs.writeFileSync();
