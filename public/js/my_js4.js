// Chinmoy Chakraborty, Saklain Zaman 

var config = {
apiKey: "AIzaSyDRSMxZObtlFU7eDgkWmJkMJrK4RfOWZPg",
authDomain: "test1-aa9c8.firebaseapp.com",
databaseURL: "https://test1-aa9c8.firebaseio.com",
projectId: "test1-aa9c8",
storageBucket: "test1-aa9c8.appspot.com",
messagingSenderId: "569411524002"
};
firebase.initializeApp(config);

window.onload =  func();

function func()
{   

	firebase.auth().onAuthStateChanged(function(user) {
		if (user !== null) {
			console.log("user not null");
			var userId = firebase.auth().currentUser.uid;	
			console.log(userId);
			
			var place;
			firebase.database().ref('chefIndex').once('value').then(function(snapshot) {
				place=snapshot.child(userId).val();
				console.log("place"+place);
			}).catch(function(error) {
				alert('chefIndex read failed');
			});

			firebase.database().ref('chefLocation/'+place+'/'+userId).once('value').then(function(snapshot) {
				userProperty=snapshot.val();
				console.log(snapshot.key);
				console.log(snapshot.child("username").val());
				console.log(snapshot.child("email").val());

				var name = snapshot.child("username").val()
				alert("Welcome "+name);
				document.getElementById('pro').innerHTML= name;
				document.getElementById('uname').innerHTML = name;

				var em = snapshot.child("email").val()
				document.getElementById('pem').innerHTML = em;
				alert(document.getElementById('pro').innerHTML);

			});
		}
		else
		{
			console.log("user null");
		}
	});		
}




