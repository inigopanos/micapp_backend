import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import sendEmail from './routes/email.routes.js';
import router from './routes/email.routes.js';

dotenv.config();

export const app = express();
const port = 4000;

app.use(express.json());
//'https://micapp.netlify.app'
var corsOptions = {
  origin: '*',
  methods: ['GET', 'POST'],
  origin: true,
  credentials: true,
};

//Prueba

app.use(cors(corsOptions));

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.use('/', router);
// app.use('/formulario', sendEmail);
app.get('/', (req, resp) => {
  console.log('Ha llegado una request');
  resp.send('Hola mundo');
});

export const server = app.listen(process.env.PORT || 4000, () => {
  console.log(`Server listening in http://localhost:${process.env.PORT}`);
});
