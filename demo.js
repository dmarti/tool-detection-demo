function logMessage(msg) {
	// Log a messages to the console and the messages area on the page
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
	} else {
		sendEvent("trackerblocked");
	}

	// basic ad blocker check: is the parent element of a banner ad
	// large enough to contain it?
	var adElement = document.getElementById('banner');
	if (adElement.parentElement.scrollHeight > 1) {
		sendEvent("noadblock");
	} else {
		sendEvent("adblock");
		// whitelist check: will a small image from the "Acceptable Ads" list
		// load, even though an ad blocker is running?
		var acceptable_ad = document.createElement('img');
		acceptable_ad.onload = function(){ sendEvent("whitelist") };
		acceptable_ad.src = "https://yieldkit.com/favicon.ico";
	}
}

function setup(ev) {
	logMessage("demo script loaded. Waiting for third-party scripts.");
	setTimeout(runTest, 5000);
}

window.addEventListener("load", setup);
