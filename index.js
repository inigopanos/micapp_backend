import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import sendEmail from './routes/email.routes.js';
import router from './routes/email.routes.js';

dotenv.config();

export const app = express();
const PORT = process.env.PORT;

app.use(express.json());
//'https://micapp.netlify.app'
var corsOptions = {
  origin: 'https://micapp.netlify.app/tabs/tab1',
  methods: ['GET', 'POST'],
  origin: true,
  credentials: true,
};

//Prueba
const cors = require('cors');
app.use(cors());

app.use(function (req, res, next) {
  //res.header('Access-Control-Allow-Origin', '*');
  next();
});

const frontend_files =
  'C:\\Users\\Usuario\\Desktop\\MICAPP-Diego\\micapp\\dist';

const frontent_files_desktop = 
'D:\\Micapp\\micapp-frontend\\dist'

app.use('/', router);
// app.use('/formulario', sendEmail);

// app.use(express.static(frontent_files_desktop));

app.get('/', (req, resp) => {
  console.log('Ha llegado una request');
  resp.send('Hola mundo');
  // express.static(frontend_files);
});

//Añadido dynos

export const server = app.listen(PORT || 4000, () => {
  console.log(`Server listening in http://localhost:4000`);
});
