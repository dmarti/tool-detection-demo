function logMessage(msg) {
	// Log a messages to the console and the messages area
	console.log(msg);
	var messages = document.getElementById('messages');
	var el = document.createElement('p');
	el.innerHTML = msg;
	messages.appendChild(el);
}

function googlePresent() {
	// true if Google Analytics is present
	if (window.ga && ga.loaded) {
		return true;
	}
	logMessage("Google Analytics not found on this page.");
	return false;
}

function sendEvent(eventName) {
	if(!googlePresent()) {
		return;
	}
	logMessage("Sending event to GA: " + eventName);
	ga('send', {
		hitType: 'event',
		eventCategory: 'aloodo',
		eventAction: eventName
	});
}

function setup(ev) {
	logMessage("demo script loaded.");
	if(typeof aloodo === 'object') {
		aloodo.onLoad(function() {sendEvent("loaded")});
		aloodo.onBlocked(function() {sendEvent("blocked")});
		aloodo.onDetected(function() {sendEvent("tracking")});	
	}
}

window.addEventListener("load", setup);
