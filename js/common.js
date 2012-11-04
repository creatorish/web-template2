jQuery("a[href^='#']").smoothScroll({
	easing: "swing",
	duration: 300
});

$(document.body).socialButton({
	//FacebookいいねボタンAppID
	appId: null,
	//使用するSNS
	social: {
		facebook: true,
		twitter: true,
		hatena: true,
		pinterest: true,
		google: true
	}
});