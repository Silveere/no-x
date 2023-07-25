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
// @run-at       document-start

// ==/UserScript==

(function() {
    // Define an array of faces
    const faces = ["=w=", "uwu", "^-^"];

    // Set the interval time (in milliseconds) to change the face
    const intervalTime = 7000; // Change this to set the interval time (e.g., 1000 for 1 second)

    // load at first time
    let done_first_load = false;

    // Function to set the face in the div
    function setFace() {
        const anchor = document.querySelector('a[aria-label="Twitter"][href="/home"]');
        if (anchor) {
            const div = anchor.querySelector('div');
            if (div) {
                if (!done_first_load){
                    done_first_load = true;
                }
                // Get a random index to select a random face from the array
                const randomIndex = Math.floor(Math.random() * faces.length);

                // Update the div's innerHTML with the random face
                div.innerHTML = faces[randomIndex];
            }
        }
    }



    // MutationObserver callback function
    const observerCallback = function(mutationsList) {
        if (!done_first_load){
            setFace();
        }else{
            for (const mutation of mutationsList) {
                if (mutation.type === 'childList') {
                    for (const addedNode of mutation.addedNodes) {
                        if (addedNode.nodeType === Node.ELEMENT_NODE && addedNode.tagName === 'A') {
                            const anchor = addedNode;
                            if (anchor.getAttribute('aria-label') === 'Twitter' && anchor.getAttribute('href') === '/home') {
                                setFace();
                            }
                        }
                    }
                }
            }
        }
    };

    // Create a new MutationObserver instance
    const observer = new MutationObserver(observerCallback);

    // Start the observer on the document body, and only observe anchor elements and their descendants
    observer.observe(document.body, { childList: true, subtree: true });

    // Set an interval to update the face periodically
    setInterval(setFace, intervalTime);
})();
