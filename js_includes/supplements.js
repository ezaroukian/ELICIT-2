
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

//from shuffle.js, trying to make work online
var condName; //Hoping to have this global to reference in html
// instead of latin square, items = [ [["type","condition"], {...}], ...  ] 
//function balanceConditions(arrayOfArrays, counter) { 
function latinSquare(arrayOfArrays, counter) { 
	var record = { };
    var idx = counter;
	//Determine number of conditions
	var allConds = [];
	for (var i = 0; i < arrayOfArrays.length; ++i) { //for each item in items 
		//console.log(arrayOfArrays[i][0].group[0]);
		allConds.push(arrayOfArrays[i][0].group[0]);
	}
	var conds = jQuery.unique(allConds);
	var numConds = conds.length;//not sure if jQuery will work here 
	//map condition name/number to a number 
	for (var i = 0; i < numConds; ++i){ 
		record[conds[i]] = i; 
		console.log(conds[i]+": "+i+", "+record[conds[i]]);
	} 
	//console.log(record);
	//Pick the right items for the condition determined by the counter (including items not marked for condition) 
	var cond = counter % numConds; //Pick 'random' (sequential) condition number for this participant
	condName = Object.keys(record)[cond];
	console.log("Condition selected: "+condName+", "+cond);
    var a = new Array(arrayOfArrays.length);
	//arrayOfArrays seems like [ [cond 1 item, cond 1 item, ...], [cond 2 item, ...]]
	//console.log(arrayOfArrays);
    for (var i = 0; i < arrayOfArrays.length; ++i) { 
		if(arrayOfArrays[i][0].group[0] == null || record[arrayOfArrays[i][0].group[0]] == cond){ //look up mapped
			//console.log(arrayOfArrays[i]);//arrayOfArrays[i] looks like an array of items in a given condition
			a = arrayOfArrays[i]; 
		}
	} 
	return a; //array of arrays for this condition //Do I need a record?
}