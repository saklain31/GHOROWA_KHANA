const username = document.getElementById('gname');
const psw = document.getElementById('pass');
const email = document.getElementById('em');
const ghorLocation = document.getElementById('loc');


var config = {
    apiKey: "AIzaSyDRSMxZObtlFU7eDgkWmJkMJrK4RfOWZPg",
    authDomain: "test1-aa9c8.firebaseapp.com",
    databaseURL: "https://test1-aa9c8.firebaseio.com",
    projectId: "test1-aa9c8",
    storageBucket: "test1-aa9c8.appspot.com",
    messagingSenderId: "569411524002"
};
firebase.initializeApp(config);

function chef_doSomething() {
    // Make quick references to our fields.

    var username = document.getElementById('gname');
    var psw = document.getElementById('pass');
    var email = document.getElementById('em');
    var ghorLocation = document.getElementById('loc')

    if(username.length<6)
    {
        alert("User name should have at least 6 characters");
        return false;
    }
    else if(psw.length<6)
    {
        alert("Password should have at least 6 characters");
        return false;
    }
    else
    {
        complete_signup();
    }
}


function complete_signup() {
    const email_val = email.value; 
    const pass_val = psw.value;

    const auth = firebase.auth();


    const promise = auth.createUserWithEmailAndPassword(email_val,pass_val).catch(function	(error) {
        console.log(error.message);
    });


    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {

            console.log("Chef Signed Up "+ JSON.stringify(user));
            const userId = user.uid;
            firebase.database().ref('chefLocation/'+ghorLocation.value + '/' + userId).set({
                username: username.value,
                email: email_val,
            }).then(function() {
                console.log('Data write succeeded for chef');
                alert(" chef Sign up complete");
            })
                .catch(function(error) {
                    console.log('Data write failed for chef');
                });

            firebase.database().ref('chefIndex/'+userId).set( ghorLocation.value).then(function() {
                console.log('Data write succeeded for chef');
                window.location="index.html";
            })
                .catch(function(error) {
                    console.log('Data write failed for chef');
                });
        }
        else {
            console.log("No chef is signed up.")
        }

    });
}
