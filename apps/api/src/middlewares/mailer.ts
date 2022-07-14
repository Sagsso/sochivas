const nodemailer = require("nodemailer");

export const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: "cursoswebpedago@gmail.com", // generated ethereal user
      pass: "ivujqgqqnuxizbsy", // generated ethereal password
    },
  });


  transporter.verify().then( () => {
    console.log('Ready to send emails');
  })
