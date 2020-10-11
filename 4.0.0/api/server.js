const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const userRouter = require('./users/user.router');

require('dotenv').config();
const PORT = process.env.PORT;

module.exports = class UsersServer {
  constructor() {
    this.server = null;
  }

  start() {
    this.initServer();
    this.initMiddlewares();
    this.initRoutes();
    this.errorhandler();
    this.startListening();
  }

  initServer() {
    this.server = express();
  }

  initMiddlewares() {
    this.server.use(express.json());
    this.server.use(cors({ origin: 'http://localhost:3000' }));
    this.server.use(logger('dev'));
  }

  initRoutes() {
    this.server.use('/users', userRouter);
  }

  errorhandler() {
    this.server.use((err, req, res, next) => {
      if (err) {
        const code = err.status ? err.status : 400;
        res.status(code).send({ message: err.message });
      }
    })
  }

  startListening() {
    this.server.listen(PORT, () => {
      console.log(`Server was started on PORT: ${PORT}`);
    })
  }

}
