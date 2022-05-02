//Dependiendo del id(sección) de las tablas, hacer visible u ocultar las secciones
	document.getElementById("botonEditar").onclick = function() {
		document.getElementById("botonEditar").style.display = "none";
		document.getElementById("botonGuardar").style.display = "inline";
		const tabla = document.getElementsByClassName("editable");
		//for (var i=0; i < tabla.length; i++) {
			/*Cambiar el atributo global contentEditable a verdadero para poder editar los valores
			de los riesgos y controles*/
		$(".editable").attr("contentEditable", true);
		$(".formulado").css("background-color", "rgb(167, 167, 181, 0.5)");
	  //}
	}