var adElement;

function logMessage(msg) {
	// Log a messages to the console and the messages area
	console.log(msg);
	var messages = document.getElementById('messages');
	var el = document.createElement('p');
	el.innerHTML = msg;
	messages.appendChild(el);
}

function sendEvent(eventName) {
	if(!window.ga) {
		logMessage("Google Analytics not found. Not sending event: " + eventName);
		return;
	}
	logMessage("Sending event to GA: " + eventName);
	ga('send', {
		hitType: 'event',
		eventCategory: 'aloodo',
		eventAction: eventName
	});
}

function runTest(ev) {
	if(typeof aloodo === 'object') {
		aloodo.onLoad(function() {sendEvent("loaded")});
		aloodo.onBlocked(function() {sendEvent("cookieblocked")});
		aloodo.onDetected(function() {sendEvent("tracking")});	
	}

	adElement = document.getElementById('banner');
	console.log(adElement);
	if (adElement.parentElement.scrollHeight > 1) {
		sendEvent("noadblock");
	} else {
		sendEvent("adblock");
		var acceptable_ad = document.createElement('img');
		acceptable_ad.onload = function(){ sendEvent("whitelist") };
		acceptable_ad.src = "https://yieldkit.com/favicon.ico";
	}
}

function setup(ev) {
	logMessage("demo script loaded.");
	setTimeout(runTest, 2000);
}

window.addEventListener("load", setup);
