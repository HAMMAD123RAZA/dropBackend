import nodemailer from 'nodemailer'
import express from 'express';

// Create transporter
let transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: `${process.env.email}`,
    pass: `${process.env.password}`
  }
});

export const createOrder = (req, res) => {
  const { userName, userEmail, orderDetails } = req.body;  // Extract user details from request
console.log('backend details',orderDetails)
  // Convert orderDetails to a JSON formatted string with proper indentation
  const formattedOrderDetails = JSON.stringify(orderDetails, null, 2);
  
  let mailOptions = {
    from: userEmail,  
    to: `${process.env.email}`,  
    subject: 'New Order Placed',
    text: `A new order has been placed by ${userName}. Please check the details below:\n\n${formattedOrderDetails}`
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
      res.status(500).send('Error sending email');
    } else {
      console.log('Email sent: ' + info.response);
      res.status(200).send('Order placed and email sent to admin');
    }
  });
};
