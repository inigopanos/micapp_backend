import { response } from 'express';
import nodemailer from 'nodemailer';

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD,
    clientId: process.env.OAUTH_CLIENTID,
    clientSecret: process.env.OAUTH_CLIENT_SECRET,
    refreshToken: process.env.OAUTH_REFRESH_TOKEN,
  },
});

let mailOptions = {
  from: 'inigovadci@gmail.com',
  to: 'inigopanos@gmail.com',
  subject: 'Micapp Project',
  text: 'Prueba de Micapp, formulario detenido',
};

export const enviarEmail = transporter.sendMail(
  mailOptions,
  function (err, data) {
    if (err) {
      console.log('Error ' + err);
    } else {
      console.log('Email sent successfully');
    }
  }
);

let formulario1 = {
  nombre: 'Pepe Pepón',
  dia: '5/5/2022',
  cuerpo: 'Policía Nacional',
};

export const getAllForms = (req, res) => {
  console.log(req.body);
  res.send(formulario1);
};
