// ==UserScript==
// @name         Shop ease
// @namespace    http://tampermonkey.net/
// @version      3.0.1
// @run-at       document-start
// @description  Makes shop/chat log opening and closing look nicer
// @author       SArpnt
// @match        https://boxcritters.com/play/
// @match        https://boxcritters.com/play/?*
// @match        https://boxcritters.com/play/#*
// @match        https://boxcritters.com/play/index.html
// @match        https://boxcritters.com/play/index.html?*
// @match        https://boxcritters.com/play/index.html#*
// @grant        none
// @require      https://github.com/SArpnt/joinFunction/raw/master/script.js
// @require      https://github.com/SArpnt/EventHandler/raw/master/script.js
// @require      https://github.com/SArpnt/cardboard/raw/master/script.user.js
// ==/UserScript==

(function () {
	'use strict';
	cardboard.register('shopEase');

	cardboard.on('loadScriptClient', function (t) {
		t.innerHTML = t.innerHTML.replace(
			/shop\.x\s*=\s*this\.width\s*-\s*shop\.width\s*\*\s*o/,
			`shop.x = this.width,
			createjs.Tween.get(shop, { override: true })
				.to({ x: this.width - shop.width * o }, 300, createjs.Ease.cubicOut)`
		).replace(
			/e\.x\s*=\s*this\.width\s*-\s*e.width\s*\*\s*i/,
			`e.x = this.width,
			createjs.Tween.get(e, { override: true })
				.to({ x: this.width - e.width * i }, 300, createjs.Ease.cubicOut)`
		).replace(
			/(d|o)\.on\s*\(\s*["'`]click["'`]\s*,\s*\(?\s*function\s*\(\)\s*\{\s*this\.parent\.removeChild\s*\(\s*this\s*\)\s*[,;]?\s*\}\s*\)?\s*,\s*this\s*\)/g,
			(_,f)=>`${f}.on("click", function () {
				createjs.Tween.get(this, { override: true })
					.to({ x: this.stage.width }, 300, createjs.Ease.cubicIn)
					.call(function () { this.parent.removeChild(this); });
			}, this)`
		);
	});
})();