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
