
function func()
{
alert("Hello");
}

function formValidation() {
// Make quick references to our fields.
var firstname = document.getElementById('firstname');

var username = document.getElementById('username');
var email = document.getElementById('email');

// Check each input in the order that it appears in the form.
if (inputAlphabet(firstname, "* For your name please use alphabets only *")) {
if (lengthDefine(username, 6, 8)) {
if (emailValidation(email, "* Please enter a valid email address *")) {
alert("Sign up successful");
location.href="main.html"
}
}
}

}



// Function that checks whether input text is an alphabetic character or not.
function inputAlphabet(inputtext, alertMsg) {
var alphaExp = /^[a-zA-Z]+$/;
if (inputtext.value.match(alphaExp)) {
return true;
} else {
document.getElementById('p1').innerText = alertMsg; // This segment displays the validation rule for name.
//alert(alertMsg);
inputtext.focus();
return false;
}
}

// Function that checks whether the input characters are restricted according to defined by user.
function lengthDefine(inputtext, min, max) {
var uInput = inputtext.value;
if (uInput.length >= min && uInput.length <= max) {
return true;
} else {
document.getElementById('p2').innerText = "* Please enter between " + min + " and " + max + " characters *"; // This segment displays the validation rule for username
inputtext.focus();
return false;
}
}

// Function that checks whether an user entered valid email address or not and displays alert message on wrong email address format.
function emailValidation(inputtext, alertMsg) {
var emailExp = /^[w-.+]+@[a-zA-Z0-9.-]+.[a-zA-z0-9]{2,4}$/;
if (inputtext.value.match(emailExp)) {
return true;
} else {
document.getElementById('p3').innerText = alertMsg; // This segment displays the validation rule for email.
inputtext.focus();
return false;
}
}


