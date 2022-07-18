const nodemailer = require("nodemailer");

export const transporter = nodemailer.createTransport({
    host: "nw71.fcomet.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: "info@sochivascursos.cl", // generated ethereal user
      pass: "Sochivas2022*", // generated ethereal password
    },
  });


  transporter.verify().then( () => {
    console.log('Ready to send emails');
  })
