import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import sendEmail from './routes/email.routes.js';
import router from './routes/email.routes.js';

dotenv.config();

export const app = express();
const PORT = process.env.PORT;

app.use(express.json());
const corsOptions = {
  origin: 'com.micapp.app',
  methods: ['GET', 'POST'],
};

app.use(cors(corsOptions));

app.use(function (req, res, next) { 
  // res.header('Access-Control-Allow-Origin', 'com.micapp.app');
  next();
});

app.use('/', router);


app.get('/', (req, resp) => {
  console.log('Ha llegado una request');
  resp.send('Hola mundo');
});

//Añadido dynos

export const server = app.listen(PORT || 4000, () => {
  console.log(`Server listening in http://localhost:4000`);
});
