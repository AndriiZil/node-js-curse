const express = require('express');
const mongoose = require('mongoose');
const logger = require('morgan');

const UserModel = require('./models/User');
const StoryModel = require('./models/Story');
const AddressModel = require('./models/Address');

const app = express();
app.use(logger('dev'));
app.use(express.json());

app.get('/auth', async (req, res) => {
    try {
        const users = await StoryModel
            .find()
            // .populate({ path: 'author', select: 'name age' });
            .populate('author');

        return res.send(users)
    } catch (err) {
        console.log(err);
    }
});

app.post('/auth', async (req, res) => {
    try {
        const { name, age, title, street } = req.body;

        const user = new UserModel({ name, age });
        await user.save();

        const story = new StoryModel({ title, author: user._id });
        await story.save();

        const address = new AddressModel({ street, user: user._id });
        await address.save();

        return res.send(user);
    } catch (err) {
        console.log(err);
    }
});

app.get('/user', async (req, res) => {
    try {
        const user = await AddressModel
            .find()
            .populate('owner');

        return res.send(user);
    } catch (err) {
        console.log(err);
    }
});

async function connect() {
    try {
        await mongoose.connect('mongodb+srv://admin:qwerty12345@cluster0.o6ql3.mongodb.net/test_users?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        });
    } catch (err) {
        console.log(err);
    }
}

connect().catch(err => console.log(err));

app.listen(3000, () => console.log('Server was started'));