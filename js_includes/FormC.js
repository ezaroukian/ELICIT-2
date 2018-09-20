/* This software is licensed under a BSD license; see the LICENSE file for details. */
var saveForLater;//Sorry, global varable to share answers

define_ibex_controller({
name: "FormC",

jqueryWidget: {
    _init: function () {
        this.cssPrefix = this.options._cssPrefix;
        this.finishedCallback = this.options._finishedCallback;
        this.utils = this.options._utils;

        this.html = dget(this.options, "html"); if(this.html!==undefined && this.html.include!==undefined){console.log(this.html.include);var htmlName=this.html.include;}else{var htmlName = "none"}
        this.continueOnReturn = dget(this.options, "continueOnReturn", false);
        this.continueMessage = dget(this.options, "continueMessage", "Click here to continue");
        this.checkedValue = dget(this.options, "checkedValue", "yes");
        this.uncheckedValue = dget(this.options, "uncheckedValue", "no");
        this.validators = dget(this.options, "validators", { });
        this.errorCSSClass = dget(this.options, "errorCSSClass", "error");
        this.saveReactionTime = dget(this.options, "saveReactionTime", false);
        this.obligatoryErrorGenerator =
            dget(this.options, "obligatoryErrorGenerator",
                 function (field) { return "The \u2018" + field + "\u2019 field is obligatory."; });
        this.obligatoryCheckboxErrorGenerator =
            dget(this.options, "obligatoryCheckboxErrorGenerator",
                 function (field) { return "You must check the " + field + " checkbox to continue."; });
        this.obligatoryRadioErrorGenerator =
            dget(this.options, "obligatoryRadioErrorGenerator",
                 function (field) { return "You must select an option for \u2018" + field + "\u2019."; });
		this.timeout = dget(this.options, "timeout", null);//to add timeout
		this.continueFix = dget(this.options,"continueFix", null);//to add option for continue location
		
		var correctField = "Whether or not answer was correct (NULL if N/A)";//to add correct/incorrect
		//--------------------------------------------------------------------------------------------

        var t = this;

        function alertOrAddError(name, error) {
            var ae = $("label." + escape(t.errorCSSClass) + "[for=__ALL_FIELDS__]");
            if (ae.length > 0) {
                ae.addClass(t.cssPrefix + "error-text").text(error);
                return;
            }

            var e = $("label." + escape(t.errorCSSClass) + "[for=" + escape(name) + "]");
            if (e.length > 0)
                e.addClass(t.cssPrefix + "error-text").text(error);
            else 
                alert(error);
        }

        var HAS_LOADED = false;
		

        function handleClick(dom) {
            return function (e) {
                var answerTime = new Date().getTime();

                e.preventDefault();
                if (! HAS_LOADED) return;

                // Get rid of any previous errors.
                $("." + t.cssPrefix + "error-text").empty();

                var rlines = [];

                var inps = $(dom).find("input[type=text]");
                var tas = $(dom).find("textarea");
                for (var i = 0; i < tas.length; ++i) { inps.push(tas[i]); }
				var ninps = $(dom).find("input[type=number]");//adding for number
				//console.log("Ninps: "+ninps+", "+ninps.length);
				if(ninps.length>0){inps.push(ninps);}


                for (var i = 0; i < inps.length; ++i) {
                    var inp = $(inps[i]);

                    if (inp.hasClass("obligatory") && ((! inp.attr('value')) || inp.attr('value').match(/^\s*$/))) {
                        alertOrAddError(inp.attr('name'), t.obligatoryErrorGenerator(inp.attr('name')));
                        return;
                    }

                    if (t.validators[inp.attr('name')]) {
                        var er = t.validators[inp.attr('name')](inp.attr('value'));
                        if (typeof(er) == "string") {
                            alertOrAddError(inp.attr('name'), er);
                            return;
                        }
                    }

                    rlines.push([["Field name", csv_url_encode(inp.attr('name'))],
                                 ["Field value", csv_url_encode(inp.attr('value'))]]);
                }
				

                var checks = $(dom).find("input[type=checkbox]");
                for (var i = 0; i < checks.length; ++i) {
                    var check = $(checks[i]);
 
                    // Checkboxes with the 'obligatory' class must be checked.
                    if (! check.attr('checked') && check.hasClass('obligatory')) {
                        alertOrAddError(check.attr('name'), t.obligatoryCheckboxErrorGenerator(check.attr('name')));
                        return;
                    }

                    rlines.push([["Field name", check.attr('name')],
                                 ["Field value", check.attr('checked') ? t.checkedValue : t.uncheckedValue]]);
                }

                var rads = $(dom).find("input[type=radio]");
				//Add dropdown
				var drops = $(dom).find("select");
                for (var i = 0; i < drops.length; ++i) {
                    var drop = $(drops[i]);
                    if (drop.hasClass("obligatory") && ((! drop.attr('value')) || drop.attr('value').match(/^\s*$/))) {
                        alertOrAddError(drop.attr('name'), t.obligatoryErrorGenerator(drop.attr('name')));
                        return;
                    }

                    if (t.validators[drop.attr('name')]) {
                        var er = t.validators[drop.attr('name')](drop.attr('value'));
                        if (typeof(er) == "string") {
                            alertOrAddError(drop.attr('name'), er);
                            return;
                        }
                    }
					
                    rlines.push([["Field name", drop.attr('name')],   
                                 ["Field value", drop.attr('value')],
								 ["Field text", drop.find('option:selected').text()],
								 ["Field correct text", drop.find("option[value*='*']").text()], 
								 ["Field correct", drop.attr('value').slice(-1)=="*"],
								// ["_REACTION_TIME_",  "time"]
								// ["_REACTION_TIME_",  answerTime - t.creationTime]
								 ["Html",htmlName]
								 ]);

				}
				
				
				saveForLater=rlines;				
				//End dropdown
                // Sort by name.
                var rgs = { };
                for (var i = 0; i < rads.length; ++i) {
                    var rad = $(rads[i]);
                    if (rad.attr('name')) {
                        if (! rgs[rad.attr('name')])
                            rgs[rad.attr('name')] = [];
                        rgs[rad.attr('name')].push(rad);
                    }
                }
                for (k in rgs) {
                    // Check if it's oblig.
                    var oblig = false;
                    var oneIsSelected = false;
                    var oneThatWasSelected;
                    var val;
                    for (var i = 0; i < rgs[k].length; ++i) {
                        if (rgs[k][i].hasClass('obligatory')) oblig = true;
                        if (rgs[k][i].attr('checked')) {
                            oneIsSelected = true;
                            oneThatWasSelected = i;
                            val = rgs[k][i].attr('value');
                        }
                    }
                    if (oblig && (! oneIsSelected)) {
                        alertOrAddError(rgs[k][0].attr('name'), t.obligatoryRadioErrorGenerator(rgs[k][0].attr('name')));
                        return;
                    }
                    if (oneIsSelected) {
                        rlines.push([["Field name", rgs[k][0].attr('name')],
                                     ["Field value", rgs[k][oneThatWasSelected].attr('value')]]);
                    }
                }

                if (t.saveReactionTime) {
                    rlines.push([["Field name", "_REACTION_TIME_"],
                                 ["Field value", answerTime - t.creationTime]]);
                }
                t.finishedCallback(rlines);
            }
        }

        var dom = htmlCodeToDOM(this.html, function (dom) {
            HAS_LOADED = true;

            if (t.continueOnReturn) {
                t.safeBind($(dom).find("input[type=text]"), 'keydown', function (e) { if (e.keyCode == 13) { console.log("H"); return handler(e);  } });
            }
        });
        var handler = handleClick(dom);
		
        this.element.append(dom);

		//added for optional location
        if (this.continueMessage) {//console.log(this.continueFix);
			if (this.continueFix!=null || this.continueFix=="fixed") {
				this.element.append($("<p>").append($("<a>").attr('href', '').text("\u2192 " + this.continueMessage)
													.css({'position': 'fixed', 'bottom': '30',  'float': 'clear'/*, 'background-color': 'white', 'width': '650px', 'padding': '16px', 'margin-left': '-16px', 'opacity': '0.95'*/})//Added for fixed behavior
													.addClass(ibex_controller_name_to_css_prefix("Message") + "continue-link")
													.click(handler)));
			}
			else {
				this.element.append($("<p>").append($("<a>").attr('href', '').text("\u2192 " + this.continueMessage)
												.css('float', 'clear')
                                                .addClass(ibex_controller_name_to_css_prefix("Message") + "continue-link")
                                                .click(handler)));
			}
        }


		
        this.creationTime = new Date().getTime();
		
		//add timeout attempt
		if (this.timeout) {
            var t = this;
            this.utils.setTimeout(function () {
                var answerTime = new Date().getTime();
				/////From on click
				rlines = [];
				var drops = $(dom).find("select");
                for (var i = 0; i < drops.length; ++i) {
                    var drop = $(drops[i]);
					drop.find('option:selected')
					function checkValue(sel){
						if(sel.val()==''){
							return ' &lt;no response&gt;';
							}
						else{
							return sel.text();
							}
					}
                    rlines.push([["Field name", drop.attr('name')],
                                 ["Field value", drop.attr('value')],
								 ["Field text", checkValue(drop.find('option:selected'))],
								 ["Field correct text", drop.find("option[value*='*']").text()], 
								 ["Field correct", drop.attr('value').slice(-1)=="*"],
								 ["_REACTION_TIME_", "timed-out"]
								 ]);								 
				}
				saveForLater=rlines;					
				/////
                t.finishedCallback(rlines);//handleClick(dom) for rlines?        ///////
            }, this.timeout);
        }
    }
	
},

properties: {
    obligatory: ["html"],
    countsForProgressBar: true,
	timeout: 20*60,
    htmlDescription: function (opts) {
        return htmlCodeToDOM(opts.html);
    }
}
});