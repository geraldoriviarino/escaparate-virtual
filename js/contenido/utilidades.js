function icono_interactivo(selector_icono, clase_anterior, clase_posterior, on_click = true) {
	if (on_click) {
		$(selector_icono).on('click', function (e) {
			if ($(this).hasClass('carrito') || usuario_logeado()) {
				$(this)
					.toggleClass('resaltado')
					.toggleClass('modificado');
			} else {
				alert('Debe iniciar sesión para realizar esta acción.');
			}
		});
	}
	
	$(selector_icono).hover(function() {
		$(this)
			.toggleClass(clase_anterior)
			.toggleClass(clase_posterior);
	}).on('mouseout', function (e) {
		if ($(this).hasClass('modificado')) {
			$(this)
				.toggleClass(clase_anterior)
				.toggleClass(clase_posterior)
				.removeClass('modificado');
		}
	});
}
