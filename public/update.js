 var config = {
    apiKey: "AIzaSyDRSMxZObtlFU7eDgkWmJkMJrK4RfOWZPg",
    authDomain: "test1-aa9c8.firebaseapp.com",
    databaseURL: "https://test1-aa9c8.firebaseio.com",
    projectId: "test1-aa9c8",
    storageBucket: "test1-aa9c8.appspot.com",
    messagingSenderId: "569411524002"
  };
  firebase.initializeApp(config);

var postData={};

firebase.auth().onAuthStateChanged(function(user) {

	if(user!==null)
	{

	  firebase.database().ref('/users/' + user.uid).once('value').then(function(snapshot) {
  		userProperty=snapshot.val();
		console.log(userProperty.fullname);
		console.log(userProperty.userID);
		console.log(userProperty.username);
		console.log(userProperty.email);
		postData.email=userProperty.email;
		postData.userID=userProperty.userID;
		});
	}

});  


function update()
{
	alert("update function");
	const pass = document.getElementById('pass');
	const npass = document.getElementById('npass');
	const uname = document.getElementById('uname');
	const fname = document.getElementById('fname');

	const password = pass.value;
	const npassword = npass.value;
	const u_name = uname.value;
	const f_name = fname.value;

	firebase.auth().currentUser.reauthenticateWithCredential(firebase.auth.EmailAuthProvider.credential(firebase.auth().currentUser.email, password)).then(function() {

		alert("Password Matched");

		var userid= firebase.auth().currentUser.uid;

		postData.fullname = f_name;
		postData.username = u_name;

		var updates = {};

		updates[userid] =postData;
		console.log(userid);
		console.log(postData);

		firebase.database().ref('/users/').update(updates).then(function() {
			alert("updated2");
		}).catch(function(error) {
			alert("update failed");
		});

	}).catch(function(error) {
		alert("Password doesn't matched");
	});
}
