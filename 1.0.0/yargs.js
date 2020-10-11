const yargs = require('yargs');

const users = [
  { id: 1, name: 'Jane', surname: 'j' },
  { id: 2, name: 'Mike', surname: 'm' },
];

const arg = yargs
  .number('id')
  .string('name')
  .string('surname')
  .alias('name', 'n')
  .alias('surname', 's').argv;

const foundedUser = users.filter((user => {
  return (
    checkField('id', user) &&
    checkField('name', user) &&
    checkField('surname', user)
  );
}));

function checkField(fieldName, user) {
  return !(arg[fieldName] && arg[fieldName] !== user[fieldName]);
}

console.log(foundedUser);

// node yargs.js --id=1
//               --id=1 --name=mike
//               --id=1 -n=Mike
