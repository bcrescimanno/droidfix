/**
 * droidfix.js
 * @author Brian Crescimanno <brian.crescimanno@gmail.com>
 * @version 0.1
 * @date October 20, 2010 
 *
 * Adds a set of event listeners so the droid fires the "ended" and "pause" events
 * correctly on the android platform.
 * 
 * Licensed under an MIT-style license
 * http://www.opensource.org/licenses/mit-license.html
 * 
 */
var droidfix = (function() {
	var el,
		ALLOWED_GAP = 2,
		lastTime = ALLOWED_GAP + 1,
		callbacks = [];
	
	function init(element) {
		el = (typeof element === "string") ? document.getElementById(element) : element;
		if(!el) return false;
		
		addEventListeners();
	}
	
	function addEventListeners() {
		el.addEventListener("timeupdate", timeUpdate, false);
		el.addEventListener("ended", ended, false);
	}
	
	function timeUpdate(e) {
		lastTime = Math.max(lastTime, el.currentTime);
	}
	
	function checkAndroidEnd() {
		return ((el.duration - lastTime) < ALLOWED_GAP) && (el.currentTime === 0);
	}
	
	function ended(e) {
		var complete = (el.currentTime === el.duration);
		if(complete || checkAndroidEnd()) {
			executeEndCallbacks(e);
		} else {
			triggerPause();
		}
	}
	
	function addEndListener(fn) {
		if(typeof fn === "function") {
			callbacks.push(fn);
		}
	}
	
	function executeEndCallbacks(e) {
		for(var fn in callbacks) {
			callbacks[fn](e);
		}
	}
	
	function triggerPause() {
		var e = document.createEvent("Events");
		e.initEvent("pause", true, true);
		el.dispatchEvent(e);
	}
	
	return {
		init: init,
		addEndListener : addEndListener
	}
	
})();