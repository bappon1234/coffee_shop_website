const express = require('express');
const nodemailer = require('nodemailer');
const cors = require("cors");


const app = express();

app.use(cors({
  origin:'http://127.0.0.1:5500'
}));
app.use(express.json());

app.post('/contact', (req, res) => {
  const { name, email, message } = req.body;

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // or 'STARTTLS'
    auth: {
      user: 'namosudrabappon5@gmail.com',
      pass: 'bappon@1234',
    },
  });

  const mailOptions = {
    from: email,
    to: 'bapponnamosudra3@gmail.com',
    subject: 'Contact Form Submission',
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Email sent: ' + info.response);
    res.send('Email sent successfully!');
  });
});

app.post('/api/booking',(req, res)=>{
  const  {name, email, phone, date, time, guests, specialRequest } = req.body;

  console.log("Booking received", req.body);
  res.json({message:'Table booked successfully'});

  
  // Setup nodemailer for sending an email on booking
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // or 'STARTTLS'
    auth: {
      user: 'namosudrabappon5@gmail.com',
      pass: 'bappon@1234',
    },
  });

  const mailOptions = {
    from: email, // User's email
    to: 'bapponnamosudra3@gmail.com', // Admin's email
    subject: 'New Table Booking',
    text: `New table booking received:\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nDate: ${date}\nTime: ${time}\nGuests: ${guests}\nSpecial Requests: ${specialRequests}`,
  };

  // Send the email with booking details
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("error sending email:",error);
      return res.status(500).send('Failed to send booking email.');
    }
    console.log('Booking email sent: ' + info.response);
    res.json({ message: 'Table booked successfully and email sent to admin.' });
  });
});


app.listen(3000, () => {
  console.log('Server listening on port 3000');
});