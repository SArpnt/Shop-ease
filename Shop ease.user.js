// ==UserScript==
// @name         Shop ease
// @namespace    http://tampermonkey.net/
// @version      2.0.0
// @run-at       document-start
// @description  Makes shop opening and closing look nicer
// @author       SArpnt
// @match        https://boxcritters.com/play/
// @match        https://boxcritters.com/play/?*
// @match        https://boxcritters.com/play/#*
// @match        https://boxcritters.com/play/index.html
// @match        https://boxcritters.com/play/index.html?*
// @match        https://boxcritters.com/play/index.html#*
// @grant        none
// @require      https://code.jquery.com/jquery-3.5.1.min.js
// @require      https://github.com/SArpnt/joinFunction/raw/master/script.js
// @require      https://github.com/SArpnt/EventHandler/raw/master/script.js
// @require      https://github.com/SArpnt/cardboard/raw/master/script.user.js
// ==/UserScript==

(function () {
	'use strict';

	cardboard.on('loadScriptClient', function (t) {
		t.innerHTML = t.innerHTML.replace(
			/shop\.x\s*=\s*this\.width\s*-\s*shop\.width\s*\*\s*o/,
			`shop.x = this.width,
			createjs.Tween.get(shop, { override: true })
				.to({ x: this.width - shop.width * o }, 300, createjs.Ease.cubicOut)`
		).replace(
			/d\.on\s*\(\s*["'`]click["'`]\s*,\s*\(?\s*function\s*\(\)\s*\{\s*this\.parent\.removeChild\s*\(\s*this\s*\)\s*[,;]?\s*\}\s*\)?\s*,\s*this\s*\)/,
			`d.on("click", function () {
				createjs.Tween.get(this, { override: true })
					.to({ x: this.stage.width }, 300, createjs.Ease.cubicIn)
					.call(function () { this.parent.removeChild(this); });
			}, this)`
		);
	});
})();