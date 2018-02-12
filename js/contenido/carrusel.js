// Código extraído del tutorial de W3C contenido en el siguiente link: https://www.w3schools.com/w3css/w3css_slideshow.asp

var indice = 0, imagenes;

siguiente()
carrusel_automatico();


function carrusel_automatico() {
    siguiente();
    setTimeout(carrusel_automatico, 5000);    
}

/**
 * Función que se ejecuta cuando el usuario hace clic sobre la flecha derecha.
 * Avanza al carrusel de fotos.
 * @return {[type]} [description]
 */
function siguiente() {
    pasar_imagen(indice += 1);
}

function anterior() {
    retroceder_imagen(indice += -1);
}

function retroceder_imagen() {
    var imagenes = document.getElementsByClassName("foto-carrusel"), elemento,
        paginas = document.getElementsByClassName("carrusel-page");

    if (indice > imagenes.length) {
        indice = 1;
    } else if (indice < 1) {
        indice = imagenes.length;
    }

    paginar(paginas, indice);

    imagenes[imagenes.length-1].style.display = 'none'; 
    imagenes[0].style.marginLeft = '1800px';
        
    prependTo(imagenes);
    
}

function pasar_imagen() {
    var imagenes = document.getElementsByClassName("foto-carrusel"), elemento,
        paginas = document.getElementsByClassName("carrusel-page");        
        
    if (indice > imagenes.length) {
        indice = 1;
    } else if (indice < 1) {
        indice = imagenes.length;
    }

    paginar(paginas, indice);

    paginar(paginas, indice);
    if (!imagenes[1].classList.contains('escondido')) {
        mostrar_elemento(imagenes[1]);
    }
    
    appendTo(imagenes[0]);
}

function prependTo(imagenes, direccion) {
    var elemento = imagenes[imagenes.length-1], copia = elemento.cloneNode(true),
        padre = elemento.parentNode;       
    
    copia.style.display = 'block';        
    padre.insertBefore(copia, padre.firstChild);
    imagenes[1].style.marginLeft = '';
    padre.removeChild(elemento);
}

function appendTo(elemento) {
    var copia = elemento.cloneNode(true),
        padre = elemento.parentNode;
    mostrar_elemento(copia);
    padre.appendChild(copia);
    padre.removeChild(elemento);
}

function mostrar_elemento(elemento) {
    elemento.classList.toggle('escondido');   
}

function paginar(paginas, indice) {
    for (let i = 0; i<paginas.length; i++) {
        if ((i === indice - 1 && !paginas[i].classList.contains('current') || (i !== indice - 1 && paginas[i].classList.contains('current')))) {
            paginas[i].classList.toggle('current');
        } 
    }
}