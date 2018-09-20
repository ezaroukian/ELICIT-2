//var shuffleSequence = seq("intro", sepWith("sep", seq("practice", rshuffle("s1", "s2"))), sepWith("sep", rshuffle("q1", "q2")));

//var shuffleSequence = seq("setcounter","inst",followEachWith("afterScen", "training"),"trust",followEachWith("afterScen", randomize("testing")),"trust","comments");

var shuffleSequence = seq("setcounter","inst","introTrainingP","trainingP","afterScen","introTrainingM","trainingM","afterScen","trust","introTest",followEachWith("afterScen", randomize("testing")),"trust","comments");

//var shuffleSequence = seq(followEachWith("afterScen", "training"),"trust",followEachWith("afterScen", "testing"),"trust","comments");
//var practiceItemTypes = ["practice"];

//var  shuffleSequence = seq("setcounter","training","testing");//playing with randomization

var defaults = [
 
    "Message", {
        hideProgressBar: false,
		countsForProgressBar: true,
		//continueMessage: "Click here to submit scenario"
    },
	"Form", {
        hideProgressBar: false,
		countsForProgressBar: true,
        continueOnReturn: false,
        saveReactionTime: true
    },
    "FormC", {
        hideProgressBar: false,
		countsForProgressBar: true,
        continueOnReturn: false,
		continueMessage:  "Click here to submit answers for this scenario",
        saveReactionTime: true,
		timeoutForm: 20*60*1000
    }
];

var items = [
	["setcounter", "__SetCounter__", { }], //Increment counter early for better "randomization"

 	["inst", "Form", {
			html: { include: "questionnaire.html"},
			countsForProgressBar: true,
			hideProgressBar: false	
		}
	],
	["inst", "Message", {
		html: {include: "instructions.html"},
		hideProgressBar: false,
		countsForProgressBar: true
		}
	],

	["trainingP", "FormC", {html: {include: "train-p.html"}}],
	["trainingM", "FormC", {html: {include: "train-m.html"}}],
//	["testing", "FormC", {html: {include: "scen4-m.html"}}],
//	["testing", "FormC", {html: {include: "scen1-m.html"}}],
	["afterScen", "Message", { html: {include: 'test.confirm.html'}} ],
	
	["trust", "FormC", {html: {include: "trust.html"}, continueMessage: "Click here to continue"}],
	
	['comments', 'Form', {'html': "<h1>How did you do it?</h1><div class='ELICIT-response'><p style='font-weight:bold'>Please describe any strategies you used to understand the scenario and answer the questions.</p> <textarea name='comments' rows='4' cols='50' class='obligatory'></textarea></div> <br><br> <div class='ELICIT-response'><p style='font-weight:bold'>Did you take any notes in the process of solving the task/scenarios?</p> <input type='radio' name='notes' id='yes' class='obligatory'  value='Yes'><label for='yes'>Yes</label><br> <input type='radio' name='notes' id='no' value='No'><label for='no'>No</label></div><br>"}],//Add labels, maybe make an include

	[["testing","markup"], "FormC", {html: {include: "scen4-m.html"}}],
	[["testing","markup"], "FormC", {html: {include: "scen1-m.html"}}],
	[["testing","plain"], "FormC", {html: {include: "scen4-p.html"}}],
	[["testing","plain"], "FormC", {html: {include: "scen1-p.html"}}],
	
	
	["introTrainingP", "Message", {
		html: "<p>On the next screen you will see a simple practice scenario <b>without markup</b>. Feel free to take as much time as you need to solve this scenario.</p>",
		continueMessage: "Click here to begin the practice scenario"
		}
	],
	["introTrainingM", "Message", {
		html: "<p>On the next screen you will see another simple practice scenario, this time <b>with automatically-generated markup</b>. Feel free to take as much time as you need to solve this scenario.</p>",
		continueMessage: "Click here to begin the practice scenario"
		}
	],
	["introTest", "Message", {
		html: {include: "introTest.html"},
		continueMessage: "Click here to begin the first test scenario"
		}
	],
	["betweenTest", "Message", {
		html: "<p>Feel free to pause here and take a break.</p>",
		continueMessage: "Click here to begin the second and final scenario"
		}
	]


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
	