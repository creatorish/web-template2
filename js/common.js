jQuery("a[href^='#']").smoothScroll({
	easing: "swing",
	duration: 300
});

$(document.body).socialButton({
	//Facebook�����˃{�^��AppID
	appId: null,
	//�g�p����SNS
	social: {
		facebook: true,
		twitter: true,
		hatena: true,
		pinterest: true,
		google: true
	}
});