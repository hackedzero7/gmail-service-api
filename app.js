const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const dotenv = require('dotenv');
const nodemailer = require('nodemailer')
const cors = require('cors')
dotenv.config({
    path: './config/config.env'
})


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const corsOptions = {
    origin: '*', // Allow requests from any origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  };
app.use(cors(corsOptions))
// Configure Nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail', // E.g., 'Gmail', 'Outlook', etc.
    auth: {
      user: 'm.saadamz94@gmail.com',
      pass: 'sfjeyahdogjwiiqm',
    },
  });

app.post('/send-email', (req, res) => {
    const { name, email, phone, message } = req.body;
  
    const mailOptions = {
      from: email,
      to: process.env.ADMIN_EMAIL,
      subject: 'New Contact Form Submission',
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`,
    };
  
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        res.status(500).json({ message: 'Failed to send the email.' });
      } else {
        console.log('Email sent: ' + info.response);
        res.status(200).json({ message: 'Email sent successfully.' });
      }
    });
  });


module.exports = app;
