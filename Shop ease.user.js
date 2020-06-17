// ==UserScript==
// @name         Shop ease
// @namespace    http://tampermonkey.net/
// @version      1.0.0
// @run-at       document-start
// @description  Makes shop opening and closing look nicer
// @author       SArpnt
// @match        https://play.boxcritters.com/*
// @grant        none
// @require      https://code.jquery.com/jquery-3.5.1.min.js
// @require      https://github.com/sarpnt/joinFunction/raw/master/script.js
// @require      https://github.com/sarpnt/EventHandler/raw/master/script.js
// @require      https://github.com/SArpnt/cardboard/raw/master/script.user.js
// ==/UserScript==

(function () {
	'use strict';

	cardboard.on('loadScriptClient', function (t) {
		t.innerHTML = t.innerHTML.replace(
			/e.x\s*=\s*this.width\s*-\s*e.width\s*\*\s*o,/,
			`e.x = this.width,
			createjs.Tween.get(e, { override: true })
				.to({ x: this.width - e.width * o }, 300, createjs.Ease.cubicOut),`
		).replace(
			/y\.on\s*\(\s*["'`]click["'`]\s*,\s*\(\s*function\s*\(\)\s*{\s*this\.parent\.removeChild\s*\(\s*this\s*\)\s*[,;]?\s*}\s*\)\s*,\s*this\s*\)/,
			`y.on("click", function () {
				createjs.Tween.get(this, { override: true })
					.to({ x: this.stage.width }, 300, createjs.Ease.cubicIn)
					.call(function () { this.parent.removeChild(this); });
			}, this);`
		);
	});
})();