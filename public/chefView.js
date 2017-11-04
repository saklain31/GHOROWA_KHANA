 // Chinmoy Chakraborty

  var colId ;
 var config = {
    apiKey: "AIzaSyDRSMxZObtlFU7eDgkWmJkMJrK4RfOWZPg",
    authDomain: "test1-aa9c8.firebaseapp.com",
    databaseURL: "https://test1-aa9c8.firebaseio.com",
    projectId: "test1-aa9c8",
    storageBucket: "test1-aa9c8.appspot.com",
    messagingSenderId: "569411524002"
  };
  firebase.initializeApp(config);
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
 

 
  firebase.auth().onAuthStateChanged(function(user) {
        if(user!=null)
        {
        	loadComponent();
        }
  });
  //window.onload = loadComponent();
 
  function loadComponent()
  {
    // alert("IN");
	 //if(localStorage.getItem("hasItem") === "no") return;
	 var pNode = document.getElementById("root");
	 var addB = document.getElementById("adb");
	  var flag = 0;
	  var userId = firebase.auth().currentUser.uid;
	  //alert(userId);
	  firebase.database().ref('Item').once('value').then(function (snapshot) {
		  if(snapshot.hasChild(userId))
		  {
        //      alert("jj");
			  flag = 1;
		  }
		  if(flag == 1)
	      {

          //      alert("Here");
		        firebase.database().ref('Item/'+userId).once('value').then(function(itemSnapshot){
			    itemSnapshot.forEach(function(childSnapshot){
				var  itemName = childSnapshot.key;
				//alert(itemName);
				var price = childSnapshot.val();
				//alert(price);
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
			    }); 
		    });
	     }
	  });
  }
 
 
function div2_hide(){
        document.getElementById('def').style.display = "none";
}
 
function div2_show() 
{
 
       document.getElementById('def').style.display = "block";
}
 
function removeItem(buttId)
{
	var rId = buttId.substr(1,(buttId.length-1));
	rId = "r"+rId;
	var itemName = document.getElementById(buttId).innerHTML;
	console.log(itemName);
			var userId = firebase.auth().currentUser.uid;
	firebase.database().ref('Item/'+userId+'/'+itemName).remove();
 
	window.location.href ="chefView.html";
}
 
function addItem()
{
	var itemName = document.getElementById('itName').value;
	var price = document.getElementById('price').value;
	console.log(itemName);
	console.log(price);
	  var userId = firebase.auth().currentUser.uid;	
	  firebase.database().ref('Item/'+userId+'/'+itemName).set(price).then(function() {
                console.log('Data write succeeded for chef');
 
                window.location.href="chefView.html";
            })
                .catch(function(error) {
                    console.log('Data write failed for chef');
            });
 
}