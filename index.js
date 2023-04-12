import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import sendEmail from './routes/email.routes.js';
import router from './routes/email.routes.js';

dotenv.config();

export const app = express();
const PORT = process.env.PORT;

app.use(express.json());
var corsOptions = {
  origin: 'com.micapp.app' || 'http://localhost/tabs/tab1',
  methods: ['GET', 'POST'],
};

//Prueba
app.use(cors(corsOptions));

app.use(function (req, res, next) { 
  console.log('Llega aquí')
  res.header('Access-Control-Allow-Origin', 'com.micapp.app');
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
