import express from 'express';
import { enviarEmail, getAllForms } from '../nodemailer/transporter.js';

const router = express.Router();

router.post('/formulario', function (req, res) {
  enviarEmail;
});
router.get('/forms', getAllForms);

export default router;
