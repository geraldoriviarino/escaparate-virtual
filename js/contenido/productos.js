var productos;
/*
TODO: Al cerrar sesión o hacer clic en otro lado o comentario, se cierra la caja de comentario que esté abierta.
1*/
$(document).ready(function () {
	cargar_productos('files/productos.json');

	$('.social-btn').on('click', function (e) {
		if (usuario_logeado() && $(this).hasClass('corazon')) {
			let elemento = $(this).siblings();

			if ($(this).hasClass('fa-heart-o')) {
				elemento.text((parseInt(elemento.text()) - 1));
			} else {
				elemento.text((parseInt(elemento.text()) + 1));
				
			}
		}
	});
});

function guardar_comentario(id, contenido) {
	var comentario = {
		'nombre_usuario': obtenerCookie('nombre_usuario'),
		'contenido': contenido
	};

	productos[id].comentarios.push(comentario);
	actualizar_num_comentarios(id, productos[id].comentarios.length);

	$('#comentarios_' + id).find('.comentarios').prepend($(		 
 		'<div class="comentario">' +
 			'<span class="nombre-usuario">' + comentario.nombre_usuario + ':</span>' +
 			'<p class="contenido">' + comentario.contenido + '</p>' +
 		'</div>'
	));
}

function actualizar_num_comentarios(id, num_comentarios) {
	$('#comentarios_' + id).find('.num-comentarios').text('(' + num_comentarios + ')');
	$('#producto_' + id).find('.num_comentarios').text(num_comentarios);
}

function toggle_comentarios($producto, num_comentarios_mostrar = 5) {
	var $caja_comentarios,
		id_producto = $producto.attr('id').split('_')[1],
		comentarios_HTML = '', 
		logeado = usuario_logeado(),		
		str_placeholder = (logeado) ? 'Deja un comentario' : 'Inicia sesión o regístrate',
		producto = productos[id_producto];

	if (!elemento_existe('#comentarios_' + id_producto)) {
		comentarios_HTML = generar_comentarios(producto, num_comentarios_mostrar);
		
		$caja_comentarios = $(
		 	'<div id="comentarios_' + id_producto + '" class="caja-comentarios">' +
		 		'<strong class="titulo3">Comentarios <span class="num-comentarios">(' + producto.comentarios.length + ')</span></strong>' +
			 	'<form action="index.html" method="POST" class="form-comentarios">' +
			 		'<input type="text" class="campo-texto"' + ((logeado) ? ' ' : ' disabled ') + 'placeholder="' + str_placeholder + '">' +
			 		'<button class="btn comentar" type="submit"' + ((logeado) ? '' : ' disabled') + '>Comentar</button>' +
			 	'</form>' +
			 	'<div class="contenedor-comentarios">' +
				 	'<div class="comentarios">' + comentarios_HTML +
				 	'</div>' +
			 	'</div>' +
			 	'<button class="btn ocultar-comentarios">Ocultar comentarios</button>' +
		 	'</div>'
		).css({
			'left': $producto.offset().left,
			'top': $producto.offset().top + $producto.height() + 20,
		});

		$('body').append($caja_comentarios);
	} else {
		$('#comentarios_' + id_producto).remove();
	}

	listeners_comentarios();
}

function generar_comentarios(producto, num_comentarios_mostrar = 5) {
	var inicio = producto.comentarios.length - num_comentarios_mostrar;
	return producto.comentarios.slice(inicio).map(generar_comentario).reverse().join('');
}

function generar_comentario(comentario) {
	return 	'<div class="comentario">' +
				'<span class="nombre-usuario">' + comentario.nombre_usuario + ':</span>' +
				'<p class="contenido">' + comentario.contenido + '</p>' +
			'</div>';
}

function listeners_comentarios() {	
	$('.btn.ocultar-comentarios').on('click', function (e) {
		e.preventDefault();
		toggle_comentarios($('#producto_' + $(this).parents('.caja-comentarios').attr('id').split('_')[1]))
	});

	$('.btn.comentar').on('click', function (e) {
		e.preventDefault();
		var id = $(this).parents('.caja-comentarios').attr('id').split('_')[1],
			campo_texto = $(this).parents('.caja-comentarios').find('.campo-texto');
		guardar_comentario(id, campo_texto.val());
		campo_texto.val('');
	});
}

function generar_productos(productos) {
	var $contenedor_productos = $('#contenedor_productos');

	$.each(productos, function (clave, producto) {
		$contenedor_productos.append($(
		'<!-- Contenedor producto -->' +
		'<div id="producto_' + clave + '" class="producto col-sm col-3">' +
			'<div class="detalle-producto">' +
				'<i class="fa fa-cart-plus carrito icono" aria-hidden="true"></i>' +
				'<div class="likes">' +
					'<i class="far fa-heart icono corazon social-btn" aria-hidden="true"></i>' +
					'<span class="linea-texto num_likes">  ' + producto.num_likes + '</span>' +
				'</div>' +
				'<div class="comentarios">' +
					'<i class="far fa-comment icono comentario social-btn" aria-hidden="true"></i> ' +
					'<span class="linea-texto num_comentarios">  ' + producto.comentarios.length + '</span>' +
				'</div>' +
			'</div>' +
			'<div class="categoria-producto">' +
				'<span class="linea-texto">PROMOCIÓN</span>' +
			'</div>' +
			'<img class="foto-producto" src="' + producto.url_imagen + '" alt=""><br>' +
			'<span class="linea-texto nombre-producto">' + producto.nombre +'</span><br>' +
			'<span class="linea-texto precio-producto">' + producto.precio + ' €</span><br>' +
			'<span class="linea-texto info-envio">' + producto.info_envio + '</span>' +
		'</div> <!-- Fin contenedor producto -->'
		));
	});

	icono_interactivo('.icono.carrito', 'fa-cart-plus', 'fa-shopping-cart');
	icono_interactivo('.icono.corazon', 'far', 'fas');
	icono_interactivo('.icono.comentario', 'far', 'fas', false);
	listeners_icono_comentario('.icono.comentario')
}

function listeners_icono_comentario(selector) {
	$(selector).on('click', function (e) {
		toggle_comentarios($(this).parents('.producto'));
	});
}

function cargar_productos(url) {
	$.getJSON(url, function(data) {
		//Dando valor a la variable global de productos
		productos = data;

		//Generando los productos en el DOM
		generar_productos(productos);
	});
}

function elemento_existe(selector) {
	return $(selector).length > 0;
}