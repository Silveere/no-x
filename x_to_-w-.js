// ==UserScript==
// @name         =w=
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  =w= to replace x
// @author       You
// @match        https://*.twitter.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=twitter.com
// @grant        none
// @license      MIT
// ==/UserScript==

(function() {
    setInterval(() => {
        const logo = document.querySelector("[aria-label = \"Twitter\"]");
        const div = logo.querySelector('div');
        if (div) {
            div.innerHTML = "=w=";
            }
    }, 25);
})();