$(document).ready(function () {
	$('#container_sesion').on('click', function (e) {
		e.preventDefault();
		
		if (cookies_aceptadas) {
			if (usuario_logeado()) {
				cerrar_sesion();
			} else {
				toggle_formulario();
			}
		} else {
			insistir_cookies();
		}
	});

	manejo_sesion();
});


/*
 * Funciones
*/

function on_sign_in() {
	if (cookies_aceptadas) {
		window.location.replace('registro.html');
	} else {
		insistir_cookies();
	}
}

function cambiar_icono_sesion(sesion_iniciada) {
	var contenido;
	if (sesion_iniciada) {
		let nombre_usuario = obtenerCookie('nombre_usuario');
		contenido = 
			'<span class=" nombre-usuario">' + nombre_usuario + '</span>' +
			'<i class="fa fa-power-off icono" aria-hidden="true"></i>';
	} else {
		contenido =
			'<span class=" nombre-usuario">Iniciar sesión</span>' +
			'<i class="far fa-user icono usuario" aria-hidden="true"></i>';
	}

	$('#container_sesion .enlace.sin-decoracion').html(contenido);
	icono_interactivo('.icono.usuario', 'far', 'fas', false);
}

function on_log_in() {
	if (cookies_aceptadas) {
		if (validar_login()) {
			iniciar_sesion();
			toggle_formulario();
		} else {
			$('#mensaje_error').text('Credenciales incorrectos.');
		}
	} else {
		insistir_cookies();
	}
}

function manejo_sesion() {
	if (cookies_aceptadas) {
		if (usuario_logeado()) {
			cambiar_icono_sesion(true);
		} else {
			cambiar_icono_sesion(false);
		}
	} else {
		cambiar_icono_sesion(false);
	}
}

function validar_login() {
	var usuario_form = $('#email').val(), password_form = $('#password').val();
	return usuario_form.trim() !== '' &&
		password_form.trim() !== '' &&
		usuario_form === obtenerCookie('email') &&
		md5(password_form) === obtenerCookie('password');
}

function insistir_cookies() {	
	alert('Debe aceptar los términos de uso de las cookies para poder hacer uso de la autenticación y sus ventajas.');
	mostrar_mensaje_cookies();
}

function iniciar_sesion() {
	guardarCookie('logged', '1', 30);
	cambiar_icono_sesion(true);
}

function usuario_logeado() {
	return obtenerCookie('logged');
}

function cerrar_sesion() {
	eliminarCookie('logged');
	cambiar_icono_sesion(false);
}

function toggle_formulario() {
	var formulario = $('#contenedor_formulario');

	if (formulario.length > 0) {
		formulario.remove();
	} else {
		$('body').append($('<div id="contenedor_formulario" class="contenedor_formulario contenedor_flotante bg-blanco">'+
			'<form id="form_log_in" class="formulario" action="index.php" method="POST">'+
				'<label for="email"><strong>Correo electrónico</strong></label>'+
				'<input id="email" class="campo-texto" type="text" name="email" placeholder="ejemplo@hotmail.com">'+
				'<label for="password"><strong>Contraseña</strong></label>'+
				'<input id="password" class="campo-texto" type="password" name="password">'+
				'<div class="contenedor-botones">'+
					'<button id="btn_log_in" type="submit" name="btn_log_in" class="btn">Iniciar sesión</button>'+
					'<button id="btn_sign_in" type="submit" name="btn_sign_in" class="btn">Registrarse</button>'+
				'</div>'+
				'<p id="mensaje_error" class="color-rojo"></p>'+
			'</form>'+
		'</div>'));

		$('#form_log_in').submit(false);
		$('#btn_log_in').on('click', on_log_in);
		$('#btn_sign_in').on('click', on_sign_in);
	}
}
