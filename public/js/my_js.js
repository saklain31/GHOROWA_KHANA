// Chinmoy Chakraborty , Sameen Wasif Hussain


// Validating Empty Field

var name = "";
window.onload = funct()
var curState;

function funct()
{

     curState = 'out';
     localStorage.setItem('userState',curState);
     var v = localStorage.getItem('userState');
     
}


function check_empty() {
    var emval = document.getElementById("email2").value;
    if(!(emval.includes("@gmail.com")) && !(emval.includes("@yahoo.com")) && !(emval.includes("@outlook.com")) )
    {
         alert("Invalid email format"); return false;
    }
    else 
    {
      document.getElementById('form2').submit();
      alert("Registration successful");
    }
}

function func(name)
{
    alert(name);
    if(name==="") return;
    else
    {
  	  var sup= document.getElementById('sup');
  	  sup.innerText = name;
  	  var lin = document.getElementById('lin');
  	  alert(lin.innerText); 
  	  alin.innerText = '';
    }
}


function loc_check()
{
    var location = document.getElementById('loc').value;
    if(location === "Mirpur")
    {
        window.location = "mirpur.html";
    }
    else if (location === "Dhanmondi")
    {
        window.location = "dhanmondi.html";
    }
}

function loginValidate()
{
   name = document.getElementById('username').value;
   
   localStorage.setItem("username",name);
   return true;
}

//Function To Display Popup
function div_show() {
    document.getElementById('abc').style.display = "block";
}

//Function to Hide Popup
function div_hide(){
    document.getElementById('abc').style.display = "none";
}

function div2_hide(){
    document.getElementById('def').style.display = "none";
}

function div2_show() {
    document.getElementById('abc').style.display = "none";
    document.getElementById('def').style.display = "block";
}


// Chinmoy Chakraborty

/**** Iterator ****/

var Iterator = function(items) {
    this.index = 0;
    this.items = items;
}
 
Iterator.prototype = {
    first: function() {
        this.reset();
        return this.next();
    },
    next: function() {
        return this.items[this.index++];
    },
    hasNext: function() {
        return this.index <= this.items.length;
    },
    reset: function() {
        this.index = 0;
    }
}

function redirect(item)
{
      if(item === "Mirpur")
    {
		localStorage.setItem("loc",item);
        window.location.href = "location.html";
    }
    else if (item === "Dhanmondi")
    {
		localStorage.setItem("loc",item);
        window.location = "location.html";
    }
}

function locationCheck()
{
   console.log("Inside location check");
   var items = ["Mirpur", "Dhanmondi"];
   var iter = new Iterator(items);

   var location = document.getElementById('loc').value;
   console.log("location "+location);
   for (var item = iter.first(); iter.hasNext(); item = iter.next()) {
        console.log(item);
        if(item == location)
        {
           console.log("In");
           redirect(item);
           return;
        }
    }
}
