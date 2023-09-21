import express from 'express';

import nodemailer from 'nodemailer';
import { google } from 'googleapis';
import dotenv from 'dotenv';

dotenv.config({path: '../.env'});
// const nodemailer = require('nodemailer');
// const { google } = require('googleapis')

let config = process.env;
const OAuth2 = google.auth.OAuth2;

const OAuth2_client = new OAuth2(
  '338198883768-jvdbm4vpejg51dv9vvb4f8vsc2mqus2b.apps.googleusercontent.com',
  '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',
  "https://developers.google.com/oauthplayground"
);

token_refresco = config.OAUTH_REFRESH_TOKEN;
console.log('Config:', config);

OAuth2_client.setCredentials({ refresh_token: token_refresco})


function send_mail(name, recipient, filename, pdf) {
  const accessToken = OAuth2_client.getAccessToken(); //Falla aquí, Promise { <pending> } 
  
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
        content: pdf
      },
    ],
  };

  console.log(mailOptions.attachments)
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

// NO GUARDO EL PDF EN NINGÚN SITIO!!!

router.post('/formulario', function (req, res) {
  console.log('Router post: ', req.body?.data);
  let pdf = req.body.data[0];
  let pdf_filename = req.body.data[1];
  send_mail('Iñigo', 'inigopanos@gmail.com', pdf_filename, pdf);
  res.send('Email enviado correctamente!');
});

export default router;
