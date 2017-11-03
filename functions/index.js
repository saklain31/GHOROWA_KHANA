// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');
// The Firebase Admin SDK to access the Firebase Realtime Database. 
const admin = require('firebase-admin');

const nodemailer = require('nodemailer');

admin.initializeApp(functions.config().firebase);

const APP_NAME = 'GHOROWA KHANA';
const gmailEmail = encodeURIComponent(functions.config().gmail.email);
const gmailPassword = encodeURIComponent(functions.config().gmail.password);
const mailTransport = nodemailer.createTransport(
`smtps://${gmailEmail}:${gmailPassword}@smtp.gmail.com`);

exports.writeOrder = functions.database.ref('/Order/{item}')
    .onWrite(event => {
      
      const original = event.data.val();
      console.log(original);
      console.log(original.location);
      console.log("ami");
      
      var query = event.data.ref.parent.parent.child("chefLocation/"+original.location);
      query.once("value")
      .then(function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
      
      var temp = childSnapshot.key;
      
      console.log(temp);

      event.data.ref.parent.parent.child("chefLocation/"+original.location+'/'+temp+'/notification').set(original.item);
      
  });
});
      return true;
});





exports.sendMail = functions.database.ref('/chefLocation/{loc}/{id}/notification')
    .onWrite(event => {
      
      const original = event.data.val();
      console.log(original);
      console.log(event.data.key);
      event.data.ref.parent.once("value")
      .then(function(snapshot) {
        var mailId = snapshot.child("email").val();
        sendEmail(mailId);

      
  });
      //console.log(event.data.ref.parent.child("email").val())      
  });

      
function sendEmail(email) {
  const mailOptions = {
    from: `${APP_NAME} <noreply@firebase.com>`,
    to: email
  };

  // The user subscribe d to the newsletter.
  mailOptions.subject = `Welcome to ${APP_NAME}!`;
  mailOptions.text = `Hey ! Welcome to ${APP_NAME}. There is an order.`;
  return mailTransport.sendMail(mailOptions).then(() => {
    console.log('New welcome email sent to:', email);
  });
}    










