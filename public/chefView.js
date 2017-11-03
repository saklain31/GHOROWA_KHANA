 var colId ;
 var rowNo = 0;
 var r = "r";
 var colNo = 0;
 var c = "c";
 
function create(htmlStr) {
    var frag = document.createDocumentFragment(),
        temp = document.createElement('div');
    temp.innerHTML = htmlStr;
    while (temp.firstChild) {
        frag.appendChild(temp.firstChild);
      }
        return frag;
    }
 
 
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
	 alert("hh");
	 //if(localStorage.getItem("hasItem") === "no") return;
	 alert("hi ");
	 var pNode = document.getElementById("root");
	 var addB = document.getElementById("adb");
	 
	  var flag = 0;
	  
	  var userId = firebase.auth().currentUser.uid;
	  alert("user "+userId);
	  firebase.database().ref('Item').once('value').then(function (snapshot) {
		  if(snapshot.hasChild(userId))
		  {
		  	  alert("hello");
			  flag = 1;
		  }
		  if(flag == 1)
	     {
	  	  alert("inside flag");
		  firebase.database().ref('Item/'+userId).once('value').then(function(itemSnapshot){
			 itemSnapshot.forEach(function(childSnapshot){
				var  itemName = childSnapshot.key;
				alert("itemName "+itemName);
				var price = childSnapshot.val();
				alert("price "+price);
				var rowId = r+rowNo;
				colId = c+colNo;
				colNo = colNo +1;
				var colId2 = c + colNo;
				colNo = colNo + 1;
				var buttonId = "b"+rowNo;
				rowNo = rowNo + 1;
				var fragment = create('<div class="row" id="'+rowId+'"><div class = "col-5-cen"><h3 id ="'+colId+'" ></h3></div><div class = "col-5-cen"><h3 id ="'+colId2+'" > </h3></div><div class = "col-2"><button type="button" id="'+buttonId+'">Remove Item</button></div>');
				pNode.insertBefore(fragment,addB);
	            document.getElementById(colId).innerHTML = itemName;
	            document.getElementById(colId2).innerHTML = price;
	            document.getElementById(buttonId).setAttribute("onclick","javascript:removeItem(colId)");


				//document.getElementById(buttonId).onclick = removeItem(colId);
				alert("kkk");
			 }); 
		  });
	    }
	  });

	 
  
	 
	 /*var pNode = document.getElementById("root");
	 var addB = document.getElementById("adb");
	 var rowId = r+rowNo;
	 var colId = c+colNo;
	 colNo = colNo +1;
	 var colId2 = c + colNo;
	 var buttonId = "b"+rowNo;
	 rowNo = rowNo + 1;
	 var itemName = localStorage.getItem("item");
	 var price = localStorage.getItem("pr");
	 var fragment = create('<div class="row" id="'+rowId+'"><div class = "col-5-cen"><h3 id ="'+colId+'" ></h3></div><div class = "col-5-cen"><h3 id ="'+colId2+'" > </h3></div><div class = "col-2"><button type="button" id="'+buttonId+'">Remove Item</button></div>'); 
	 pNode.insertBefore(fragment,addB);
	 document.getElementById(colId).innerHTML = itemName;
	 document.getElementById(colId2).innerHTML = price;*/
	 
	 /*var itemName = localStorage.getItem("item");
	 var price = localStorage.getItem("pr");
	 console.log(itemName);
	 console.log(price);
	 if(itemName === undefined) return;
	 console.log("Inside loadComponent");
     var pNode = document.getElementById('itemList');
	 var rowId = r+rowNo;
	var fragment = create('<div class="row" id="'+rowId+'"></div>');
	console.log("jjj");
	pNode.appendChild(fragment);
	console.log("j");
	var rowNode = document.getElementById(rowId);
	var colId = c+colNo;
	colNo = colNo + 1;
	fragment = create('<div class="col-6"><a href="chinu.html" target="_blank"><img src="Picture/pu.jpg" width="550" height="400"alt="This is an image"></a></div> ');
	rowNode.appendChild(fragment);
	//document.getElementById(colId).innerHTML = itemName;
	colId = c+colNo;
	fragment = create('<div class = "col-5-cen"><h3 id ="'+colId+'" > BDT: 150 </h3></div>');
	rowNode.appendChild(fragment);
	//document.getElementById(colId).innerHTML = "BDT: "+price;
	var buttonId = "b"+rowNo;
	rowNo = rowNo + 1;
	fragment = create('<div class = "col-2"><button type="button" id="'+buttonId+'">Remove Item</button>');
	rowNode.appendChild(fragment);
	document.getElementById(buttonId).onclick = removeItem(buttonId);*/
	
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
	var itemName = document.getElementById(buttId).innerHTML;
	alert("itemName rem "+ itemName);
	var userId = firebase.auth().currentUser.uid;
	firebase.database().ref('Item/'+userId).once('value').then(function(snapshot){
		snapshot.child("'+itemName+'").remove();
	});
	window.location.href ="chefView.html";
}
	
function addItem()
{
	//alert("addItem");

	var itemName = document.getElementById('itName').value;
	var price = document.getElementById('price').value;
	//alert(itemName);
	//alert(price);
	//localStorage.setItem("item", itemName);
	///localStorage.setItem("pr",price);
	
	//window.location.href = "chefView.html";
	var k=1; 
	
	  var userId = firebase.auth().currentUser.uid;	
		//alert(userId);  
	  firebase.database().ref('Item/'+userId+'/'+itemName).set(price).then(function() {
                console.log('Data write succeeded for chef');
                k=0;
				localStorage.setItem("hasItem","yes");
                window.location.href="chefView.html";
            })
                .catch(function(error) {
                    console.log('Data write failed for chef');
                });
	 //alert("something");
	 
}



