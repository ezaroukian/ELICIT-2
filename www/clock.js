
var timeInSeconds = 20*60; 
var currentTime = Date.parse(new Date()); 
var deadline = new Date(currentTime + timeInSeconds*1000); 
function getTimeRemaining(endtime){  
	var t = Date.parse(endtime) - Date.parse(new Date());  
	var minutes = Math.floor( (t/(1000*60)) ); 
	var seconds = Math.floor( (t/1000) % 60 ); 
	if(seconds<0){seconds=0;}  return {    "total": t, "minutes":minutes,   "seconds": seconds  };}

	
function updateClock(){
  var t = getTimeRemaining(deadline);
	try{ 
		if(t.minutes<=0 & t.seconds<=0){clearInterval(intervalId );} 
		else{
			if(t.minutes==0 & t.seconds%2==1){document.getElementById("includedClock").innerHTML = "<span style='font-weight:bold;color:red'>Time remaining:</span> " + t.minutes+":"+('0' + t.seconds).slice(-2);}
			else{document.getElementById("includedClock").innerHTML = "<span style='font-weight:bold;'>Time remaining:</span> " + t.minutes+":"+('0' + t.seconds).slice(-2);}
		}
	} 
	catch(err){}
}
updateClock(); // run function once at first to avoid delay
var timeinterval = setInterval(updateClock,1000);

