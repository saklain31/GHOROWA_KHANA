   // Saklain Zaman, Chinmoy Chakraborty 


    function chef_login()
    {

        alert("Inside chefLogin");
        
    	const psw = document.getElementById('pass2');
    	const email = document.getElementById('email2');
     
    	const email_val = email.value;
    	const pass_val = psw.value;
    	const auth = firebase.auth();
    
    	const promise = auth.signInWithEmailAndPassword(email_val,pass_val);
     
    	firebase.auth().onAuthStateChanged(function(user) {
            alert("Hello");
     
    	if(user!==null)
    	{

        	var userId = user.uid;
     
    		alert("user = "+userId);
     
    		var place;
    		firebase.database().ref('chefIndex').once('value').then(function(snapshot) {
                console.log("inside place");
      			place=snapshot.child(userId).val();
                console.log(place);
      			alert(place);
    		});
     
    	    firebase.database().ref('chefLocation/'+place+'/'+userId).once('value').then(function(snapshot) {
      			var ref=snapshot.val();
    			var ema = ref.email;
      			console.log("ref"+ema);
    		});
    		alert("woah");
    	   window.location.href = "index3.html";
            
      	}
    	else {
        		console.log("No user is signed in.");
                    return false;
      	}
    	});
     
    promise.catch(e => console.log(e.message));
     
}