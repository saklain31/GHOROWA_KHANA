// Chinmoy Chakraborty



 var rowNo = 0;
 var r = "r";
 var colNo = 0;
 var c = "c";
 var itemName = "";
 var price = "";
 
 
 
 var config = {
    apiKey: "AIzaSyDRSMxZObtlFU7eDgkWmJkMJrK4RfOWZPg",
    authDomain: "test1-aa9c8.firebaseapp.com",
    databaseURL: "https://test1-aa9c8.firebaseio.com",
    projectId: "test1-aa9c8",
    storageBucket: "test1-aa9c8.appspot.com",
    messagingSenderId: "569411524002"
  };
  firebase.initializeApp(config);
  
  window.onload = loadComponent();
  
  function loadComponent()
  {
	 if(itemName === "") return;
     var pNode = document.getElementById('itemList');
	 var rowId = r+rowNo;
				
	var fragment = create('<div class="row" id="'+rowId+'"></div>');
	pNode.appendChild(fragment);
	var rowNode = document.getElementById(rowId);
	var colId = c+colNo;
	colNo = colNo + 1;
	fragment = create('<div class = "col-5-cen"><h3 id ="'+colId+'"></h3></div>');
	rowNode.appendChild(fragment);
	document.getElementById(colId).innerHTML = itemName;
	var colId = c+colNo;
	fragment = create('<div class = "col-5-cen"><h3 id ="'+colId+'" > </h3></div>');
	rowNode.appendChild(fragment);
	document.getElementById(colId).innerHTML = "BDT: "+price;
	var buttonId = "b"+rowNo;
	rowNo = rowNo + 1;
	fragment = create('<div class = "col-2"><button type="button" id="'+buttonId+'">Remove Item</button>');
	rowNode.appendChild(fragment);
	document.getElementById(buttonId).onclick = removeItem(buttonId);
  }
  
  function create(htmlStr) {
    var frag = document.createDocumentFragment(),
        temp = document.createElement('div');
    temp.innerHTML = htmlStr;
    while (temp.firstChild) {
        frag.appendChild(temp.firstChild);
      }
        return frag;
    }

function div2_hide(){
        document.getElementById('def').style.display = "none";
}

function div2_show() 
{
       
       document.getElementById('def').style.display = "block";
}

function showPopUp()
{
	 document.getElementById('def').style.display = "block";
}

function removeItem(buttId)
{
	var rId = buttId.substr(1,(buttId.length-1));
	rId = "r"+rId;
	var pNode = document.getElementById('itemList');
	var cNode = document.getElementById(rId);
	pNode.removeChild(cNode);
}
	
function addItem()
{
	itemName = document.getElementById('itName').value;
	price = document.getElementById('price').value;
	console.log(itemName);
	console.log(price);
	
				window.location.href = "chefView.html";
	firebase.auth().onAuthStateChanged(function(user) {
	  
	  if (user !== null) {
	  var userId = firebase.auth().currentUser.uid;	
	  firebase.database().ref('Item/'+userId+'/'+itemName).set(price).then(function() {
                console.log('Data write succeeded for chef');
				
                //window.location="index.html";
            })
                .catch(function(error) {
                    console.log('Data write failed for chef');
                });
	  }
	});
}



