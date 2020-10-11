const { MongoClient, ObjectId, ObjectID } = require('mongodb');

console.log(new ObjectID('5f7597e4011af35418754673').getTimestamp()); // 2020-10-01T08:48:36.000Z
