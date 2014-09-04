// JavaScript Document

$(document).ready(function(){
	
	
	
	var text = "je suis une variable 2";
	
	var obj = { 
	"message": "mais oui"
	}
	

	$("#button1").button().click( function(){
	

	
	$.ajax({
		
		type: "POST",
		url:"http://80.236.38.190/MonPremierSite/serverSide/text.php",
		data: "message=" + text,
		dataType:"html",
		success: function(result){
			
			$("#text").html(result);
		}
		
		});
	
	});
	
	
	/*var tab = [ "a", 0, "c" ];
	
	console.log(tab);
	
	console.log(tab[2]);
	
	tab.push("Un truck");
	
	for( var i=0; i<7; i++){
		
		tab.push(i);
		
	}
	
	for ( i in tab ){
		alert(tab[i]);
	}
	
	
	console.log(tab);
	
	var obj = Object();
	
	obj = { 
		"un": 1,
		"deux":2,
		"trois":3
	}
	
	console.log(obj["deux"]);
	
	obj["quatre"] = 4;
	
	console.log(obj);
	
	for ( key in obj ){
		alert(key);
		alert(obj[key]);
	}*/
	
	});