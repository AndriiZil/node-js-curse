const { v4: uuidv4 } = require('uuid');
const nodemailer = require('nodemailer');

const UserModel = require('./auth.model');
const {
    InvalidUserInput,
    NotFoundError,
    UnauthorizedError
} = require('../error');

class AuthController {

    async signUpUser(req, res, next) {
        try {
            const user = await UserModel.create(req.body);

            await AuthController.sendVerificationEmail(user);

            return res.send({
                user: {
                    userName: user.name,
                    email: user.email
                }});
        } catch (err) {
            next(err);
        }
    }

    async getUsers(req, res, next) {
        try {
            const users = await UserModel.find();

            return res.send(users);
        } catch (err) {
            next(err);
        }
    }

    async verifyEmail(req, res, next) {
        try {
            const verificationToken = req.params.token;

            const userToVerify = await UserModel.findOne({ verificationToken });

            if (!userToVerify) {
                throw new NotFoundError('User was not found.');
            }

            await AuthController.verifyUser(userToVerify._id);

            return res.send({ message: 'User was verified' });
        } catch (err) {
            next(err);
        }
    }

    async signInUser(req, res, next) {
        try {
            const { email, password } = req.body;

            const user = await UserModel.findOne({ email });

            if (!user) {
                throw new NotFoundError('User was not found.');
            }

            if (user.password !== password) {
                throw new InvalidUserInput('Password does not match.');
            }

            if (user.status !== 'Verified') {
                throw new UnauthorizedError('User was not verified.');
            }

            return res.send({ token: 'sa4d8as4d1a5s618as74das54d' });
        } catch (err) {
            next(err);
        }
    }

    static async verifyUser(userId) {
        await UserModel.findByIdAndUpdate(userId, {
            status: 'Verified',
            verificationToken: null
        });

        return 'success';
    }

    static async sendVerificationEmail(user) {
        const verificationToken = await AuthController.saveVerificationToken(user._id);

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.NODEMAILER_USER,
                pass: process.env.NODEMAILER_PASSWORD,
            }
        });

        const verificationUrl = `http://localhost:3000/users/verify/${verificationToken}`

        const mailOptions = {
            from: process.env.NODEMAILER_USER,
            to: user.email,
            subject: 'Email verification',
            html: `<a href='${verificationUrl}'>Click here</a>`
        };

        return transporter.sendMail(mailOptions);
    }

    static async saveVerificationToken(userId) {
        const token = uuidv4();

        const { verificationToken } = await UserModel.findByIdAndUpdate(userId, {
            verificationToken: token
        }, { new: true });

        return verificationToken;
    }

}

module.exports = new AuthController();