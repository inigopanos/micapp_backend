// import nodemailer from 'nodemailer';
// import { GoogleApis } from 'googleapis';

const nodemailer = require('nodemailer');
const { google } = require('googleapis');
let config = process.env;
const OAuth2 = google.auth.OAuth2;

const OAuth2_client = new OAuth2(
  config.OAUTH_CLIENTID,
  config.OAUTH_CLIENT_SECRET
);

OAuth2_client.setCredentials({ refresh_token: config.OAUTH_REFRESH_TOKEN });

function send_mail(name, recipient) {
  const accessToken = OAuth2_client.getAccessToken();
  const refresthToken2 = OAuth2_client.getRefreshToken();

  let transporter = nodemailer.createTransport({
    // const accessToken = OAuth2_client.getAccessToken
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: config.user,
      pass: process.env.MAIL_PASSWORD,
      clientId: process.env.OAUTH_CLIENTID,
      clientSecret: process.env.OAUTH_CLIENT_SECRET,
      refreshToken: process.env.OAUTH_REFRESH_TOKEN,
      accessToken: process.env.OAUTH_ACCESS_TOKEN,
    },
  });

  let mailOptions = {
    from: `Iñigo ${config.user}`,
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

let formulario1 = {
  nombre: 'Pepe Pepón',
  dia: '5/5/2022',
  cuerpo: 'Policía Nacional',
};

const getAllForms = (req, res) => {
  console.log(req.body);
  res.send(formulario1);
};

export { send_mail, getAllForms };
