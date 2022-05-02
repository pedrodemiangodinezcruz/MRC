const express = require("express");
var path = require('path');
const app = express();
//const mongoose = require("mongoose");
var bodyParser = require("body-parser");
const ejs = require('ejs');
//const methodOverride = require("method-override");
//const exp = require("constants");
app.set('view engine', 'ejs');
var assert = require('assert');
var fs = require('fs');
require('dotenv/config');
app.use(bodyParser.urlencoded({ extender: true }));


app.use(bodyParser.json())

app.use(express.static(__dirname + '/public'));


//mongoose.connect("mongodb+srv://Demian:57008345@cluster0.5lvxl.mongodb.net/ProyectoWeb?retryWrites=true&w=majority", { useNewUrlParser: true })
/*
//Schema para usuario
const UsuarioSchema = {
	nombre: String,
	correo: String,
	contrasena: String
}
const usuario = mongoose.model('Usuarios', UsuarioSchema);

//Altas usuario
app.post("/usuarios", function (req, res) {
	console.log("Alta exitosa");
	let newUsuario = new usuario({
		nombre: req.body.Nombre,
		correo: req.body.Email,
		contrasena: req.body.contrasenia
	});
	res.render('index', { alta: 'true' })
	newUsuario.save();
})


//Linea a cambiar para ver su pagina
app.get("/", function (req, res) {
	res.render('index', { success: '' })
	
})
/*Para cargar pagina de ayuda persepctiva del usuario
app.get('/ayudaUser', (req, res) => {
	res.render('ayudaUser', { alta: '' })
	
})
*/

app.listen(3000, function () {
	console.log("Enviroment de desarrollo corriendo en el puerto 3000");
})
//Sección de rutas para los archivos .ejs (Vistas)
app.get("/", function (req, res) {
	res.render('index', { registro: '' })
})
app.get("/instructivo", function (req, res) {
	res.render('instructivo')
})

app.get("/metodologia", function (req, res) {
	res.render('metodologia')
})
//Sección de rutas para la matriz de riesgos
app.get("/matriz", function (req, res) {
	res.render('matriz', { registro: '' , edicionRiesgo: '', eliminacionRiesgo:''})
})
app.get("/edicionRiesgo", function (req, res) {
	res.render('matriz', { registro: '' , edicionRiesgo: 'verdadero', eliminacionRiesgo: '' })
})
app.get("/eliminacionRiesgo", function (req, res) {
	res.render('matriz', { registro: '' , edicionRiesgo: '', eliminacionRiesgo: 'verdadero' })
})
//Sección de rutas para as causas
app.get("/causas", function (req, res) {
	res.render('causas', { altaCausa: '' , edicionCausa: '', eliminacionCausa: '' })
})
app.get("/altaCausa", function (req, res) {
	res.render('causas', { altaCausa: 'verdadero' , edicionCausa: '', eliminacionCausa: '' })
})
app.get("/edicionCausa", function (req, res) {
	res.render('causas', { altaCausa: '' , edicionCausa: 'verdadero', eliminacionCausa: '' })
})

app.get("/eliminacionCausa", function (req, res) {
	res.render('causas', { altaCausa: '' , edicionCausa: '', eliminacionCausa: 'verdadero' })
})




app.get("/criterios", function (req, res) {
	res.render('criterios')
})
app.get("/estadisticas", function (req, res) {
	res.render('estadisticas', { proceso: 'Concepto al Producto' })
})
app.get("/mapaResidual", function (req, res) {
	res.render('mapaResidual', { proceso: 'Concepto al Producto' })
})
app.get("/mapaRiesgo", function (req, res) {
	res.render('mapaRiesgo', { proceso: 'Concepto al Producto' })
})
app.get("/pareto", function (req, res) {
	res.render('pareto', { proceso: 'Concepto al Producto' })
})
app.get("/registro", function (req, res) {
	res.render('matriz', { registro: 'riesgoAlta', edicionRiesgo: '', eliminacionRiesgo: '' })
})
app.get("/registroControl", function (req, res) {
	res.render('matriz', { registro: 'controlAlta', edicionRiesgo: '', eliminacionRiesgo: '' })
})
/*Direcciones para gráfico de Pareto*/
app.get("/productoPareto", function (req, res) {
	res.render('pareto', { proceso: 'Concepto al Producto' })
})
app.get("/compraPareto", function (req, res) {
	res.render('pareto', { proceso: 'Compra al Pago' })
})
app.get("/abastoPareto", function (req, res) {
	res.render('pareto', { proceso: 'Demanda al Abasto' })
})
app.get("/pedidoPareto", function (req, res) {
	res.render('pareto', { proceso: 'Pedido al Cobro' })
})
app.get("/mantenimientoPareto", function (req, res) {
	res.render('pareto', { proceso: 'Mantenimiento a la Liquidación' })
})
app.get("/inversionPareto", function (req, res) {
	res.render('pareto', { proceso: 'Inversión a la Desinversión' })
})
app.get("/finanzasPareto", function (req, res) {
	res.render('pareto', { proceso: 'Finanzas a la Administración' })
})

