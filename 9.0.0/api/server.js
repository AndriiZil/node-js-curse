const express = require('express');
const mongoose = require('mongoose');
const logger = require('morgan');
const path = require('path');
const jwt = require('jsonwebtoken');
const socketIO = require('socket.io'); // socket
const http = require('http'); // socket

const authRoutes = require('./auth/auth.router');

const { error } = require('dotenv').config({ path: path.join(__dirname, '../.env') });

if (error) {
    throw new Error(error);
}

class Server {

    constructor() {
        this.server = null;
        this.io = null; // socket
        this.httpServer = null; // socket
        this.socketsByIds = {}; // socket
    }

    async start() {
        this.initServer();
        this.initMiddleware();
        this.initRoutes();
        this.initWsHandlers(); // socket
        await this.initDb();
        this.startlistening();
        this.errorHandler();
    }

    initServer() {
        this.server = express();
        this.httpServer = http.createServer(this.server); // socket
        this.io = socketIO(this.httpServer); // socket
    }

    initMiddleware() {
        this.server.use(express.json());
        this.server.use(logger('dev'));
        this.server.use(express.static(path.join(__dirname, 'static')));
    }

    initRoutes() {
        this.server.use('/auth', authRoutes);
    }

    initWsHandlers() {
        this.io.on('connection', (socket) => { // socket
            console.log('socket connected!');

            socket.on('join', async (token) => {
                console.log('token', token);
                const { id } = await jwt.verify(token, process.env.JWT_SECRET);
                this.socketsByIds[id] = socket;
            });

            socket.on('chat message', (data) => {
                if (data.to) {
                    const socketRecepient = this.socketsByIds[data.to];

                    if (!socketRecepient) {
                        return socket.emit('error message', { message: 'User is not connected to server' });
                    }

                    return socketRecepient.emit('chat message', data.message);
                }
                this.io.emit('chat message', data.message);
            })
        })
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
        this.httpServer.listen(3000, () => console.log('Server was started.')); // change for socket on httpServer
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
