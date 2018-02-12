/*
	Desplegar  una linea debajo del menú con el campo de búsqueda deslizandose cuando haga click en la lupa, añadiendo botón para submit
*/






function media_queries() {
	var queries = {
		'(min-width: 1430px)': 7,
		'(min-width: 1400px)': 6,
		'(min-width: 1260px)': 5,
		'(min-width: 1120px)': 4,
		'(min-width: 1030px)': 3,
		'(min-width: 992px)': 2
	}, indice = 0;

	while (matchMedia(queries[indice])) {


		indice++;
	}
}


media_queries(media); // Call listener function at run time
media.addListener(media_queries); // Attach listener function on state changes

function to_list() {	
	var texto = $('#collapsibleNavbar .nav-item:last').text();
	$('#collapsibleNavbar .nav-item:last').remove();
	$('#collapsibleNavbar .dropdown-menu').append('<a class="dropdown-item" href="#">' + texto + '</a>');
}

function from_list() {	
	var texto = $('#collapsibleNavbar dropdown-item:last').text();
	$('#collapsibleNavbar dropdown-item:last').remove();
	$('#collapsibleNavbar .navbar-nav').append(
		'<li class="elemento-menu nav-item">' +
			'<a class="enlace nav-link" href="#">' + texto + '</a>' +
		'</li>');
}