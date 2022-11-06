import * as transporter from './transporter.cjs';

jest.mock('nodemailer');
const nodemailer = require('nodemailer');
nodemailer.createTransport.mockReturnValue({ sendMail: sendMailMock });

describe('Given the transporter method', () => {
  describe('When send_mail is called', () => {});
});
