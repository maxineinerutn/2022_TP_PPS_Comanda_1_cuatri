const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');
admin.initializeApp();


const mailTransport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'comandappsbc@gmail.com',
    pass: 'bwgilqhydotxvaoy'
  }
});

exports.sendEmail = functions.firestore
    .document('mails/{mailId}')
    .onCreate((snap) => {

      const mailOptions = {
        from: 'comandappsbc@gmail.com',
        to: snap.data().email,
        subject: '¡Tu usuario fue aprobado!',
        html:
            `<p style="font-size: 18px; color: 'red'; font-weight: 'bold'; ">¡Tenemos buenas noticias!</p>
            <p style="font-size: 14px;">Tu perfil fue aprobado por un supervisor. ¡Ya podes comenzar a operar en la app!</p>
            <p style="font-size: 14px;">Saludos, </p>
            <p style="font-size: 14px;">-Comand-Da Team</p>
            `
      };

      return mailTransport.sendMail(mailOptions, (error) => {
        if (error) {
            console.log(error)
            return
        }
        console.log("Sent!")
    });
});
