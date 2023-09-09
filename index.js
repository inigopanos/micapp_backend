import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import sendEmail from './routes/email.routes.js';
import router from './routes/email.routes.js';

dotenv.config();

export const app = express();
const PORT = process.env.PORT;

//  https://stackoverflow.com/questions/50304779/payloadtoolargeerror-request-entity-too-large

// app.use(express.json());
app.use(express.urlencoded({limit: '50mb', extended: true, parameterLimit: 50000}));

const corsOptions = {
  origin: 'http://localhost',
  methods: ['GET', 'POST'],
};

app.use(cors(corsOptions));

// app.use(function (req, res, next) { 
//   // res.header('Access-Control-Allow-Origin', 'com.micapp.app');
//   next();
// });

app.use('/', router);


app.get('/', (req, resp) => {
  console.log('Ha llegado una request');
  resp.send('Hola mundo');
});

app.get('/formulario', (req, resp) => {
  resp.send('Página del formulario');
});

//Añadido dynos

export const server = app.listen(PORT || 4000, () => {
  console.log(`Server listening in http://localhost:4000`);
});