app.get("/contratacionPareto", function (req, res) {
	res.render('pareto', { proceso: 'Contratación al Retiro' })
})

app.get("/procesosPareto", function (req, res) {
	res.render('pareto', { proceso: 'Procesos Críticos fuera de Macros' })
})
/*Direcciones para gráfico de estadisitcas*/
app.get("/productoEstadisticas", function (req, res) {
	res.render('Estadisticas', { proceso: 'Concepto al Producto' })
})
app.get("/compraEstadisticas", function (req, res) {
	res.render('estadisticas', { proceso: 'Compra al Pago' })
})
app.get("/abastoEstadisticas", function (req, res) {
	res.render('estadisticas', { proceso: 'Demanda al Abasto' })
})
app.get("/pedidoEstadisticas", function (req, res) {
	res.render('estadisticas', { proceso: 'Pedido al Cobro' })
})
app.get("/mantenimientoEstadisticas", function (req, res) {
	res.render('estadisticas', { proceso: 'Mantenimiento a la Liquidación' })
})
app.get("/inversionEstadisticas", function (req, res) {
	res.render('estadisticas', { proceso: 'Inversión a la Desinversión' })
})
app.get("/finanzasEstadisticas", function (req, res) {
	res.render('estadisticas', { proceso: 'Finanzas a la Administración' })
})

app.get("/contratacionEstadisticas", function (req, res) {
	res.render('estadisticas', { proceso: 'Contratación al Retiro' })
})

app.get("/procesosEstadisticas", function (req, res) {
	res.render('estadisticas', { proceso: 'Procesos Críticos fuera de Macros' })
})
/*Direcciones para gráfico de mapa de Riesgo*/
app.get("/productoMapaRiesgo", function (req, res) {
	res.render('mapaRiesgo', { proceso: 'Concepto al Producto' })
})
app.get("/compraMapaRiesgo", function (req, res) {
	res.render('mapaRiesgo', { proceso: 'Compra al Pago' })
})
app.get("/abastoMapaRiesgo", function (req, res) {
	res.render('mapaRiesgo', { proceso: 'Demanda al Abasto' })
})
app.get("/pedidoMapaRiesgo", function (req, res) {
	res.render('mapaRiesgo', { proceso: 'Pedido al Cobro' })
})
app.get("/mantenimientoMapaRiesgo", function (req, res) {
	res.render('mapaRiesgo', { proceso: 'Mantenimiento a la Liquidación' })
})
app.get("/inversionMapaRiesgo", function (req, res) {
	res.render('mapaRiesgo', { proceso: 'Inversión a la Desinversión' })
})
app.get("/finanzasMapaRiesgo", function (req, res) {
	res.render('mapaRiesgo', { proceso: 'Finanzas a la Administración' })
})

app.get("/contratacionMapaRiesgo", function (req, res) {
	res.render('mapaRiesgo', { proceso: 'Contratación al Retiro' })
})

app.get("/procesosMapaRiesgo", function (req, res) {
	res.render('mapaRiesgo', { proceso: 'Procesos Críticos fuera de Macros' })
})
/*Direcciones para gráfico de mapa Residual*/
app.get("/productoMapaResidual", function (req, res) {
	res.render('mapaResidual', { proceso: 'Concepto al Producto' })
})
app.get("/compraMapaResidual", function (req, res) {
	res.render('mapaResidual', { proceso: 'Compra al Pago' })
})
app.get("/abastoMapaResidual", function (req, res) {
	res.render('mapaResidual', { proceso: 'Demanda al Abasto' })
})
app.get("/pedidoMapaResidual", function (req, res) {
	res.render('mapaResidual', { proceso: 'Pedido al Cobro' })
})
app.get("/mantenimientoMapaResidual", function (req, res) {
	res.render('mapaResidual', { proceso: 'Mantenimiento a la Liquidación' })
})
app.get("/inversionMapaResidual", function (req, res) {
	res.render('mapaResidual', { proceso: 'Inversión a la Desinversión' })
})
app.get("/finanzasMapaResidual", function (req, res) {
	res.render('mapaResidual', { proceso: 'Finanzas a la Administración' })
})

app.get("/contratacionMapaResidual", function (req, res) {
	res.render('mapaResidual', { proceso: 'Contratación al Retiro' })
})

app.get("/procesosMapaResidual", function (req, res) {
	res.render('mapaResidual', { proceso: 'Procesos Críticos fuera de Macros' })
})