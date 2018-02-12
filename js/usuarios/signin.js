/*
* General
*/

/*
	Cookies aceptadas o no
	Usuario logeado o no
	Credenciales correctos o no
	Datos registro válidos o no
*/

/*
* Listeners
*/
$(document).ready(function () {
	$('#form_sign_in').submit(false);
	$('#btn_sign_in').on('click', on_sign_in);
	$('#btn_back').on('click', on_back);

	$('.campo-texto').on('paste cut keyup', on_formulario_modificado);
	$('#pais').change(on_formulario_modificado);	

	cargar_paises('files/countries.json');


});
function cargar_paises(url) {
	$.getJSON(url, function(data) {
		$.each(data, function (clave, valor) {
			$('#pais').append(
				$('<option value="' + valor.code + '">' + valor.name + '</option>')
			);
		});
	});
}

function rellenar_guiones(id) {
	var elemento = $('#' + id);
	if (elemento.val().length % 4 === 0) {
		elemento.val(elemento.val() + '-');
	}
}

function toggle_campo_tarjeta(mostrar) {
	if (mostrar) {
		if ($('#contenido_num_tarjeta').length === 0) {
			$('#contenedor_num_tarjeta').append($(
				'<div id="contenido_num_tarjeta" class="form-group">' +
					'<label for="num_tarjeta">Nº tarjeta de crédito</label>' +
					'<input id="num_tarjeta" class="campo-texto campo-formulario" type="text" name="num_tarjeta">' +
					'<p id="error_num_tarjeta" class="color-rojo"></p>'+
				'</div>'
			));
		}
	} else {
		$('#contenido_num_tarjeta').remove();
	}
}

function on_back() {
	window.location.replace('index.html');
}

function on_sign_in() {
	var ids = formulario_invalido(),
		campos_obligatorios = ['nombre', 'email', 'password', 'conf_password'];
	if (!validar_obligatorios(campos_obligatorios) || ids.length != 0) {
		for (let id of ids) {
			mostrar_mensaje_error(id);
		}
	} else {
		registro();
		
	}
}

// Este campo es obligatorio
function mostrar_mensaje_error(id, mensaje = 'El formato es incorrecto.') {
	$('#error_' + id).text(mensaje);
}

function eliminar_mensaje_error(id) {
	$('#error_' + id).text('');
}

function formulario_invalido() {
	var lista_identificadores = [];

	if (validar_campo('email')) {
		eliminar_mensaje_error('email');
	} else {
		lista_identificadores.push('email');		
	}

	if (validar_campo('password')) {
		eliminar_mensaje_error('password');
	} else {
		lista_identificadores.push('password');		
	}

	if (validar_campo('nombre')) {
		eliminar_mensaje_error('nombre');
	} else {
		lista_identificadores.push('nombre');		
	}

	if (validar_campo('direccion')) {
		eliminar_mensaje_error('direccion');
	} else {
		lista_identificadores.push('direccion');		
	}

	if (validar_campo('fecha_nac')) {
		eliminar_mensaje_error('fecha_nac');
	} else {
		lista_identificadores.push('fecha_nac');		
	}

	return lista_identificadores;
}

/**
* Función encargada de atender a eventos relacionados con la modificación de
* cualquier campo del formulario.
*/
function on_formulario_modificado(e) {
	var id = e.target.id;
	if (id.includes('password')) {
		if ($('#password').val() === $('#conf_password').val()) {
			eliminar_mensaje_error('password');
			eliminar_mensaje_error('conf_password');

			if (!validar_campo(id)) {
				mostrar_mensaje_error(id);
			}
		} else {
			mostrar_mensaje_error('password', 'Las contraseñas no coinciden');
			mostrar_mensaje_error('conf_password', 'Las contraseñas no coinciden');
		}
	} else if (validar_campo(id)) {
		eliminar_mensaje_error(id);
		if (id === 'direccion' || id === 'pais') {
			let longitud_direccion = $('#direccion').val().trim().length;
			
			if (longitud_direccion >= 1 && $('#pais').val() !== 'default') {
				toggle_campo_tarjeta(true);
			} else {
				toggle_campo_tarjeta(false);				
			}
		}
	} else {
		if (id === 'direccion' || id === 'pais') {
			toggle_campo_tarjeta(false);
		}
	}

}

/**
* Función que comprueba si el campo asociado a la id recibida
* por parámetro tiene un valor válido.
*/
function validar_campo(id) {
	console.log(id + ':  ' + $('#' + id).val());
	switch (id) {
		case 'email':
			return $('#' + id).val().match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/);
		case 'password':
			return $('#' + id).val().match(/^([\w!]*)$/);
		case 'conf_password':
			return $('#' + id).val().match(/^([\w!]*)$/);
		case 'nombre':
			return $('#' + id).val().match(/^(([\w\u00e1\u00e9\u00ed\u00f3\u00fa\u00c1\u00c9\u00cd\u00d3\u00da\u00f1\u00d1]*)|([\w\u00e1\u00e9\u00ed\u00f3\u00fa\u00c1\u00c9\u00cd\u00d3\u00da\u00f1\u00d1]*\s[\w\u00e1\u00e9\u00ed\u00f3\u00fa\u00c1\u00c9\u00cd\u00d3\u00da\u00f1\u00d1]*))$/);
		case 'direccion':
			return $('#' + id).val().match(/^([.\w!\u00e1\u00e9\u00ed\u00f3\u00fa\u00c1\u00c9\u00cd\u00d3\u00da\u00f1\u00d1\-]*)*$/);
		case 'fecha_nac':
			return $('#' + id).val().match(/([12]\d{3})[\/\-](0[1-9]|1[0-2])[\/\-](0[1-9]|[12]\d|3[01])/);
	}
}


function validar_obligatorios(obligatorios) {
	var resultado = true;
	for (let identificador of obligatorios) {
		if (!$('#' + identificador).val().trim()) {
			mostrar_mensaje_error(identificador, 'Este campo es obligatorio.');

			if (resultado) {
				resultado = false;
			}
		} else {
			eliminar_mensaje_error(identificador);		
		}
	}

	return resultado;
}

function registro() {
	guardarCookie('email', $('#email').val(), 30);
	guardarCookie('password', md5($('#password').val()), 30);
	guardarCookie('nombre_usuario', $('#nombre').val(), 30);
	guardarCookie('logged', '1', 30);

	alert('Registrado correctamente.');
	window.location.replace('index.html');
}
