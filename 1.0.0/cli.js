const [operation, ...numbers] = process.argv.slice(2);

switch (operation) {
  case 'sum':
    console.log(numbers.reduce((acc, num) => acc + parseFloat(num), 0));
    break;
  case 'deduct':
    console.log(numbers.reduce((acc, num) => parseFloat(acc) - parseFloat(num)));
    break;
  default:
    throw new Error('Error!')
}
