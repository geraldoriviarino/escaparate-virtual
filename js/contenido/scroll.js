$(document).ready(function() {
	$('#btn_top').on('click', scroll_up);
	window.onscroll = on_scroll;

	//trigger_rotables();
});

function on_scroll() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        	$("#btn_top").fadeIn('slow');
    } else {
        $("#btn_top").fadeOut('slow');
    }

	if (document.body.scrollTop > 86 || document.documentElement.scrollTop > 86) {
		$('#nav').addClass('colgado');
	} else {
		$('#nav').removeClass('colgado');
	}
	
	//trigger_rotables();
}

function scroll_up() {
	window.scroll({ top: 0, left: 0, behavior: 'smooth' });
}

function elemento_visible($elemento) {
	var	element_top = $elemento.offset().top, 
		window_top = $(window).scrollTop(),

		element_bottom = element_top + $elemento.height(),
		window_bottom = window_top + $(window).height();

		if ((element_bottom - window_bottom) > ($elemento.height() / 2.5)) {
			return 'rotado-neg';
		} else if ((window_top - element_top) > ($elemento.height() / 2.5)) {
			return 'rotado-pos';
		}

		return false;
}

function rotar_elemento(elemento, rotar) {
	if (rotar) {
		elemento.addClass(rotar);
	} else {
		elemento.removeClass('rotado-pos rotado-neg');
	}
}

function trigger_rotables() {
	$.each($('.rotable'), function () {
		rotar_elemento($(this), elemento_visible($(this)));
	});
}