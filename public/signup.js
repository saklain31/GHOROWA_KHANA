// Chinmoy Chakraborty, Saklain Zaman


const firstname= document.getElementById('firstname');
const username = document.getElementById('username');
const psw = document.getElementById('psw');
const conpsw = document.getElementById('conpsw');
const email = document.getElementById('email');
const signUp = document.getElementById('submit');


var config = {
apiKey: "AIzaSyDRSMxZObtlFU7eDgkWmJkMJrK4RfOWZPg",
authDomain: "test1-aa9c8.firebaseapp.com",
databaseURL: "https://test1-aa9c8.firebaseio.com",
projectId: "test1-aa9c8",
storageBucket: "test1-aa9c8.appspot.com",
messagingSenderId: "569411524002"
};
firebase.initializeApp(config);

// Chinmoy Chakraborty

 var userNameValidation = function()
 {
 	var uname = document.getElementById('username').value;
 	this.getConfirmation = function()
 	{
          if(uname.length>=6) return true;
          else
          {
          	 alert("UserName should be at least of 6 characters");
          	 return false;
          }
 	}
 };

 var passwordValidation = function()
 {
 	var psw = document.getElementById('psw').value;
 	var conpsw = document.getElementById('conpsw').value;
 	this.getConfirmation = function()
 	{
 		if(psw.length>=6)
 		{
 			if(psw === conpsw)
 			{
 				return true;
 			}
 			else
 			{
 				alert("Password does not match");
 				return false;
 			}
 		}
 		else
 		{
 			alert("Password should be at least of 6 characters");
 			return false;
 		}
 	}
 }

 /**** facade pattern ****/

var signUpObject = function() {
    // Make quick references to our fields.
	var fname = document.getElementById("firstname").value;
	var uname = document.getElementById("username").value;
	var email = document.getElementById("email").value;
	var psw = document.getElementById("psw").value;
	var conpsw = document.getElementById("conpsw").value;

	var unameVal = new userNameValidation();
	var passVal = new passwordValidation();

	this.operation  = function()
	{
			if(unameVal.getConfirmation())
		    {
				if(passVal.getConfirmation())
				{
					complete_signup();
				}
		    }

	}
};

// Saklain Zaman

function complete_signup() {
	const email_val = email.value; //check for real email
	const pass_val = psw.value;
	const auth = firebase.auth();

	const promise = auth.createUserWithEmailAndPassword(email_val,pass_val).catch(function	(error) {
		console.log(error.message);
	});


	firebase.auth().onAuthStateChanged(function(user) {
		if (user) {
			console.log("Signed Up "+ JSON.stringify(user));
			const userId = user.uid;
			firebase.database().ref('users/' + userId).set({
				fullname: firstname.value,    		
				username: username.value,
				email: email_val,
				userID: userId
			}).then(function() {
				console.log('Data write succeeded');
				alert("Sign up complete");
			})
			.catch(function(error) {
				console.log('Data write failed');
			});


			//OBSERVER ADD
			firebase.database().ref('userlist/'+ userId).set({
				fullname: firstname.value,    		
			}).then(function() {
				console.log('Data write succeeded');	
				alert("Sign up complete");
				window.location="index.html";
			})
			.catch(function(error) {
				console.log('Data write failed2');
			});
		} 
		else {
			console.log("No user is signed up.")
		}
	});
}


function user_doSomething()
{
	var newObject = new signUpObject();
	newObject.operation();
}