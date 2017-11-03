

function signed_in()
{
	firebase.auth().onAuthStateChanged(function(user) {

	if(user!==null)
	{
			
		console.log(JSON.stringify(user));

		var userId = user.uid;

		firebase.database().ref('/users/' + userId).once('value').then(function(snapshot) {
  			userProperty=snapshot.val();
			//console.log(userProperty.fullname);
			console.log("hudai");
			console.log(userProperty.username);
			console.log(userProperty.email);
		});

    		console.log("User state changed");
                //firebase.auth().signOut();
                console.log("User signed out");
		window.location.href = "index2.html";
                return true;
  	}
	else {
    		console.log("No user is signed in.");
                return false;
  	}
	});
	
}


function login_func()
{
		
	const psw = document.getElementById('pass');
	const email = document.getElementById('email');
	const testbtn = document.getElementById('login');

	const email_val = email.value;
	const pass_val = psw.value;
	const auth = firebase.auth();

	console.log("something nnn");
	
	const promise = auth.signInWithEmailAndPassword(email_val,pass_val);
	
	signed_in();	//

	alert("hiiii");
	
	
	
	promise.catch(e => console.log(e.message));

}


function log_out()
{
	firebase.auth().signOut().then(function() {
 	alert('Signed Out');
	window.location.href = "index.html";
	}, function(error) {
  		console.error('Sign Out Error', error);
	});
	
}

//State pattern


var curState;
var currentState;

var loggedInState = function(newController)
{
      this.newController = newController;
      this.go = function()
      {

      	     
             var v = 'out';
             localStorage.setItem('userState',v);
             log_out();
             newController.change(new loggedOutState(newController));
             
             
      };
}

var loggedOutState = function(newController)
{
      this.newController = newController;
      this.go = function()
      {

      	     
            var v = 'in';
            localStorage.setItem('userState',v);
            console.log("v+ "+ localStorage.getItem('userState'));
            login_func();
            newController.change(new loggedInState(newController));
            
            
            
      };
};

var controller = function(state)
{

     curState = localStorage.getItem("userState");
	  console.log(curState);
     if(curState === "out") this.currentState  = new loggedOutState(this);
	  else if(curState === "in") this.currentState = new loggedInState(this);
    console.log("hello");
    this.initialize = function(){  
	    var curState = localStorage.getItem("userState");
	    console.log(curState);
	    if(curState === "out") currentState  = new loggedOutState(this);
	    else if(curState === "in") currentState = new loggedInState(this);
    };
    this.change = function(state)
    {
         this.currentState = state;
    }
    this.start = function()
    {
         console.log("Insert controller start");
         this.currentState.go();
    }
};


function changeState()
{
	  var newController = new controller();
	  
      newController.start();
      
}


function order()
{
		const location= document.getElementById('location');
		const item = document.getElementById('item');
		
		const userId = firebase.auth().currentUser.uid;
		
  		firebase.database().ref('Order/' + userId).set({
		item: item.value,    		
		location: location.value
    		
  		}).then(function() {
    			console.log('Data write succeeded');
			alert("Order complete");
			//window.location="index.html";
		  })
		  .catch(function(error) {
		    console.log('Data write failed');
		  });
}

//**************************
/*
var newholder;
function StateHolder()
{
	var inState;
	var outState;
	var currentState;
	console.log("StateHolder");
	this.createState= function()
	{
		inState = new loggedInState();
		outState = new loggedOutState();
		currentState=outState;
	}

	this.begin = function()
	{
		alert(currentState);
		currentState.go;
	}

	this.changeState = function(state)
	{	
		currentState = state;
	}


}

var loggedInState =function()
{
	this.go= function()
	{
		log_out();
		newholder.changeState(newholder.outState);
	}
}

var loggedOutState=function()
{
	this.go= function()
	{
		login_func();
		newholder.changeState(newholder.inState);
	}
}


function run () 
{
	console.log("run called");
	newholder = new StateHolder();
	newholder.createState();
}

function change()
{
	alert("change called");
	newholder.begin();
} */