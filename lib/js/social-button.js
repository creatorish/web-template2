/*********************************************************************
 *
 * jQuery Social Button JS
 * ソーシャルボタン埋め込みjQueryプラグイン
 * version: 0.1
 * author: yuu@creatorish
 * authro url: http://creatorish.com
 * MIT license. 
 * Copyright 2012 creatorish.com. All Rights Reserved.
 * 
 *********************************************************************/

var _gaq = _gaq || [];
var _ga = _ga || [];
jQuery.fn.socialButton = function(op) {
	var target = this;
	var setting = {
		appId: null,
		status: true,
		cookie: true,
		xfbml: true,
		locale: "ja_JP",
		lang: "ja",
		tracking: true,
		social: {
			facebook: true,
			twitter: true,
			hatena: true,
			pinterest: true,
			google: true
		}
	}
	setting = extendSetting(setting,op);
	var loadedCount = 0;
	var count = 0;
	var API = {
		facebook: "//connect.facebook.net/"+setting.locale+"/all.js",
		twitter: "//platform.twitter.com/widgets.js",
		google: "//apis.google.com/js/plusone.js",
		hatena: "//b.st-hatena.com/js/bookmark_button.js",
		pinterest: "//assets.pinterest.com/js/pinit.js"
	};
	
	if (setting.tracking) {
		setSocialTrackCode();
	}
	
	for (var name in setting.social) {
		++count;
		if (setting.social[name] === true) {
			if (name === "google") {
				window.___gcfg = {lang: setting.lang};
			}
			loadScript(name);
		}
	}
	
	
	function extendSetting(s1,s2) {
		for (var key in s2) {
			if (typeof(s2[key]) === "object") {
				s1[key] = extendSetting(s1[key],s2[key]);
			} else {
				s1[key] = s2[key];
			}
		}
		return s1;
	}
	function loadScript(name) {
		var s = document.createElement('script');
		s.async = true;
		s.src = API[name];
		s.name = name;
		target.get(0).appendChild(s);
		s.onload = loadedScript;
		s.onreadystatechange = function(){
			if(this.readyState === "loaded" || this.readyState === "complete"){
				this.onload();
		    }
		};
	}
	function loadedScript(s) {
		
		++loadedCount;
		if (this.name === "facebook") {
			if (setting.tracking) {
				_ga.trackFacebook();
			}
			if (!setting.appId) {
				setting.status = false;
			}
			FB.init({
				appId      : setting.appId, // App ID
				status     : setting.status, // check login status
				cookie     : setting.cookie, // enable cookies to allow the server to access the session
				xfbml      : setting.xfbml  // parse XFBML
			});
		} else if (this.name === "twitter" && setting.tracking) {
			_ga.trackTwitter();
		}
	}
	function setSocialTrackCode() {
		_ga.getSocialActionTrackers_ = function( network, socialAction, opt_target, opt_pagePath) {
			return function() {
				var trackers = _gat._getTrackers();
				for (var i = 0, tracker; tracker = trackers[i]; i++) {
					tracker._trackSocial(network, socialAction, opt_target, opt_pagePath);
				}
			};
		};
		_ga.trackFacebook = function(opt_pagePath) {
			try {
				if (FB && FB.Event && FB.Event.subscribe) {
					FB.Event.subscribe('edge.create', function(opt_target) {
						_gaq.push(_ga.getSocialActionTrackers_('facebook', 'like',opt_target, opt_pagePath));
					});
					FB.Event.subscribe('edge.remove', function(opt_target) {
						_gaq.push(_ga.getSocialActionTrackers_('facebook', 'unlike',opt_target, opt_pagePath));
					});
					FB.Event.subscribe('message.send', function(opt_target) {
						_gaq.push(_ga.getSocialActionTrackers_('facebook', 'send',opt_target, opt_pagePath));
					});
				}
			} catch (e) {
			}
		};
		_ga.trackTwitterHandler_ = function(intent_event, opt_pagePath) {
			var opt_target; //Default value is undefined
			if (intent_event && intent_event.type === 'tweet' || intent_event.type === 'click') {
				if (intent_event.target.nodeName === 'IFRAME') {
					opt_target = _ga.extractParamFromUri_(intent_event.target.src, 'url');
				}
				var socialAction = intent_event.type + ((intent_event.type === 'click') ? '-' + intent_event.region : ''); //append the type of click to action
				_gaq.push(_ga.getSocialActionTrackers_('twitter', socialAction, opt_target, opt_pagePath));
			}
		};
		_ga.trackTwitter = function(opt_pagePath) {
			intent_handler = function(intent_event) {
				_ga.trackTwitterHandler_(intent_event, opt_pagePath);
			};
			twttr.events.bind('click', intent_handler);
			twttr.events.bind('tweet', intent_handler);
		};
		_ga.extractParamFromUri_ = function(uri, paramName) {
			var regex = new RegExp('[\\?&#]' + paramName + '=([^&#]*)');
			var params = regex.exec(uri);
			if (params !== null) {
				return unescape(params[1]);
			}
			return uri;
		};
	}
};