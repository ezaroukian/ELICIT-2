
function loadFiles(rootName, condition){
	var rawgit = "https://rawgit.com/ezaroukian/ELICIT-2/master/www/";
	var scenarioFile = rawgit+rootName+"."+condition+".html";
	var answerFile = rawgit+rootName+".ans.html";
	
	console.log("Loading "+scenarioFile+", "+answerFile);
	
	$.getScript(rawgit+"clock.js", function( data, textStatus, jqxhr ) {
		console.log( "Clock loading: " + textStatus + ", " + jqxhr.status );
		//console.log( data ); // Data returned
	});

    
	$("#includedScenario").load(scenarioFile, function( data, textStatus, jqxhr ) {
		  console.log( "Scenario loading: " + textStatus + ", " + jqxhr.status );
		  //console.log( data ); // Data returned
		}); 
	
    $("#includedAns").load(answerFile, function( data, textStatus, jqxhr ) {
		  console.log( "Answers loading: " + textStatus + ", " + jqxhr.status );
		  //console.log( data ); // Data returned
		}); 
		
	console.log("loadFiles() finished");
}
