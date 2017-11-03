
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
    
	//firebase.auth().onAuthStateChanged(function(user) {
	  alert("inside js4");
	  //if (user != null) {
	  console.log("more inside jjj");

	  var userId = firebase.auth().currentUser.uid;
	  console.log(userId);
	  var place;

	 
      alert("userjs4"+userId);
	  if(userId!=null)
	  {
	  			var place;
    		    firebase.database().ref('chefIndex').once('value').then(function(snapshot) {
                        console.log("inside placejs4");
                        console.log(snapshot.key);
              			place=snapshot.child(userId).val();
                        console.log(place);
              			alert("js4"+place);
                        console.log("myplacejs4"+place);
                
                        firebase.database().ref('chefLocation/'+place).once('value').then(function(snapshot) {
                        var ema=snapshot.child(userId).child("email").val();
                        var name=snapshot.child(userId).child("username").val();
                        //var ema = ref.email;
                        console.log("ref"+ema);
                        console.log(name);
                        alert("indexjs4");

                        document.getElementById('pro').innerHTML= name;
						document.getElementById('uname').innerHTML = name;

						//var fullName = userProperty.fullname;
						//document.getElementById('pfn').innerHTML = fullName;
						
						document.getElementById('pem').innerHTML = ema;
					        alert(document.getElementById('pro').innerHTML);
                        //window.location.href = "index3.html";

                });
    		  });


		/*
		firebase.database().ref('chefIndex').once('value').then(function(snapshot) {
  			place=snapshot.child(userId).val();
  			alert("js4place"+place);

				  	firebase.database().ref('chefLocation/'+place).once('value').then(function(snapshot) {
                        var ema=snapshot.child(userId).child("email").val();
                        var name = snapshot.child(userId).child("username").val()
                        //var ema = ref.email;
                        console.log("ref"+ema);
						document.getElementById('pro').innerHTML= name;
						document.getElementById('uname').innerHTML = name;

						//var fullName = userProperty.fullname;
						//document.getElementById('pfn').innerHTML = fullName;
						
						document.getElementById('pem').innerHTML = em;
					        alert(document.getElementById('pro').innerHTML);

				});
		}).catch(function(error) {
		    alert('chefIndex read failed');
		  });
		*/
	  
	}
	else
	{
		console.log("user null");
	}
  //});		

}




