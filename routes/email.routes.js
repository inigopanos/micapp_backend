import express from 'express';

import nodemailer from 'nodemailer';
import { GoogleApis } from 'googleapis';
import { google } from 'googleapis';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();
// const nodemailer = require('nodemailer');
// const { google } = require('googleapis')

let config = process.env;
const OAuth2 = google.auth.OAuth2;

const OAuth2_client = new OAuth2(
  config.OAUTH_CLIENTID,
  config.OAUTH_CLIENT_SECRET,
  "https://developers.google.com/oauthplayground"
);

OAuth2_client.setCredentials({ refresh_token: '1//04vjlSuIaeGFBCgYIARAAGAQSNwF-L9IrX0VisAin4fWZ8_4MkAq4MLsrh5eBsLlvE0kMx853cEDbU76f3K0pn4dHjm4CVL844zU'})


function send_mail(name, recipient, filename) {
  const accessToken = OAuth2_client.getAccessToken(); //Falla aquí

  let ruta = `C:/Users/Usuario/Downloads/${filename}`;
  console.log(ruta, ' ruta de archivo');

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
        path: `../../../../../Users//Usuario//Downloads//${filename}.pdf`, // <= Here
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
