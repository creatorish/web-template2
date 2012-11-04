/*****************************************************************
 *
 * jQuery SmoothScroll Plugin
 * スマートフォン対応のスムーススクロールプラグイン
 * 
 * Required: jQuery(http://jquery.com/)
 * License: MIT
 * Update: 2012/11/01
 * Version: 0.1
 * Author: yuu.creatorish
 * URL: http://creatorish.com
 * PluginURL: http://creatorish.com/lab/5393
 *
*******************************************************************/

jQuery.fn.smoothScroll = function(op) {
	var option = {
		easing: "swing",
		duration: 500,
		cancel: true,
		start: function(x,y) {},
		step: function(x,y){},
		canceled: function(x,y) {},
		complete: function(x,y){}
	};
	
	jQuery.extend(option,op);
	
	var scrolling = false;
	var w = jQuery(window);
	var d = jQuery(document.body);
	var s = jQuery({st: 0, sl: 0,v: 0});
	
	function clickHandler(e) {
		e.preventDefault();
		e.stopPropagation();
		
		var h = jQuery(this).attr("href");
		var t = jQuery(h);
		if (t.length === 0) {
			t = d;
		}
		scrolling = true;
		s.attr({
			st: w.scrollTop(),
			sl: w.scrollLeft()
		});
		
		option.start(w.scrollLeft(),w.scrollTop());
		
		var o = t.offset();
		s.stop(true).animate({
			st: o.top,
			sl: o.left
		}, {
			duration: option.duration,
			easing: option.easing,
			step: stepHandler,
			complete: completeHandler
		});
	}
	function completeHandler() {
		scrolling = false;
		scroll(this.sl,this.st);
		option.complete(this.sl,this.st);
	}
	function stepHandler() {
		scroll(this.sl,this.st);
		option.step(this.sl,this.st);
	}
	function scroll(x,y) {
		window.scrollTo(x,y);
	}
	function stopQueue() {
		if (scrolling) {
			option.canceled(s.attr("sl"),s.attr("st"));
			scrolling = false;
			s.stop(true);
		}
	}
	
	if (option.cancel) {
		if ('ontouchend' in document) {
			d.unbind("touchstart",stopQueue);
			d.bind("touchstart",stopQueue);
		} else {
			w.bind("DOMMouseScroll mousewheel",stopQueue);
			d.unbind("mousedown",stopQueue);
			d.bind("mousedown",stopQueue);
		}
	}
	jQuery.each(this,function() {
		jQuery(this).unbind("click",clickHandler);
		jQuery(this).bind("click",clickHandler);
	});
};

/*****************************************************************
 *
 * jQuery RollOver
 * 簡易ロールオーバー
 * 
 * Required: jQuery(http://jquery.com/)
 * License: MIT
 * Update: 2012/11/01
 * Version: 0.1
 * Author: yuu.creatorish
 * URL: http://creatorish.com
 *
*******************************************************************/
 
var useDropDown = false;
jQuery.each(jQuery("a:has(img)"),function(i) {
	var parent = $(this).parent();
	jQuery.each($(this).find("img"),function(i) {
		var img = $(this);
		if(!jQuery(this).attr("src").match("_off.")) {
			return;
		}
		
		var target = img;
		if (useDropDown) {
			target = parent;
		}
		
		target.hover(function() {
			if (!img.hasClass("keep")) {
				img.addClass("hover");
				img.attr('src', img.attr("src").replace("_off.", "_on."));
			}
		}, function() {
			if (!img.hasClass("keep")) {
				img.removeClass("hover")
				img.attr('src', img.attr("src").replace("_on.", "_off."));
			}
		});
	});
});

jQuery.fn.keepOn = function() {
	jQuery.each($(this),function(i) {
		jQuery(this).addClass("keep");
		jQuery(this).attr('src', jQuery(this).attr("src").replace("_off.", "_on."));
	});
}
jQuery.fn.keepOff = function() {
	jQuery.each($(this),function(i) {
		jQuery(this).removeClass("keep");
		jQuery(this).attr('src', jQuery(this).attr("src").replace("_on.", "_off."));
	});
}