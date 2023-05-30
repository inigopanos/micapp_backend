import express from 'express';

import nodemailer from 'nodemailer';
import { google } from 'googleapis';
import dotenv from 'dotenv';

dotenv.config();
// const nodemailer = require('nodemailer');
// const { google } = require('googleapis')

let config = process.env;
const OAuth2 = google.auth.OAuth2;

const OAuth2_client = new OAuth2(
  '338198883768-jvdbm4vpejg51dv9vvb4f8vsc2mqus2b.apps.googleusercontent.com',
  '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',
  "https://developers.google.com/oauthplayground"
);

OAuth2_client.setCredentials({ refresh_token: '1//04so_-f5o4MqvCgYIARAAGAQSNwF-L9Ir4VOFRA62Ta-HOWRR9Q1LTNK3F_6y5vNeNmb3r-B02irCaa8jIQOGL4FPqSFYI3szS9g'})


function send_mail(name, recipient, filename) {
  const accessToken = OAuth2_client.getAccessToken(); //Falla aquí
  
  console.log('Refresh Token: ', OAuth2_client, '\n')
  console.log('PRUEBA PRUEBA PRUEBA ---------------------------------')
  let ruta = `C:/Users/Usuario/Downloads/${filename}`;

  console.log(accessToken, 'accessToken pasado por OAuth2_client.getAccessToken() \n')

  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: process.env.USER,
      refreshToken: process.env.OAUTH_REFRESH_TOKEN,
      accessToken: accessToken,
      pass: process.env.MAIL_PASSWORD,
      clientId: process.env.OAUTH_CLIENTID,
      clientSecret: process.env.OAUTH_CLIENT_SECRET,
    },
    tls: {
      rejectUnauthorized: false
    }
  });
  

  let mailOptions = {
    from: `Iñigo Vadci ${config.user}`,
    to: recipient,
    subject: 'Micapp Project',
    text: 'Prueba de Micapp, formulario detenido',
    // filepath: path.dirname(`C:/Users/Usuario/Downloads/${filename}`),
    attachments: [
      {
        filename: `${filename}.pdf`, // <= Here: made sure file name match
        path: `Documents/Micapp/${filename}.pdf`, // <= Here
        //Documents//Micapp//
        // C//::Users//Usuario//Downloads//${filename}.pdf
        contentType: 'application/pdf',
      },
    ],
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
  // console.log(req.body, 'router post');
  let pdf_filename = req.body.data;
  send_mail('Iñigo', 'inigopanos@gmail.com', pdf_filename);
  res.send('Email enviado correctamente!');
});

export default router;
