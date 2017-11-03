    function chef_login()
    {

        alert("Inside chefLogin");
        
    	const psw = document.getElementById('pass2');
    	const email = document.getElementById('email2');
    	//const testbtn = document.getElementById('login');
     
    	const email_val = email.value;
    	const pass_val = psw.value;
    	const auth = firebase.auth();
     
     
    	//console.log("something nnn");
     
    	const promise = auth.signInWithEmailAndPassword(email_val,pass_val);
     
    	//console.log("something");
    	//alert("hiiii");
     
    	firebase.auth().onAuthStateChanged(function(user) {
            alert("Hello");
        alert("user"+user);
    	if(user!==null)
    	{
     
    		//console.log(JSON.stringify(user));
     
    		var userId = user.uid;
     
    		alert("user = "+userId);
     
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
                window.location.href = "index3.html";

                });
    		});
            

    		alert("woah");
    	   //window.location.href = "index3.html";
            //return true;
      	}
    	else {
        		console.log("No user is signed in.");
                    return false;
      	}
    	});
     
    	promise.catch(e => console.log(e.message));
     
    }