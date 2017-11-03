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

      //var mailId = childSnapshot.child("email").val();//####
      
      console.log(temp);
      //console.log(mailId);
      
      //sendEmail(mailId);//##

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

/*exports.writeOrder = functions.database.ref('/Order/{item}')
    .onWrite(event => {
      // Grab the current value of what was written to the Realtime Database.
      //alert('hohoho')
      const original = event.data.val();
      console.log(original);
      console.log(original.location);
      console.log("ami");
      //return event.data.ref.parent.child('node').set('donetoo2');

      var query = event.data.ref.parent.parent.child("chefLocation/"+original.location);
      query.once("value")
      .then(function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
      // key will be "ada" the first time and "alan" the second time
      var temp = childSnapshot.key;
      console.log(temp);
      
      event.data.ref.parent.parent.child("chefLocation/"+original.location+'/'+temp+'/notification').set(original.item);
      
  });
});
      return true;
    });
*/


//'use strict';

//const APP_NAME = 'GHOROWA KHANA';
/*
exports.sendMail = functions.database.ref('/order')
    .onWrite(event => {
      
      //const gmailEmail = encodeURIComponent(functions.config().gmail.email);
      //const gmailPassword = encodeURIComponent(functions.config().gmail.password);
      //const mailTransport = nodemailer.createTransport(
      //'smtps://${gmailEmail}:${gmailPassword}@smtp.gmail.com');
      console.log("print");
      //const original = event.data.val();
      //console.log(original);
      
      //console.log(original.val());
      /*firebase.database().ref('/chefLocation/' + ).once('value').then(function(snapshot) {
          location=snapshot.val();
        
    }); 

      //var query = event.data.ref.parent.child("email");
      //console.log('query  '+ query.val());
      
      return true;
      //return sendWelcomeEmail(email, displayName);;
    });
*/
/*
function sendEmail(email, displayName) {
  const mailOptions = {
    from: `${APP_NAME} <noreply@firebase.com>`,
    to: email
  };

  // The user subscribe d to the newsletter.
  mailOptions.subject = `Welcome to ${APP_NAME}!`;
  mailOptions.text = `Hey ${displayName || ''}! Welcome to ${APP_NAME}. I hope you will enjoy our service.`;
  return mailTransport.sendMail(mailOptions).then(() => {
    console.log('New welcome email sent to:', email);
  });
}
*/























// Take the text parameter passed to this HTTP endpoint and insert it into the
// Realtime Database under the path /messages/:pushId/original
/*
exports.addMessage = functions.https.onRequest((req, res) => {
  // Grab the text parameter.
  const original = req.query.text;
  // Push the new message into the Realtime Database using the Firebase Admin SDK.
  admin.database().ref('/messages').push({original: original}).then(snapshot => {
    // Redirect with 303 SEE OTHER to the URL of the pushed object in the Firebase console.
    res.redirect(303, snapshot.ref);
  });
});

// Listens for new messages added to /messages/:pushId/original and creates an
// uppercase version of the message to /messages/:pushId/uppercase
exports.makeUppercase = functions.database.ref('/messages/{pushId}/original')
    .onWrite(event => {
      // Grab the current value of what was written to the Realtime Database.
      //alert("hoise");
      const original = event.data.val();
      console.log('Uppercasing', event.params.pushId, original);
      const uppercase = original.toUpperCase();
      // You must return a Promise when performing asynchronous tasks inside a Functions such as
      // writing to the Firebase Realtime Database.
      // Setting an "uppercase" sibling in the Realtime Database returns a Promise.
      return event.data.ref.parent.child('uppercase').set(uppercase);
    });
*/
/*
function printChef()
{
	alert("In func");
	var ref = admin.database().ref("chefLocation");
	ref.once("value",function(snapshot)
	{
		alert("In snap");
		snapshot.forEach(function(locSnapshot)
		{
			console.log(locSnapshot.value);
			if(locSnapshot.value ==="Banani")
			{
				    alert("Find banani");
					snapshot.forEach(function(chef)
					{
						console.log(chef.username.value);
					});
			}
	 	});
	});
}
*/

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });



