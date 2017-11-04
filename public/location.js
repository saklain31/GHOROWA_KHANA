// Chinmoy Chakraborty


var picRows = 0;
var picId = "restaurantPicture";
var nameId = "restaurantName";
var resName1;
var resName2;
var aId = 0;
var nameDivId = 0;


function create(htmlStr) {
    var frag = document.createDocumentFragment(),
        temp = document.createElement('div');
    temp.innerHTML = htmlStr;
    while (temp.firstChild) {
        frag.appendChild(temp.firstChild);
      }
        return frag;
    }
	
function insertAfter(newNode , referenceNode)
{
	referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}


function addNewRow()
{
	var n_id = nameId+picRows;
	var fr = create(' <div class = "row" id = "' + n_id + '" ></div>');
	var referenceNode = document.getElementById(picId+picRows);
	referenceNode.parentNode.insertBefore(fr, referenceNode.nextSibling);
	var aTagId = "a"+aId;
	var divId = "rName"+nameDivId;
	var fre = create('<div class="col-6-cen" ><h2><a id="'+aTagId+'" href="chinu.html" target="_blank"></a></h2></div> ');
	document.getElementById(n_id).appendChild(fre);
	document.getElementById(aTagId).innerHTML = resName1;
	aId = aId + 1;
    nameDivId =  nameDivId + 1;
	aTagId = "a"+aId;
	divId = "rName" + nameDivId;
	fre = create('<div class="col-6-cen" ><h2><a id="'+aTagId+'" href="sakla.html" target="_blank"></a></h2></div> ');
	document.getElementById(n_id).appendChild(fre);
	document.getElementById(aTagId).innerHTML = resName2;
	picRows += 1;
	n_id = picId + picRows;
	fre = create(' <div class = "row" id = "'+n_id+'"	></div>');
    referenceNode.parentNode.insertBefore(fre,fr.nextSibling);
}	
window.onload =  loadComponent();

	
function loadComponent()
{
	
	var fragment = create(' <div class = "row" id = "restaurantPicture0"></div>');
	var referenceNode = document.getElementById("restaurantHeader");
	referenceNode.parentNode.insertBefore(fragment, referenceNode.nextSibling);
	var loc = localStorage.getItem("loc");
	console.log(loc);
	document.getElementById("resh2").innerHTML = loc+" Ghors";
	var i = 0;
	firebase.database().ref('chefLocation/'+loc).once('value').then(function(snapshot) {
		snapshot.forEach(function(childSnapshot) {
			var chefProfile=childSnapshot.val();
			console.log(i);
			if(i%2==0 && i!=0)
			{
			    addNewRow();	
			}
			console.log(childSnapshot.key);
			var picName = childSnapshot.child("username").val();
			console.log(picName);
			if(i%2==0)
			{
			      resName1 = picName;
                  console.log("resName1 : "+resName1);
                  fragment = create('<div class="col-6" style="text-align: center"><a  href="chinu.html" target="_blank"><img src="Picture/'+picName+'.jpg" width="550" height="400" alt="This is an image">'+picName+'</a></div> ');
			}				
			else 
			{
				resName2 = picName;
				console.log("resName2 : "+resName2);
				fragment = create('<div class= "col-6-right" style="text-align: center" ><a href="sakla.html" target="_blank"><img src="Picture/'+picName+'.jpg" width="550" height="400" alt="This is an image">'+picName+'</a></div> ');
			}
			i = i+1;
			var id =  picId+picRows;
			document.getElementById(id).appendChild(fragment);
			
		});
		addNewRow();
	});
	

}