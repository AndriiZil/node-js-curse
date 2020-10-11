const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./api/users/user.router');
require('dotenv').config();

const URL = process.env.MONGO_URL;
const PORT = process.env.PORT || 3000;

// 1. Create server
// 2. Init global middleware
// 3. Init routes
// 4. Init Db
// 5. Start listening

class UserServer {

  constructor() {
    this.server = null;
  }

  async start() {
    this.initServer();
    this.initMiddlewares();
    await this.initDatabase();
    this.initRoutes();
    this.startListening();
  }

  initServer() {
    this.server = express();
  }

  initMiddlewares() {
    this.server.use(express.json());
  }

  initRoutes() {
    this.server.use('/users', userRouter);
  }

  async initDatabase() {
    try {
      await mongoose.connect(URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
      });
    } catch (err) {
      console.log(err);
    }
    console.log('Database Connected');
  }

  startListening() {
    this.server.listen(
      PORT,
      () => console.log(`Server start listening port: ${PORT}`)
    )
  }

}

module.exports = UserServer;
