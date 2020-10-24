const nodemailer = require('nodemailer');
const path = require('path');

const { error } = require('dotenv').config({ path: path.join(__dirname, '.env')});

if (error) {
    throw new Error(error);
}

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASSWORD,
    }
});

const mailOptions = {
    from: process.env.NODEMAILER_USER,
    to: 'andrii.zilnyk@gmail.com', // ['first@test.com', 'second@test.com']
    subject: 'Email from Node-App: A Test Message!',
    text: 'Some content to send'
};

async function sendEmailWithNodemailer() {
    const result = await transporter.sendMail(mailOptions);
    console.log(result);
}

sendEmailWithNodemailer().catch(e => console.log(e));