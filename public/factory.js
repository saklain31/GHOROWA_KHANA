//************FACTORY PATTERN*************

var factory;

window.onload = fac();
function fac()
{
	console.log("factory created");
        // var state = "loggedin";
        // localStorage.setItem("userState",state);
	factory = new Factory();
}

function Factory() {
    this.createObject = function (type) {
        var object;
 
        if (type === "chef") {
            object = new Chef();
        } 
	else if (type === "user") {
            object = new User();
        } 
 
        object.type = type;
 
        return object;
    }
}

var Chef = function () {
    chef_doSomething();
};

var User = function () {
	user_doSomething();
	
};

function chefSignup()
{
    console.log("chef sign up called");
	factory.createObject("chef");
}

function userSignup()
{
    console.log("user sign up called");
	factory.createObject("user");
}


