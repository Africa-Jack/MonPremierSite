$(document).ready(function() {
	
	var blockParam = {
		border: 'none',
		padding: '15px',
		backgroundColor: '#000',
		'-webkit-border-radius': '10px',
		'-moz-border-radius': '10px',
		opacity: .5,
		color: '#fff'
	}
	
	
	function before(){
		$("#wrapper").block({
			message: '<h1>Chargement...</h1>',
	css: blockParam
			});
			
			return "";
	}
	
	function after(json){
		var label_=[];
		var IRSA=[];
		
		for(var i in json.data){
			label_.push(json.data[i].Phyto.Nom);
			IRSA.push(json.data[i].IRSA.Val);
		
		}
/*		alert(label);
		alert(IRSA);*/
		
		var graphData = {
			labels:label_,
			datasets:[{
				fillColor: "rgba(0, 0, 255, 0.5)",
				data: IRSA
				}]
		}
		
		try{
		var graphique = $("#graphic").get(0).getContext("2d");
		}catch(err){
			alert(err.message);
		}
		
		try{
		new Chart(graphique).Bar(graphData, {
			inGraphDataShow: true
			});
		}catch(err){
			alert(err.message);
		}
		
		$("#wrapper").unblock();
		
		return json.data;
	}
	

    var table = null;

    $("#wrapper").hide();

    /*    var cul = "186";*/
    var ci = "3";

	$("#selectCulture").block({
	message: '<h1>Chargement...</h1>',
	css: blockParam
	});
    $.ajax({

        url: "http://80.236.38.190/MonPremierSite/serverSide/getCulture.php?ci=" + ci,
        type: "GET",
        dataType: "html",
        success: function(result) {
            $("#culture").html(result);
			$("#selectCulture").unblock();

        }
    });

    $("#culture").select2();
/*    $("#affTable").button();
*/    $("#culture").change(function() {

        $("#wrapper").show();
        var cul = $("#culture").select2("val");

        if (table == null) {
            
			table = $('#table').dataTable({

                "processing": true,

                "ajax": {
                    "type": "GET",
					"data": before,
                    "url": "http://80.236.38.190/MonPremierSite/serverSide/getTableau.php" + "?cul=" + cul + "&ci=" + ci,
					"dataSrc": after
                },
                "columns": [{
                    "data": "Phyto.Nom"
                }, {
                    "data": "IRSA.Val"
                }, {
                    "data": "IRTE.Val"
                }]
            });
			

        }else{
			


			table.fnReloadAjax("http://80.236.38.190/MonPremierSite/serverSide/getTableau.php" + "?cul=" + cul + "&ci=" + ci);
			

		}
    });
});