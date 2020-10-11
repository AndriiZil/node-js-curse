const { MongoClient } = require('mongodb');
const chalk = require('chalk');

// console.log(chalk.red('Hello world!'));
// console.log(chalk.blue.bgRed.bold('Hello world!'));

const DB_NAME = 'example_db';
const URL = `mongodb+srv://admin:qwerty12345@cluster0.o6ql3.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;

async function connectMongo() {
  const client = await MongoClient.connect(URL, { useUnifiedTopology: true });

  const db = client.db(DB_NAME);
  const example_collection = db.collection('example_collection');

  // await example_collection.insertMany([
  //   { name: 'Andrii', age: 25 },
  //   { name: 'Igor', age: 31 },
  // ]);

  console.log(
    await example_collection
      .find({ $or: [{ name: 'Andrii 1' }, { age: 25 }] })
      .toArray()
  );

}

connectMongo();
