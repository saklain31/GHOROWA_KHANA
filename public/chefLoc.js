var conf = {
    apiKey: "<API_KEY>",
    authDomain: "<PROJECT_ID>.firebaseapp.com",
    databaseURL: "https://<DATABASE_NAME>.firebaseio.com",
    storageBucket: "<BUCKET>.appspot.com",
    messagingSenderId: "<SENDER_ID>",
  };
  firebase.initializeApp(conf);

var admin = require("firebase-admin");

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
 
