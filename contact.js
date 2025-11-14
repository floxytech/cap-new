const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

router.post('/', async (req, res) => {
  const { name, email, phone, message } = req.body;
  const contactEmail = process.env.CONTACT_EMAIL || 'kennmuasya49@gmail.com';

  // Prepare nodemailer transporter if SMTP configured
  if (process.env.SMTP_HOST) {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT || 587,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });

    const mailOptions = {
      from: process.env.SMTP_USER,
      to: contactEmail,
      subject: `Caperone Store Contact from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage:\n${message}`
    };

    try {
      await transporter.sendMail(mailOptions);
      return res.json({ success: true, message: 'Sent' });
    } catch (err) {
      console.error('Mail error', err);
      // fall back to returning message
    }
  }

  // If SMTP not configured, just log and return
  console.log('Contact form message:', { name, email, phone, message });
  res.json({ success: true, message: 'Message received (SMTP not configured).', data: { name, email, phone, message } });
});

module.exports = router;