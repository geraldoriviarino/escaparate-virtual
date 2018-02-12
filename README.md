# Escaparate virtual
En este proyecto se pretende simular un sistema de autenticación mediante las cookies del navegador, de una tienda de venta de productos online.
## Formularios y cookies
  En este apartado se explica el proceso de desarrollo de los formularios y las cookies.
### Cookies
Para el registro de usuarios se han empleado tres cookies distintas:
* Email. Almacena el correo electrónico del usuario registrado.
* Password. Almacena la contraseña hasheada mediante el algoritmo md5.
* Logged. Almacena el estado de inicio de sesión del usuario.

Además, se ha hecho uso de la cookie denominada *cookies*, cuya función es dejar constancia de que el usuario ha permitido el uso de las mismas.

### Formularios
#### Registro
El usuario puede registrarse mediante las cookies, por lo que si no están activadas, el usuario no puede acceder desde la página principal (en caso de no haber sido aceptadas, se le mostrará un mensaje al acceder a la página y cada vez que intente realizar una acción que implique el uso de las éstas).

Una vez haya introducido unos datos correctos y haya rellenado los campos obligatorios, se procederá a almacenar sus credenciales en las cookies correspondientes, además de establecer la sesión y redirigirle a la página principal.

Los campos obligatorios no se pueden pasar por alto (ni dejar en blanco, ni burlar el formato establecidos por expresiones regulares). La contraseña aportada no puede ser distinta a la confirmación de la misma.

En cualquier caso, el usuario será notificado por cada uno de los campos en los que haya habido un conflicto.

#### Inicio de sesión
Una vez el usuario se ha registrado satisfactoriamente, puede iniciar sesión.
Ésto le dará acceso a funcionalidades exclusivas como indicar que le gusta un producto, o comentar sobre él. Por lo que se comprueba que cada acción reservada para usuarios se realiza cuando hay una sesión activa (mediante la cookie logged, si existe, es que hay una sesión).

## Diseño web
### Elementos volátiles
Se ha hecho uso de la librería jQuery y la modificación del DOM para insertar fragmentos de código en el mismo, dependiendo de las circunstancias de la página en un determinado momento. Por ejemplo: El formulario flotante de inicio de sesión, el aviso de cookies, o el campo de tarjeta de crédito. Además, por motivos de simplificación, los productos se generan también mediante la alteración del DOM, siendo insertados mediante jQuery.
### Slider o carrusel de fotos
Este elemento de la página web se implementó en los inicios, por lo que está realizado mediante JavaScript y la ayuda de los tutoriales de W3CSchools. En un futuro estará implementado con jQuery y animaciones de translaciones y rotaciones en 3d.

### Microinteracciones
En esta página, se han implementado varias microinteracciones, que le dan un toque llamativo:
* Barras laterales sobre y debajo de las opciones del menú de navegación al pasar el cursor por encima
* Barra de navegación pegada a la parte superior de la pantalla cuando se hace scroll hacia abajo
* Las opciones de producto tienen un efecto de escalado al 120%, sufriendo a la vez, un cambio de color tanto del fondo, como de las letras y los iconos
* Si se pasa el cursor por encima de cualquier producto se puede apreciar que asciende un recuadro semitransparente, que contiene los botones que permiten al usuario añadir al carrito dicho producto, indicar que le gusta y comentar al respecto.
* Estos botones, al igual que el resto de iconos, son producto de una font, obtenida de [esta página](https://fontawesome.com/). Al pasar el cursor por encima se modifica la clase que determina el tipo de icono que resulta, a la vez que cambia el color de una forma progresiva (como en la mayoría de elementos "clicables" de la página). También, al ser pulsados, mantienen la apariencia para indicarle al usuario que la función a realizar ha sucedido con éxito. El icono del corazón suma en una unidad el número de "me gustas" que tiene el producto sobre el que está (el número se genera aleatoriamente en este prototipo).
* Al hacer scroll y esconder parte de los elementos rotables, se rotan algunos elementos como los productos o el footer, dando una sensación de página cilíndrica o enrollada.
* Se añade un botón de ascenso a la parte inferior-derecha cuya finalidad es dirigir al usuario a la zona superior del documento HTML al hacer scroll.
* En el pie de página o *footer*, se han añadido los botones para acceder a las redes sociales, cuya microinteracción consiste en un giro animado de 360º.




