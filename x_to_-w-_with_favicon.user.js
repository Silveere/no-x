// ==UserScript==
// @name         =w= with favicon
// @namespace    https://gist.github.com/Silveere/091f7839397579fbce243a9d61b96297
// @version      0.1
// @description  =w= icon to replace x
// @author       qatoqat, NullBite
// @author       You
// @match        https://*.twitter.com/*
// @match        https://*.x.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=twitter.com
// @grant        none
// @license      MIT
// @run-at       document-idle

// ==/UserScript==

(function() {
    // ---Configuration---
    // Define an array of faces
    const faces = ["=w=", "uwu", "^-^"];

    // Set the interval time (in milliseconds) to change the face
    const intervalTime = 7000; // Change this to set the interval time (e.g., 1000 for 1 second)

    // whether or not to also change the favicon
    const change_favicon = true;


    // load at first time
    let done_first_load = false;

    // Canvas for rendering favicons
    const faviconCanvas=document.createElement('canvas');

    // Function to generate icon canvas
    function faceIcon(face) {
        let canvas=faviconCanvas;

        canvas.width=16;
        canvas.height=16;
        let ctx=canvas.getContext('2d');
        // black background
        ctx.fillStyle="black";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // face
        ctx.fillStyle="white";
        ctx.font=(canvas.height*0.4) + "px TwitterChirp, sans-serif";
        ctx.textAlign="center";
        ctx.textBaseline="middle";
        ctx.textRendering="geometricPrecision";
        ctx.fillText(face, canvas.width/2, canvas.height/2);

        return canvas.toDataURL("image/x-icon");
    }

    // Function to update favicon with face
    function updateFavicon(face) {
        let favicon=document.querySelector('link[rel~=icon]');
        if (!favicon) {
            favicon=document.createElement("link");
            favicon.rel='icon shortcut';
            document.head.appendChild(favicon);
        }
        favicon.href=faceIcon(face);
    }

    // Function to set the face in the div
    function setFace() {
        // Get a random index to select a random face from the array
        const randomIndex = Math.floor(Math.random() * faces.length);

        const anchor = document.querySelector('a[aria-label="Twitter"][href="/home"]');
        if (anchor) {
            const div = anchor.querySelector('div');
            if (div) {
                if (!done_first_load){
                    done_first_load = true;
                }

                // Update the div's innerHTML with the random face
                div.innerHTML = faces[randomIndex];
            }
        }

        if (change_favicon) {
            updateFavicon(faces[randomIndex]);
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
                        if (addedNode.nodeType === Node.ELEMENT_NODE && ['A', 'LINK'].includes(addedNode.tagName)) {
                            let anchor = addedNode;
                            if ((anchor.getAttribute('aria-label') === 'Twitter' && anchor.getAttribute('href') === '/home') || anchor.getAttribute("rel").includes('icon')){
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
