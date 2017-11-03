
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
     console.log("ekhane");
    
	firebase.auth().onAuthStateChanged(function(user) {
	  console.log("inside jjj");
	  if (user !== null) {
	  console.log("more inside jjj");

	  var userId = firebase.auth().currentUser.uid;	
	  console.log(userId);
	  

	  var place;
    		firebase.database().ref('chefIndex').once('value').then(function(snapshot) {
                console.log("inside place");
                console.log(snapshot.key);
      			place=snapshot.child(userId).val();
                console.log(place);
      			alert(place);
                console.log("myplace"+place);
                firebase.database().ref('chefLocation/'+place).once('value').then(function(snapshot) {
                var ema=snapshot.child(userId).child("email").val();
                //var ema = ref.email;
                console.log("ref"+ema);

                var name = snapshot.child(userId).child("username").val();
				alert("Welcome "+name);
				document.getElementById('pro').innerHTML= name;
				document.getElementById('uname').innerHTML = name;

				//var fullName = userProperty.fullname;
				//document.getElementById('pfn').innerHTML = fullName;
				//var em = userProperty.email;
				document.getElementById('pem').innerHTML = ema;
			        alert(document.getElementById('pro').innerHTML);
                //window.location.href = "index3.html";

                });
    		});


		

		
	}
	else
	{
		console.log("user null");
	}
  });		

}




