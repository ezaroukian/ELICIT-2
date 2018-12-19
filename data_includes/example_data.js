//var shuffleSequence = seq("intro", sepWith("sep", seq("practice", rshuffle("s1", "s2"))), sepWith("sep", rshuffle("q1", "q2")));

//var shuffleSequence = seq("setcounter","inst",followEachWith("afterScen", "training"),"trust",followEachWith("afterScen", randomize("testing")),"trust","comments");

var shuffleSequence = seq("setcounter","inst","introTraining.P","training.P","afterScen","introTraining.M","training.M","afterScen","trust-pre","introTest",sepWith("betweenTest",followEachWith("afterScen", randomize("testing"))),"trust-post","comments");

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
		timeout: 20*60
    }
];

var items = [
	["setcounter", "__SetCounter__", { }], //Increment counter early for better "randomization"

 	["inst", "FormC", {
			html: { include: "questionnaire.html"},
			countsForProgressBar: true,
			hideProgressBar: false, 
			timeout: null,
			continueFix: null, 
			continueMessage: "Click here to continue"
		}
	],
	["inst", "FormC", {//Include RT
		html: {include: "instructions.html"},
		hideProgressBar: false,
		countsForProgressBar: true,
		timeout: null, 
		continueMessage: "Click here to continue"
		}
	],

	["training.P", "FormC", {html: {include: "train-p.html"}, timeout: null, continueFix: "fixed"}],
	["training.M", "FormC", {html: {include: "train-m.html"}, timeout: null,continueFix: "fixed"}],
//	["testing", "FormC", {html: {include: "scen4-m.html"}}],
//	["testing", "FormC", {html: {include: "scen1-m.html"}}],
	["afterScen", "Form", { html: {include: 'test.confirm.html', timeout:null}} ],
	
	["trust-pre", "FormC", {html: {include: "trust.html"}, continueMessage: "Click here to continue", timeout:null}],
	
	['comments', 'Form', {'html': "<h1>How did you do it?</h1><div class='ELICIT-response'><p style='font-weight:bold'>Please describe any strategies you used to understand the scenario and answer the questions.</p> <textarea name='comments' rows='4' cols='50' class='obligatory'></textarea></div> <br><br> <div class='ELICIT-response'><p style='font-weight:bold'>Did you take any notes in the process of solving the task/scenarios?</p> <input type='radio' name='notes' id='yes' class='obligatory'  value='Yes'><label for='yes'>Yes</label><br> <input type='radio' name='notes' id='no' value='No'><label for='no'>No</label></div><br>"}],//Add labels, maybe make an include
	['comments', 'FormC', {html: {include: "pilot.html"}, continueMessage: "Click here submit your responses and complete the experiment"}],
	
	[["testing","markup"], "FormC", {html: {include: "scen4-m.html"}, timeout: 20*60*1000,continueFix: "fixed"}],
	[["testing","markup"], "FormC", {html: {include: "scen1-m.html"}, timeout: 20*60*1000,continueFix: "fixed"}],
	[["trust-post","markup"], "FormC", {html: {include: "trust-m.html"}, continueMessage: "Click here to continue", timeout:null}],
	[["testing","plain"], "FormC", {html: {include: "scen4-p.html"}, timeout: 20*60*1000,continueFix: "fixed"}],
	[["testing","plain"], "FormC", {html: {include: "scen1-p.html"}, timeout: 20*60*1000,continueFix: "fixed"}],
	[["trust-post","plain"], "FormC", {html: {include: "trust-p.html"}, continueMessage: "Click here to continue", timeout:null}],
	
	
	["introTraining.P", "Form", {
		html: "<p>On the next screen you will see a simple practice scenario <b>without highlighting</b>. Feel free to take as much time as you need to solve this scenario.</p>",
		continueMessage: "Click here to begin the practice scenario",
		timeout: null
		}
	],
	["introTraining.M", "Form", {
		html: "<p>On the next screen you will see another simple practice scenario, this time <b>with automatically-generated highlighting</b>. Feel free to take as much time as you need to solve this scenario.</p>",
		continueMessage: "Click here to begin the practice scenario"
		}
	],
	["introTest", "Form", {
		html: {include: "introTest.html"},
		continueMessage: "Click here to begin the first test scenario"
		}
	],
	["betweenTest", "Form", {
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
	