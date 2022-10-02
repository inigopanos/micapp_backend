import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import router from './routes/email.routes.js';

dotenv.config();

export const app = express();
const port = 4000;

app.use(express.json());
app.use(cors());

app.use('/', router);
app.get('/', (req, resp) => {
  console.log('Ha llegado una request');
  resp.send('Hola mundo');
});

export const server = app.listen(port, () => {
  console.log(`Server listening in http://localhost:${port}`);
});
