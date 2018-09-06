
function loadFiles(rootName, condition){
	//rawgit properly serves raw github files; when using server.py replace with ""
	var rawgit = "https://rawgit.com/ezaroukian/ELICIT-2/master/www/";
	var scenarioFile = rawgit+rootName+".html";
	var answerFile = rawgit+rootName+".ans.html";
	
	console.log("Loading "+scenarioFile+", "+answerFile);

	//Load clock
	$.getScript(rawgit+"clock.js", function( data, textStatus, jqxhr ) {
		console.log( "Clock loading: " + textStatus + ", " + jqxhr.status );
		//console.log( data ); // Data returned
	});

    
	//Load scenario with/without markup per condition
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
	
	
	//Load answers, which point to clock
    $("#includedAns").load(answerFile, function( data, textStatus, jqxhr ) {
		console.log( "Answers loading: " + textStatus + ", " + jqxhr.status );
		//console.log( data ); // Data returned
	}); 
		
	console.log("loadFiles() finished");
}
