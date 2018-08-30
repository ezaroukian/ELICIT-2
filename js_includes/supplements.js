
function loadFiles(rootName, condition){
	var scenarioFile = rootName+"."+condition+".html";
	var answerFile = rootName+".ans.html";
	
	console.log("Loading "+scenarioFile+", "+answerFile);
	
	$.getScript("clock.js", function( data, textStatus, jqxhr ) {
		//console.log( data ); // Data returned
		console.log( "Clock loading: " + textStatus + ", " + jqxhr.status );
	});

    
	$("#includedScenario").load(scenarioFile, function( data, textStatus, jqxhr ) {
		  console.log( data ); // Data returned
		  console.log( "Scenario loading: " + textStatus + ", " + jqxhr.status );
		}); 
	
    $("#includedAns").load(answerFile, function( data, textStatus, jqxhr ) {
		  //console.log( data ); // Data returned
		  console.log( "Answers loading: " + textStatus + ", " + jqxhr.status );
		}); 
		
	console.log("loadFiles() finished");
}
