// ==UserScript==
// @name        twitter manifest fucker
// @namespace   https://github.com/Silveere/no-x
// @match       https://*.twitter.com/*
// @match       https://*.x.com/*
// @grant       none
// @version     1.0
// @author      NullBite
// @description Replaces the Twitter PWA manifest with one that has the old Twitter icon and app name
// ==/UserScript==
(function() {

	const BETTER_MANIFEST = "data:application/json;base64,"+btoa(JSON.stringify({
		"background_color": "#ffffff",
		"categories": [
			"social",
			"news",
			"magazines"
		],
		"description": "Get breaking news, politics, trending music, world events, sports scores, and the latest global news stories as they unfold - all with less data.",
		"display": "standalone",
		"gcm_sender_id": "49625052041",
		"gcm_user_visible_only": true,
		"icons": [
			{
				"src": "https://abs.twimg.com/responsive-web/client-web/icon-default.ee534d8a.png",
				"sizes": "192x192",
				"type": "image/png"
			},
			{
				"src": "https://abs.twimg.com/responsive-web/client-web/icon-default-large.8e027b69.png",
				"sizes": "512x512",
				"type": "image/png"
			},
			{
				"purpose": "maskable",
				"src": "https://abs.twimg.com/responsive-web/client-web/icon-default-maskable.e8942145.png",
				"sizes": "192x192",
				"type": "image/png"
			},
			{
				"purpose": "maskable",
				"src": "https://abs.twimg.com/responsive-web/client-web/icon-default-maskable-large.ee2b7aaa.png",
				"sizes": "512x512",
				"type": "image/png"
			}
		],
		"name": "Twitter",
		"screenshots": [
			{
				"src": "https://abs.twimg.com/responsive-web/client-web/twitter-lite-data-saver-marketing.6805986a.png",
				"sizes": "586x1041",
				"type": "image/png"
			},
			{
				"src": "https://abs.twimg.com/responsive-web/client-web/twitter-lite-explore-marketing.fd45b02a.png",
				"sizes": "586x1041",
				"type": "image/png"
			},
			{
				"src": "https://abs.twimg.com/responsive-web/client-web/twitter-lite-timeline-marketing.befcdb4a.png",
				"sizes": "586x1041",
				"type": "image/png"
			}
		],
		"share_target": {
			"action": "compose/tweet",
			"enctype": "multipart/form-data",
			"method": "POST",
			"params": {
				"title": "title",
				"text": "text",
				"url": "url",
				"files": [
					{
						"name": "externalMedia",
						"accept": [
							"image/jpeg",
							"image/png",
							"image/gif",
							"video/quicktime",
							"video/mp4"
						]
					}
				]
			}
		},
		"shortcuts": [
			{
				"name": "New post",
				"url": "/compose/tweet?utm_source=jumplist&utm_medium=shortcut",
				"icons": [
					{
						"src": "https://abs.twimg.com/responsive-web/client-web/icon-compose.1238442a.png",
						"type": "image/png",
						"sizes": "192x192"
					}
				]
			},
			{
				"name": "Explore",
				"url": "/explore?utm_source=jumplist&utm_medium=shortcut",
				"icons": [
					{
						"src": "https://abs.twimg.com/responsive-web/client-web/icon-search-stroke.5f9aa88a.png",
						"type": "image/png",
						"sizes": "192x192"
					}
				]
			},
			{
				"name": "Notifications",
				"url": "/notifications?utm_source=jumplist&utm_medium=shortcut",
				"icons": [
					{
						"src": "https://abs.twimg.com/responsive-web/client-web/icon-notifications-stroke.429602da.png",
						"type": "image/png",
						"sizes": "192x192"
					}
				]
			},
			{
				"name": "Direct Messages",
				"url": "/messages?utm_source=jumplist&utm_medium=shortcut",
				"icons": [
					{
						"src": "https://abs.twimg.com/responsive-web/client-web/icon-messages-stroke.5f95edca.png",
						"type": "image/png",
						"sizes": "192x192"
					}
				]
			}
		],
		"short_name": "Twitter",
		"start_url": "https://twitter.com/?utm_source=homescreen&utm_medium=shortcut",
		"theme_color": "#ffffff",
		"scope": "/",
		"android_package_name": "com.twitter.android",
		"prefer_related_applications": true,
		"related_applications": [
			{
				"id": "com.twitter.android",
				"platform": "chromeos_play",
				"url": "https://play.google.com/store/apps/details?id=com.twitter.android"
			}
		],
		"launch_handler": {
			"route_to": "existing-client",
			"navigate_existing_client": "never"
		}
	}));


	// Take the manifest DOM object and change it to be better
	function mutateManifest(manifest) {
		manifest.href=BETTER_MANIFEST;
	}

	// on page load (this should be all that's needed)
	mutateManifest(window.document.querySelector('link[rel=manifest]'));
})();
