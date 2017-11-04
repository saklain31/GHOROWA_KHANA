// Chinmoy Chakraborty

function show_profile()
{
   document.getElementById('blur').style.opacity = 0.30;
   document.getElementById('card').style.display = "block";
}

function hide_profile()
{
    document.getElementById('card').style.display = "none";
    document.getElementById('blur').style.opacity = 1;  
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


//Iterator

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