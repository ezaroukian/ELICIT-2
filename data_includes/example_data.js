//var shuffleSequence = seq("intro", sepWith("sep", seq("practice", rshuffle("s1", "s2"))), sepWith("sep", rshuffle("q1", "q2")));
var shuffleSequence = seq(followEachWith("test-after", "testing"),"comments");
//var practiceItemTypes = ["practice"];

var defaults = [
 
    "Message", {
        hideProgressBar: false,
		countsForProgressBar: true,
		//continueMessage: "Click here to submit scenario"
    },
    "FormC", {
        hideProgressBar: false,
		countsForProgressBar: true,
        continueOnReturn: false,
		continueMessage:  "Click here to submit answers for this scenario (should this not stay fixed?)",
        saveReactionTime: true
    }
];

var items = [
//	["inst", "Message", {
//		html: {include: "instructions.html"},
//		hideProgressBar: false,
//		countsForProgressBar: true
//		}
//	],
//	["inst", "Form", {
//			html: { include: "questionnaire.html"},
//			countsForProgressBar: true,
//			hideProgressBar: false	
//		}
//	],
	["testing", "FormC", {html: {include: "train-p.html"}}],
//	["testing", "FormC", {html: {include: "train-m.html"}}],
//	["testing", "FormC", {html: {include: "scen1-m.html"}}],
	["test-after", "Message", { html: {include: 'test.confirm.html'}} ],
	
	['comments', 'Form', {'html': "<h1>How did you do it?</h1><p>Please describe any strategies you used to understand the scenario and answer the questions.</p> <textarea name='comments' rows='4' cols='50' class='obligatory'></textarea> <br><br> <p>Did you take any notes in the process of solving the task/scenarios?</p> <input type='radio' name='notes' id='yes' class='obligatory'  value='Yes'><label for='yes'>Yes</label><br> <input type='radio' name='notes' id='no' value='No'><label for='no'>No</label><br>"}],//Add labels, maybe make an include

];

k = Math.random();
console.log(k);
if(k<.5){
	items=items.concat(	[["end.a", "Form", {
		html: { include: "TLX.html"},//from TLXa
		obligatoryRadioErrorGenerator: function myFunction(f) {
			switch(f){
				case("mental"):
					return "Please respond to the 1st question before continuing.";
				case("physical"):
					return "Please respond to the 2nd question before continuing.";
				case("temp"):
					return "Please respond to the 3rd question before continuing.";
				case("success"):
					return "Please respond to the 4th question before continuing.";
				case("perf"):
					return "Please respond to the 5th question before continuing.";
				case("stress"):
					return "Please respond to the 6th question before continuing.";
				case("preference"):
					return "Please respond to the 7th question before continuing.";
				default:
					return "Please respond to all questions before continuing.";
			}
		},
		countsForProgressBar: true,
		hideProgressBar: false		
	}]]);
	shuffleSequence = seq(shuffleSequence, "end.a");
}
else{
	items = items.concat(	[["end.b", "Form", {
		html: { include: "TLX.html"},//from TLXb
		obligatoryRadioErrorGenerator: function myFunction(f) {
			switch(f){
				case("mental"):
					return "Please respond to the 1st question before continuing.";
				case("physical"):
					return "Please respond to the 2nd question before continuing.";
				case("temp"):
					return "Please respond to the 3rd question before continuing.";
				case("success"):
					return "Please respond to the 4th question before continuing.";
				case("perf"):
					return "Please respond to the 5th question before continuing.";
				case("stress"):
					return "Please respond to the 6th question before continuing.";
				case("preference"):
					return "Please respond to the 7th question before continuing.";
				default:
					return "Please respond to all questions before continuing.";
			}
		},
		countsForProgressBar: true,
		hideProgressBar: false		
	}]])
	shuffleSequence = seq(shuffleSequence, "end.b");
}
//then add send results for all?
shuffleSequence = seq(shuffleSequence, "end.all");
	