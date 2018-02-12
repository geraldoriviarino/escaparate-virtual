var cookies_aceptadas = false;

$(document).ready(function() {	
	gestion_cookies();
});

function gestion_cookies() {
	cookies_aceptadas = cookies_permitidas();
	
	if (!cookies_aceptadas) {
		mostrar_mensaje_cookies();

		$('#btn_aceptar_cookies').on('click', function (e) {
			cookies_aceptadas = true;
			eliminar_mensaje_cookies();
			guardarCookie('cookies', '1', '365');
		});

		$('#btn_cancelar_cookies').on('click', function (e) {
			eliminar_mensaje_cookies();
		});

	}
}

function cookies_permitidas() {
	return obtenerCookie('cookies').length > 0;
}

function mostrar_mensaje_cookies() {
	if ($('#mensaje_cookies').length === 0) {
		var mensaje = 'Utilizamos cookies propias y de terceros para mejorar ' +
			'nuestros servicios y mostrarle publicidad relacionada con sus ' +
			'preferencias mediante el análisis de sus hábitos de navegación. ' +
			'Si continua navegando, consideramos que acepta su uso. Puede cambiar ' +
			'la configuración u obtener más información <a href="">aquí</a>.';

		$('body').append(
			'<div id="mensaje_cookies" class="mensaje_cookies">' +
				'<div id="contenedor_cookies" class="contenedor_cookies">' +
					'<p class="parrafo">' + mensaje +
						'<button id="btn_aceptar_cookies" class="btn">Aceptar</button>' +
						'<button id="btn_cancelar_cookies" class="btn">Cancelar</button>' +
					'</p>' +
				'</div>' +
			'</div>'
		);
	}
}

function eliminar_mensaje_cookies() {
	$('#mensaje_cookies').remove();
}

function eliminarCookie(nombreCookie) {
	guardarCookie(nombreCookie, '', 0);
}

function guardarCookie(nombreCookie, valorCookie, diasExpirar) {
	var fecha = new Date(), expira;
	fecha.setTime(fecha.getTime() + (diasExpirar * 24 * 60 * 60 * 1000));
	expira = "expires="+ fecha.toUTCString();

	document.cookie = nombreCookie + "=" + valorCookie + ";" + expira + ";path=/";
}

function obtenerCookie(nombreCookie) {
	var strNombre = nombreCookie + "=", 
		arrayCookie = decodeURIComponent(document.cookie).split(';');

	for(let i = 0; i < arrayCookie.length; i++) {
		let cookie = arrayCookie [i];

		while (cookie.charAt(0) === ' ') {
			cookie = cookie.substring(1);
		}

		if (cookie.indexOf(strNombre) === 0) {
			return cookie.substring(strNombre.length, cookie.length);
		}
	}

	return "";
} 
