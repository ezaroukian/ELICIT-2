
function loadFiles(rootName, condition){
	var rawgit = "https://rawgit.com/ezaroukian/ELICIT-2/master/www/";
	var scenarioFile = rawgit+rootName+".html";
	var answerFile = rawgit+rootName+".ans.html";
	
	console.log("Loading "+scenarioFile+", "+answerFile);
	
	if(condition=="orig"){
		console.log($(".ELICIT-who"));
		console.log(document.getElementsByClassName("ELICIT-who"));
		
		//var x = element.getElementsByClassName('ELICIT-who');
		//alert("before: " + x.length);
		//while(x.length > 0) {
		//	x[0].className = 'ELICIT-when';  
		//}
		//alert("after: " + x[0].className);
		//var whoVar = "ELICIT-when";
		//$('head').append('<style> .ELICIT-who {background-color: white;	color: black;} </style>');
		console.log("Wiping out ELICIT markup, ");
	}
	
	
	$.getScript(rawgit+"clock.js", function( data, textStatus, jqxhr ) {
		console.log( "Clock loading: " + textStatus + ", " + jqxhr.status );
		//console.log( data ); // Data returned
	});

    
	$("#includedScenario").load(scenarioFile, function( data, textStatus, jqxhr ) {
		console.log( "Scenario loading: " + textStatus + ", " + jqxhr.status );
		//console.log( data ); // Data returned
		//remove markup if not markup condition
		if(condition=="orig"){
			$(".ELICIT-who").removeClass("ELICIT-who");
			$(".ELICIT-what").removeClass("ELICIT-what");
			$(".ELICIT-where").removeClass("ELICIT-where");
			$(".ELICIT-when").removeClass("ELICIT-when");
		}
	}); 
	
	
    $("#includedAns").load(answerFile, function( data, textStatus, jqxhr ) {
		console.log( "Answers loading: " + textStatus + ", " + jqxhr.status );
		//console.log( data ); // Data returned
	}); 
		
	console.log("loadFiles() finished");
}
