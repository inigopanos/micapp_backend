import express from 'express';

import nodemailer from 'nodemailer';
import { GoogleApis } from 'googleapis';
import { google } from 'googleapis';
import dotenv from 'dotenv';

dotenv.config();
// const nodemailer = require('nodemailer');
// const { google } = require('googleapis')

let config = process.env;
const OAuth2 = google.auth.OAuth2;

const OAuth2_client = new OAuth2(
  config.OAUTH_CLIENTID,
  config.OAUTH_CLIENT_SECRET
);

OAuth2_client.setCredentials({ refresh_token: config.OAUTH_REFRESH_TOKEN });

function send_mail(name, recipient) {
  const accessToken = OAuth2_client.getAccessToken();

  let transporter = nodemailer.createTransport({
    // const accessToken = OAuth2_client.getAccessToken
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: process.env.USER,
      pass: process.env.MAIL_PASSWORD,
      clientId: process.env.OAUTH_CLIENTID,
      clientSecret: process.env.OAUTH_CLIENT_SECRET,
      refreshToken: process.env.OAUTH_REFRESH_TOKEN,
      accessToken: accessToken,
    },
  });

  let mailOptions = {
    from: `Iñigo Vadci ${config.user}`,
    to: recipient,
    subject: 'Micapp Project',
    text: 'Prueba de Micapp, formulario detenido',
  };

  transporter.sendMail(mailOptions, function (error, result) {
    if (error) {
      console.log('Error: ', error);
    } else {
      console.log('Success: ', result);
    }
    transporter.close();
  });
}

const router = express.Router();

router.post('/formulario', function (req, res) {
  send_mail('Iñigo', 'inigopanos@gmail.com');
});
// router.get('/forms', getAllForms);

export default router;
