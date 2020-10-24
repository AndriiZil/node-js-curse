const express =require('express');
const mongoose = require('mongoose');
const logger = require('morgan');
const path = require('path');

const authRoutes = require('./auth/auth.router');

const { error } = require('dotenv').config({ path: path.join(__dirname, '../.env') });

if (error) {
    throw new Error(error);
}

class Server {

    constructor() {
        this.server = null;
    }

    async start() {
        this.initServer();
        this.initMiddleware();
        this.initRoutes();
        await this.initDb();
        this.startlistening();
        this.errorHandler();
    }

    initServer() {
        this.server = express();
    }

    initMiddleware() {
        this.server.use(express.json());
        this.server.use(logger('dev'));
    }

    initRoutes() {
        this.server.use('/auth', authRoutes);
    }

    async initDb() {
        try {
            await mongoose.connect(process.env.MONGO_URI, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useFindAndModify: false,
                useCreateIndex: true
            });
            console.log('Mongoose connected...');
        } catch (err) {
            console.log(err);
        }
    }

    startlistening() {
        this.server.listen(3000, () => console.log('Server was started.'));
    }

    errorHandler() {
        this.server.use((err, req, res, next) => {
            const code = err.status || err.code || 500;
            const message = err.message || 'Internal Server Error';

            return res.status(code).send({ message });
        });
    }

}

module.exports = Server;
