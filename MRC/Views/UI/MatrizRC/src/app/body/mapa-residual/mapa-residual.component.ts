import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { SharedService } from 'src/app/shared.service';
import { ActivatedRoute } from '@angular/router';
import { Macroproceso } from 'src/app/body/pareto/macroproceso';
declare function getPointCategoryName(point: any, dimension: any): any;

@Component({
	selector: 'app-mapa-residual',
	templateUrl: './mapa-residual.component.html',
	styleUrls: ['./mapa-residual.component.css']
})
export class MapaResidualComponent implements OnInit {
	macroproceso: Macroproceso[] | undefined;
	getPointCategoryName(point: any, dimension: any) {
		var series = point.series,
			isY = dimension === 'y',
			axis = series[isY ? 'yAxis' : 'xAxis'];
		return axis.categories[point[isY ? 'y' : 'x']];
	}

	public mapaResidual: any = {
		chart: {
			type: 'heatmap',
			marginTop: 60,
			marginBottom: 90,
			plotBorderWidth: 1,
		},

		title: {
			text: '<strong>MAPA DE CALOR - RIESGO RESIDUAL</strong>'
		},

		xAxis: {
			categories: ['Total', 'Alto', 'Medio', 'Bajo', 'Ausencia de control'],
			title: {
				text: '<strong>Cobertura del conjunto de controles</strong>',
				style: {
					fontSize: '18px',
					color: "#fffff"
				},
			},
		},

		yAxis: {
			///Ver como cambiar lo de las categoriascolor: 'rbg(205, 25, 55)',
			categories: ['MA', 'A', 'M', 'B', 'MB'],
			title: {
				text: '<strong>Riesgo Inherente</strong>',
				style: {
					fontSize: '18px',
					color: "#fffff"
				},
			},
			reversed: true
		},

		accessibility: {
			/*point: {
				descriptionFormatter: function (point: any) {
					var ix = point.index + 1,
						xName = getPointCategoryName(point, 'x'),
						yName = getPointCategoryName(point, 'y'),
						val = point.value;
					return ix + '. ' + xName + ' sales ' + yName + ', ' + val + '.';
				}
			}*/
		},

		colorAxis: {
			linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
			stops: [
				[0, 'rgb(0,176,80)'], // start
				[0.5, 'rgb(255,255,0)'], // middle
				[1, 'rgb(255,0,0)'] // end
			]
		},

		legend: {
			align: 'right',
			layout: 'vertical',
			margin: 0,
			verticalAlign: 'top',
			y: 25,
			symbolHeight: 280,
			//Para quitar la barra con el texto de la leyenda
			enabled: false
		},

		tooltip: {

		},

		series: [{
			borderWidth: 1,
			data: [],
			dataLabels: {
				style: {
					width: '70px',
					fontSize: '12px',
					textOverflow: 'ellipsis',
					whitewspace: 'nowrap',
					overflow: 'hidden'
					/*
					Solucíon donde caben maximo 5 riesgos
					width : '70px',
					fontSize: '12px',
					whitewspace: 'nowrap',
					padding: '2px',
					overflow: 'hidden'
					*/
				},
				enabled: true,
				color: '#000000',
				inside: true,
				format: '{point.name}'
			}
		}],

		responsive: {
			rules: [{
				condition: {
					maxWidth: 900
				},
				mapaResidual: {
					yAxis: {
						labels: {
							formatter: function format(this: any) {
								return this.value.charAt(0);
							}
						}
					}
				}
			}]
		}

	};


	constructor(private service: SharedService, public _Activatedroute: ActivatedRoute) { }
	RiesgoList: any = [];
	idRiesgosUnicos: any = [];
	riesgosUnicos: any = [];
	RiesgosFinales: any = [];
	RiesgosMapa: any = [];
	ControlList: any = [];
	CausaList: any = [];
	valorDiseñoDeControl: number = 0;
	valorCalificacionControl: number = 0;
	coberturaTotalControles: number = 0;
	contRiesgosSinMacro: number = 0;
	riesgoMuyAltoTotal: string = "";
	riesgoMuyAltoAlto: string = "";
	riesgoMuyAltoMedio: string = "";
	riesgoMuyAltoBajo: string = "";
	riesgoMuyAltoAusenciaControl: string = "";
	riesgoAltoTotal: string = "";
	riesgoAltoAlto: string = "";
	riesgoAltoMedio: string = "";
	riesgoAltoBajo: string = "";
	riesgoAltoAusenciaControl: string = "";
	riesgoMedioTotal: string = "";
	riesgoMedioAlto: string = "";
	riesgoMedioMedio: string = "";
	riesgoMedioBajo: string = "";
	riesgoMedioAusenciaControl: string = "";
	riesgoBajoTotal: string = "";
	riesgoBajoAlto: string = "";
	riesgoBajoMedio: string = "";
	riesgoBajoBajo: string = "";
	riesgoBajoAusenciaControl: string = "";
	riesgoMuyBajoTotal: string = "";
	riesgoMuyBajoAlto: string = "";
	riesgoMuyBajoMedio: string = "";
	riesgoMuyBajoBajo: string = "";
	riesgoMuyBajoAusenciaControl: string = "";

	ngOnInit() {
		this.buscarRiesgosSinMacros();
		this.refreshControlList();
		this.refreshCausaList();
		this.refreshRiesgoList();
		this.macroproceso = [
			{ Nombre: "Concepto al Producto" },
			{ Nombre: "Compra al Pago" },
			{ Nombre: "Demanda al Abasto" },
			{ Nombre: "Pedido al Cobro" },
			{ Nombre: "Mantenimiento a la Liquidación" },
			{ Nombre: "Inversión a la Desinversión" },
			{ Nombre: "Finanzas a la Administración" },
			{ Nombre: "Contratación al Retiro" },
			{ Nombre: "Procesos Criticos fuera de Macros" }
		];

		this.mapaResidual.series[0]['data'] = [{ x: 0, y: 0, value: 0, name: "" }, { x: 0, y: 1, value: 0, name: "" }, { x: 0, y: 2, value: 0, name: "" }, { x: 0, y: 3, value: 0, name: "" },
		{ x: 0, y: 4, value: 0, name: "" }, { x: 1, y: 0, value: 50, name: "" }, { x: 1, y: 1, value: 25, name: "" }, { x: 1, y: 2, value: 0, name: "" }, { x: 1, y: 3, value: 0, name: "" },
		{ x: 1, y: 4, value: 0, name: "" }, { x: 2, y: 0, value: 75, name: "" }, { x: 2, y: 1, value: 50, name: "" }, { x: 2, y: 2, value: 25, name: "" }, { x: 2, y: 3, value: 0, name: "" },
		{ x: 2, y: 4, value: 0, name: "" }, { x: 3, y: 0, value: 100, name: "" }, { x: 3, y: 1, value: 75, name: "" }, { x: 3, y: 2, value: 50, name: "" }, { x: 3, y: 3, value: 25, name: "" },
		{ x: 3, y: 4, value: 0, name: "" }, { x: 4, y: 0, value: 100, name: "" }, { x: 4, y: 1, value: 75, name: "" }, { x: 4, y: 2, value: 50, name: "" }, { x: 4, y: 3, value: 25, name: "" },
		{ x: 4, y: 4, value: 0, name: "" }];
	}
	refreshRiesgoList() {
		this.calcularTipoRiesgo();
	}
	refreshControlList() {
		this.service.getControlesList().subscribe(data => {
			this.ControlList = data;
			//console.log("Lista de controles");
			//console.log(this.ControlList);
		});
	}
	refreshCausaList() {
		this.service.getCausasList().subscribe(datos => {
			this.CausaList = datos;
			//console.log("Lista de causas");
			//console.log(this.CausaList);
		});
	}
	calcularTipoRiesgo() {
		this.service.getRiesgoList().subscribe(data => {
			this.RiesgoList = data;
			for (let i = 0; i < this.RiesgoList.length; ++i) {
				if (this.RiesgoList[i].tipoEvento == 'Gobierno, Político y Económico' || this.RiesgoList[i].tipoEvento == 'Modelo de Negocios y Estrategias'
					|| this.RiesgoList[i].tipoEvento == 'Mercado, Industria y Competidores') {
					this.RiesgoList[i].tipoRiesgo = "Estratégico";
				}
				else if (this.RiesgoList[i].tipoEvento == 'Riesgo de crédito' || this.RiesgoList[i].tipoEvento == 'Riesgo de liquidez' ||
					this.RiesgoList[i].tipoEvento == 'Ingresos y Rentabilidad del Negocio' || this.RiesgoList[i].tipoEvento == 'Información Contable y Financiera') {
					this.RiesgoList[i].tipoRiesgo = "Financiero";
				}
				else if (this.RiesgoList[i].tipoEvento == 'Normativo / Regulatorio' || this.RiesgoList[i].tipoEvento == 'Legal / Fiscal' ||
					this.RiesgoList[i].tipoEvento == 'Tratados de Comercio Internaciones' || this.RiesgoList[i].tipoEvento == 'Requisitos del Cliente') {
					this.RiesgoList[i].tipoRiesgo = "Cumplimiento";
				}
				else if (this.RiesgoList[i].tipoEvento == 'Fraude Interno' || this.RiesgoList[i].tipoEvento == 'Fraude Externo') {
					this.RiesgoList[i].tipoRiesgo = "Fraude";
				}
				else if (this.RiesgoList[i].tipoEvento == 'Eficiencia, Calidad y Productividad' || this.RiesgoList[i].tipoEvento == 'Clientes, Productos y Prácticas Empresariales' ||
					this.RiesgoList[i].tipoEvento == 'Cadena de Suministro' || this.RiesgoList[i].tipoEvento == 'Higiene, Seguridad y Medio Ambiente' ||
					this.RiesgoList[i].tipoEvento == 'Estructura de la Compañía' || this.RiesgoList[i].tipoEvento == 'Continuidad del Negocio') {
					this.RiesgoList[i].tipoRiesgo = "Operacional";
				}
				else if (this.RiesgoList[i].tipoEvento == 'Sistemas e Infraestructura de Comunicaciones' || this.RiesgoList[i].tipoEvento == 'Segregación de Funciones' ||
					this.RiesgoList[i].tipoEvento == 'Calidad de la Información') {
					this.RiesgoList[i].tipoRiesgo = "Tecnológico";
				}
			}
			this.RiesgoList = data;
			this.calcularNivelRiesgoInherente(this.RiesgoList, data);
			//console.log("Lista de riesgos");
			//console.log(this.RiesgoList);
		});
	}
	/*VER CÓMO ACTUALIZAR LOS VALORES EN TIEMPO REAL */
	calcularNivelRiesgoInherente(RiesgoList: any, data: any) {
		for (let i = 0; i < RiesgoList.length; ++i) {
			if (RiesgoList[i].probabilidad == 'Muy Alta' && (RiesgoList[i].impacto == 'Marginal' || RiesgoList[i].impacto == 'Débil')) {
				RiesgoList[i].nivelRiesgo = "A";
			}
			else if (RiesgoList[i].probabilidad == 'Muy Alta' && (RiesgoList[i].impacto == 'Importante' || RiesgoList[i].impacto == 'Crítico' || RiesgoList[i].impacto == 'Catastrófico')) {
				RiesgoList[i].nivelRiesgo = "MA";
			}
			else if (RiesgoList[i].probabilidad == 'Alta' && (RiesgoList[i].impacto == 'Marginal')) {
				RiesgoList[i].nivelRiesgo = "M";
			}
			else if (RiesgoList[i].probabilidad == 'Alta' && (RiesgoList[i].impacto == 'Débil' || RiesgoList[i].impacto == 'Importante')) {
				RiesgoList[i].nivelRiesgo = "A";
			}
			else if (RiesgoList[i].probabilidad == 'Alta' && (RiesgoList[i].impacto == 'Crítico' || RiesgoList[i].impacto == 'Catastrófico')) {
				RiesgoList[i].nivelRiesgo = "MA";
			}
			else if (RiesgoList[i].probabilidad == 'Media' && (RiesgoList[i].impacto == 'Marginal')) {
				RiesgoList[i].nivelRiesgo = "B";
			}
			else if (RiesgoList[i].probabilidad == 'Media' && (RiesgoList[i].impacto == 'Débil' || RiesgoList[i].impacto == 'Importante')) {
				RiesgoList[i].nivelRiesgo = "M";
			}
			else if (RiesgoList[i].probabilidad == 'Media' && (RiesgoList[i].impacto == 'Crítico' || RiesgoList[i].impacto == 'Catastrófico')) {
				RiesgoList[i].nivelRiesgo = "MA";
			}
			else if (RiesgoList[i].probabilidad == 'Baja' && (RiesgoList[i].impacto == 'Marginal' || RiesgoList[i].impacto == 'Débil')) {
				RiesgoList[i].nivelRiesgo = "B";
			}
			else if (RiesgoList[i].probabilidad == 'Baja' && (RiesgoList[i].impacto == 'Importante')) {
				RiesgoList[i].nivelRiesgo = "M";
			}
			else if (RiesgoList[i].probabilidad == 'Baja' && (RiesgoList[i].impacto == 'Crítico')) {
				RiesgoList[i].nivelRiesgo = "A";
			}
			else if (RiesgoList[i].probabilidad == 'Baja' && (RiesgoList[i].impacto == 'Catastrófico')) {
				RiesgoList[i].nivelRiesgo = "MA";
			}
			else if (RiesgoList[i].probabilidad == 'Muy Baja' && (RiesgoList[i].impacto == 'Marginal')) {
				RiesgoList[i].nivelRiesgo = "MB";
			}
			else if (RiesgoList[i].probabilidad == 'Muy Baja' && (RiesgoList[i].impacto == 'Débil')) {
				RiesgoList[i].nivelRiesgo = "B";
			}
			else if (RiesgoList[i].probabilidad == 'Muy Baja' && (RiesgoList[i].impacto == 'Importante')) {
				RiesgoList[i].nivelRiesgo = "M";
			}
			else if (RiesgoList[i].probabilidad == 'Muy Baja' && (RiesgoList[i].impacto == 'Crítico' || RiesgoList[i].impacto == 'Catastrófico')) {
				RiesgoList[i].nivelRiesgo = "A";
			}

		}
		RiesgoList = data;
		this.calculosControles(RiesgoList);
	}

	calculosControles(RiesgoList: any) {
		this.calcularDiseñoControl(RiesgoList);
	}
	calcularDiseñoControl(RiesgoList: any) {
		this.service.getControlesList().subscribe(data => {
			this.ControlList = data;
			for (let i = 0; i < this.ControlList.length; ++i) {
				if (this.ControlList[i].evaluacionFuncionalidad == 0) {
					this.ControlList[i].disenoControl = "No se identifico control";
				}
				else if (this.ControlList[i].segregacion == 'Sí') {
					++this.valorDiseñoDeControl;
					//console.log("Coincidencia " + i + ": " + this.valorDiseñoDeControl);
				}
				if (this.ControlList[i].documentacion == 'Sí') {
					++this.valorDiseñoDeControl;
				}
				if (this.ControlList[i].naturalezaAdecuada == 'Sí') {
					++this.valorDiseñoDeControl;
				}
				if (this.ControlList[i].tipoAdecuado == 'Sí') {
					++this.valorDiseñoDeControl;
				}
				if (this.ControlList[i].frecuenciaAdecuada == 'Sí') {
					++this.valorDiseñoDeControl;
				}
				if (this.ControlList[i].responsabilidadControl == 'Sí') {
					++this.valorDiseñoDeControl;
				}
				if (this.ControlList[i].generacionEvidencia == 'Sí') {
					++this.valorDiseñoDeControl;
				}
				//console.log("Número de 'SÍ' en: " + this.ControlList[i].idControl + ": " + this.valorDiseñoDeControl);
				//Switch para todos los casos del diseño de control
				switch (this.valorDiseñoDeControl) {
					case 0:
						this.ControlList[i].disenoControl = "No Efectivo";
						break;
					case 1:
						this.ControlList[i].disenoControl = "No Efectivo";
						break;
					case 2:
						this.ControlList[i].disenoControl = "No Efectivo";
						break;
					case 3:
						this.ControlList[i].disenoControl = "No Efectivo";
						break;
					case 4:
						this.ControlList[i].disenoControl = "No Efectivo";
						break;
					case 5:
						this.ControlList[i].disenoControl = "No Efectivo";
						break;
					case 6:
						this.ControlList[i].disenoControl = "Requiere Mejora";
						break;
					case 7:
						this.ControlList[i].disenoControl = "Efectivo";
				}
				//Resetear el valor a 0 para evaluar el siguiente control
				this.valorDiseñoDeControl = 0;
			}
			this.ControlList = data;
			this.calcularEstrategiaMonitoreo(this.ControlList, RiesgoList);
		});
	}
	calcularEstrategiaMonitoreo(ControlList: any, RiesgoList: any) {
		for (let i = 0; i < ControlList.length; ++i) {
			if (ControlList[i].disenoControl == 'No Efectivo' || ControlList[i].disenoControl == 'Requiere Mejora'
				|| ControlList[i].disenoControl == 'No se identifico control') {
				ControlList[i].estrategiaMonitoreo = "Hasta que concluya plan de acción";
			}
			else if (ControlList[i].disenoControl == 'Efectivo' && ControlList[i].controlClave == 'Sí') {
				ControlList[i].estrategiaMonitoreo = "Pruebas de funcionalidad";
			}
			else if (ControlList[i].disenoControl == 'Efectivo' && ControlList[i].controlClave == 'No') {
				ControlList[i].estrategiaMonitoreo = "Hasta recorrido";
			}
		}
		this.calcularCalificacionControl(ControlList, RiesgoList);
		//console.log("Lista de controles despues de calcular estrategia de monitoreo: ");
		//console.log(ControlList);
	}

	calcularCalificacionControl(ControlList: any, RiesgoList: any) {
		for (let i = 0; i < ControlList.length; ++i) {
			if (ControlList[i].tipoControl == 'No efectivo') {
				ControlList[i].calificacionControl = 0;
			}
			if (ControlList[i].segregacion == 'Sí') {
				this.valorCalificacionControl = this.valorCalificacionControl + 15;
			}
			if (ControlList[i].documentacion == 'Sí') {
				this.valorCalificacionControl = this.valorCalificacionControl + 5;
			}
			if (ControlList[i].frecuenciaAdecuada == 'Sí') {
				this.valorCalificacionControl = this.valorCalificacionControl + 5;
			}
			if (ControlList[i].responsabilidadControl == 'Sí') {
				this.valorCalificacionControl = this.valorCalificacionControl + 8;
			}
			if (ControlList[i].generacionEvidencia == 'Sí') {
				this.valorCalificacionControl = this.valorCalificacionControl + 7;
			}
			switch (ControlList[i].tipoControl) {
				case "Detectivo":
					this.valorCalificacionControl = this.valorCalificacionControl + 10;
					break;
				case "Preventivo":
					this.valorCalificacionControl = this.valorCalificacionControl + 15;
			}
			switch (ControlList[i].naturalezaControl) {
				case "Manual":
					this.valorCalificacionControl = this.valorCalificacionControl + 5;
					break;
				case "Semi-automático":
					this.valorCalificacionControl = this.valorCalificacionControl + 10;
					break;
				case "Automático":
					this.valorCalificacionControl = this.valorCalificacionControl + 15;
			}
			ControlList[i].calificacionControl = this.valorCalificacionControl;
			this.valorCalificacionControl = 0;
		}
		this.calcularCoberturaPonderadaPorControl(ControlList, RiesgoList);
		//console.log("Lista de controles despues de calcular la calificación del control: ");
		//console.log(ControlList);

	}
	calcularCoberturaPonderadaPorControl(ControlList: any, RiesgoList: any) {
		for (let i = 0; i < ControlList.length; ++i) {
			if (ControlList[i].evaluacionFuncionalidad == 'No efectivo') {
				ControlList[i].coberturaPonderada = (Math.round((ControlList[i].calificacionControl * ControlList[i].cobertura * 0.5) / 100));
			}
			else {
				ControlList[i].coberturaPonderada = (Math.round((ControlList[i].calificacionControl * ControlList[i].cobertura) / 100));
			}
		}
		//console.log("Lista de controles despues de calcular coberturaPonderada: ");
		//console.log(ControlList);
		this.calcularCoberturaTotalControles(ControlList, RiesgoList);
	}
	calcularCoberturaTotalControles(ControlList: any, RiesgoList: any) {
		//Recorrer todas las listas, para encontrar todos los controles asociados que aparezcan en la matriz
		for (let i = 0; i < RiesgoList.length; ++i) {
			for (let k = 0; k < this.CausaList.length; ++k) {
				for (let j = 0; j < ControlList.length; ++j) {
					//Si los ID´s del riesgo, causa y control inherentes como asociados son iguales, entonces se suma la cobertura ponderada
					//de los controles adjuntos a la variable "coberturaTotalControles"
					if ((RiesgoList[i].idRiesgo === this.CausaList[k].idRiesgoAsociado || RiesgoList[i].idRiesgo === this.CausaList[k].idRiesgoAsociado2
						|| RiesgoList[i].idRiesgo === this.CausaList[k].idRiesgoAsociado3 || RiesgoList[i].idRiesgo === this.CausaList[k].idRiesgoAsociado4
						|| RiesgoList[i].idRiesgo === this.CausaList[k].idRiesgoAsociado5 || RiesgoList[i].idRiesgo === this.CausaList[k].idRiesgoAsociado6
						|| RiesgoList[i].idRiesgo === this.CausaList[k].idRiesgoAsociado7 || RiesgoList[i].idRiesgo === this.CausaList[k].idRiesgoAsociado8
						|| RiesgoList[i].idRiesgo === this.CausaList[k].idRiesgoAsociado9 || RiesgoList[i].idRiesgo === this.CausaList[k].idRiesgoAsociado10)
						&& (RiesgoList[i].idRiesgo === ControlList[j].idRiesgoAsociado || RiesgoList[i].idRiesgo === ControlList[j].idRiesgoAsociado2
							|| RiesgoList[i].idRiesgo === ControlList[j].idRiesgoAsociado3 || RiesgoList[i].idRiesgo === ControlList[j].idRiesgoAsociado4
							|| RiesgoList[i].idRiesgo === ControlList[j].idRiesgoAsociado5 || RiesgoList[i].idRiesgo === ControlList[j].idRiesgoAsociado6
							|| RiesgoList[i].idRiesgo === ControlList[j].idRiesgoAsociado7 || RiesgoList[i].idRiesgo === ControlList[j].idRiesgoAsociado8
							|| RiesgoList[i].idRiesgo === ControlList[j].idRiesgoAsociado9 || RiesgoList[i].idRiesgo === ControlList[j].idRiesgoAsociado10)
						&& (ControlList[j].idControl === this.CausaList[k].idControlAsociado || ControlList[j].idControl === this.CausaList[k].idControlAsociado2
							|| ControlList[j].idControl === this.CausaList[k].idControlAsociado3 || ControlList[j].idControl === this.CausaList[k].idControlAsociado4
							|| ControlList[j].idControl === this.CausaList[k].idControlAsociado5 || ControlList[j].idControl === this.CausaList[k].idControlAsociado6
							|| ControlList[j].idControl === this.CausaList[k].idControlAsociado7 || ControlList[j].idControl === this.CausaList[k].idControlAsociado8
							|| ControlList[j].idControl === this.CausaList[k].idControlAsociado9 || ControlList[j].idControl === this.CausaList[k].idControlAsociado10)) {
						//console.log("Id del control con el mismo riesgo asociado y causa: " + ControlList[j].idControl);
						//console.log("Cobertura ponderada del control " + ControlList[j].idControl + ": " + ControlList[j].coberturaPonderada);
						//Sumer la cobertura ponderada de los controles asociados a un riesgo a la variable "coberturaTotalControles"
						this.coberturaTotalControles = this.coberturaTotalControles + ControlList[j].coberturaPonderada;
						//Ciclo for aquí dentro de los controles, para llenar con la variable "coberturaTotalControles"
						//solo si el id del riesgo es igual al id del riesgo asociado, luego resetear la variable "coberturaTotalControles"
						for (let l = 0; l < ControlList.length; ++l) {
							if (RiesgoList[i].idRiesgo === ControlList[l].idRiesgoAsociado || RiesgoList[i].idRiesgo === ControlList[l].idRiesgoAsociado2
								|| RiesgoList[i].idRiesgo === ControlList[l].idRiesgoAsociado3 || RiesgoList[i].idRiesgo === ControlList[l].idRiesgoAsociado4
								|| RiesgoList[i].idRiesgo === ControlList[l].idRiesgoAsociado5 || RiesgoList[i].idRiesgo === ControlList[l].idRiesgoAsociado6
								|| RiesgoList[i].idRiesgo === ControlList[l].idRiesgoAsociado7 || RiesgoList[i].idRiesgo === ControlList[l].idRiesgoAsociado8
								|| RiesgoList[i].idRiesgo === ControlList[l].idRiesgoAsociado9 || RiesgoList[i].idRiesgo === ControlList[l].idRiesgoAsociado10) {
								ControlList[l].coberturaTotal = this.coberturaTotalControles;
							}
						}
					}
				}
			}
			//Resetar la variable "coberturaTotalControles" para que no se sumen todas las coberturas ponderadas de los controles
			this.coberturaTotalControles = 0;
		}
		this.calcularNivelCobertura(ControlList, RiesgoList);
	}

	calcularNivelCobertura(ControlList: any, RiesgoList: any) {
		//Recorrer lista de los controles
		for (let j = 0; j < ControlList.length; ++j) {
			//Si la cobertura total 0-20%, cobetura = Ausencia de control
			if (ControlList[j].coberturaTotal <= 20) {
				ControlList[j].nivelCobertura = "Ausencia de control";
			}
			//Si la cobertura total 20-40%, cobetura = Bajo
			else if (ControlList[j].coberturaTotal > 20 && ControlList[j].coberturaTotal <= 40) {
				ControlList[j].nivelCobertura = "Bajo";
			}
			//Si la cobertura total 40-60%, cobetura = Medio
			else if (ControlList[j].coberturaTotal > 40 && ControlList[j].coberturaTotal <= 60) {
				ControlList[j].nivelCobertura = "Medio";
			}
			//Si la cobertura total 60-80%, cobetura = Alto
			else if (ControlList[j].coberturaTotal > 60 && ControlList[j].coberturaTotal <= 80) {
				ControlList[j].nivelCobertura = "Alto";
			}
			//Si la cobertura total 80-100%, cobetura = Total
			else if (ControlList[j].coberturaTotal > 80 && ControlList[j].coberturaTotal <= 100) {
				ControlList[j].nivelCobertura = "Total";
			}
		}
		this.calcularGravedadRiesgoResidual(ControlList, RiesgoList);
	}

	calcularGravedadRiesgoResidual(ControlList: any, RiesgoList: any) {
		//Recorrer lista de los controles
		//Recorrer lista de los riesgos
		for (let i = 0; i < RiesgoList.length; ++i) {
			for (let j = 0; j < ControlList.length; ++j) {
				//Si el id del riesgo es igual al id del riesgo asociado, luego comparar si el nivelRiesgo es alto
				if (RiesgoList[i].idRiesgo === ControlList[j].idRiesgoAsociado || RiesgoList[i].idRiesgo === ControlList[j].idRiesgoAsociado2
					|| RiesgoList[i].idRiesgo === ControlList[j].idRiesgoAsociado3 || RiesgoList[i].idRiesgo === ControlList[j].idRiesgoAsociado4
					|| RiesgoList[i].idRiesgo === ControlList[j].idRiesgoAsociado5 || RiesgoList[i].idRiesgo === ControlList[j].idRiesgoAsociado6
					|| RiesgoList[i].idRiesgo === ControlList[j].idRiesgoAsociado7 || RiesgoList[i].idRiesgo === ControlList[j].idRiesgoAsociado8
					|| RiesgoList[i].idRiesgo === ControlList[j].idRiesgoAsociado9 || RiesgoList[i].idRiesgo === ControlList[j].idRiesgoAsociado10
					&& RiesgoList[i].macroProceso === this._Activatedroute.snapshot.paramMap.get('macro')) {
					//Si el nivel de riesgo inherente es "MA"
					if (RiesgoList[i].nivelRiesgo === "MA") {
						//Switch con los casos para el nivel de riesgo inherente "MA"
						switch (ControlList[j].nivelCobertura) {
							case "Total":
								console.log("Macro aqui: " + this._Activatedroute.snapshot.paramMap.get('macro'));
								RiesgoList[i].gravedadRiesgoResidual = "MB";
								var val = {
									idRiesgo: RiesgoList[i].idRiesgo,
									riesgoInherente: RiesgoList[i].nivelRiesgo,
									macroproceso: RiesgoList[i].macroProceso,
									nivelCTC: ControlList[j].nivelCobertura,
									gravedadRiesgoResidual: RiesgoList[i].gravedadRiesgoResidual
								}
								this.RiesgosMapa.push(val);
								break;
							case "Alto":
								RiesgoList[i].gravedadRiesgoResidual = "M";
								var val = {
									idRiesgo: RiesgoList[i].idRiesgo,
									riesgoInherente: RiesgoList[i].nivelRiesgo,
									macroproceso: RiesgoList[i].macroProceso,
									nivelCTC: ControlList[j].nivelCobertura,
									gravedadRiesgoResidual: RiesgoList[i].gravedadRiesgoResidual
								}
								this.RiesgosMapa.push(val);
								break;
							case "Medio":
								RiesgoList[i].gravedadRiesgoResidual = "A";
								var val = {
									idRiesgo: RiesgoList[i].idRiesgo,
									riesgoInherente: RiesgoList[i].nivelRiesgo,
									macroproceso: RiesgoList[i].macroProceso,
									nivelCTC: ControlList[j].nivelCobertura,
									gravedadRiesgoResidual: RiesgoList[i].gravedadRiesgoResidual
								}
								this.RiesgosMapa.push(val);
								break;
							case "Bajo":
								RiesgoList[i].gravedadRiesgoResidual = "MA";
								var val = {
									idRiesgo: RiesgoList[i].idRiesgo,
									riesgoInherente: RiesgoList[i].nivelRiesgo,
									macroproceso: RiesgoList[i].macroProceso,
									nivelCTC: ControlList[j].nivelCobertura,
									gravedadRiesgoResidual: RiesgoList[i].gravedadRiesgoResidual
								}
								this.RiesgosMapa.push(val);
								break;
							case "Ausencia de control":
								RiesgoList[i].gravedadRiesgoResidual = "MA";
								var val = {
									idRiesgo: RiesgoList[i].idRiesgo,
									riesgoInherente: RiesgoList[i].nivelRiesgo,
									macroproceso: RiesgoList[i].macroProceso,
									nivelCTC: ControlList[j].nivelCobertura,
									gravedadRiesgoResidual: RiesgoList[i].gravedadRiesgoResidual
								}
								this.RiesgosMapa.push(val);
						}
					}
					//Si el nivel de riesgo inherente es "A"
					else if (RiesgoList[i].nivelRiesgo === "A") {
						//Switch con los casos para el nivel de riesgo inherente "A"
						switch (ControlList[j].nivelCobertura) {
							case "Total":
								RiesgoList[i].gravedadRiesgoResidual = "MB";
								var val = {
									idRiesgo: RiesgoList[i].idRiesgo,
									riesgoInherente: RiesgoList[i].nivelRiesgo,
									macroproceso: RiesgoList[i].macroProceso,
									nivelCTC: ControlList[j].nivelCobertura,
									gravedadRiesgoResidual: RiesgoList[i].gravedadRiesgoResidual
								}
								this.RiesgosMapa.push(val);
								break;
							case "Alto":
								RiesgoList[i].gravedadRiesgoResidual = "B";
								var val = {
									idRiesgo: RiesgoList[i].idRiesgo,
									riesgoInherente: RiesgoList[i].nivelRiesgo,
									macroproceso: RiesgoList[i].macroProceso,
									nivelCTC: ControlList[j].nivelCobertura,
									gravedadRiesgoResidual: RiesgoList[i].gravedadRiesgoResidual
								}
								this.RiesgosMapa.push(val);
								break;
							case "Medio":
								RiesgoList[i].gravedadRiesgoResidual = "M";
								var val = {
									idRiesgo: RiesgoList[i].idRiesgo,
									riesgoInherente: RiesgoList[i].nivelRiesgo,
									macroproceso: RiesgoList[i].macroProceso,
									nivelCTC: ControlList[j].nivelCobertura,
									gravedadRiesgoResidual: RiesgoList[i].gravedadRiesgoResidual
								}
								this.RiesgosMapa.push(val);
								break;
							case "Bajo":
								RiesgoList[i].gravedadRiesgoResidual = "A";
								var val = {
									idRiesgo: RiesgoList[i].idRiesgo,
									riesgoInherente: RiesgoList[i].nivelRiesgo,
									macroproceso: RiesgoList[i].macroProceso,
									nivelCTC: ControlList[j].nivelCobertura,
									gravedadRiesgoResidual: RiesgoList[i].gravedadRiesgoResidual
								}
								this.RiesgosMapa.push(val);
								break;
							case "Ausencia de control":
								RiesgoList[i].gravedadRiesgoResidual = "A";
								var val = {
									idRiesgo: RiesgoList[i].idRiesgo,
									riesgoInherente: RiesgoList[i].nivelRiesgo,
									macroproceso: RiesgoList[i].macroProceso,
									nivelCTC: ControlList[j].nivelCobertura,
									gravedadRiesgoResidual: RiesgoList[i].gravedadRiesgoResidual
								}
								this.RiesgosMapa.push(val);
						}
					}
					//Si el nivel de riesgo inherente es "M"
					else if (this.RiesgoList[i].nivelRiesgo === "M") {
						//Switch con los casos para el nivel de riesgo inherente "M"
						switch (ControlList[j].nivelCobertura) {
							case "Total":
								RiesgoList[i].gravedadRiesgoResidual = "MB";
								var val = {
									idRiesgo: RiesgoList[i].idRiesgo,
									riesgoInherente: RiesgoList[i].nivelRiesgo,
									macroproceso: RiesgoList[i].macroProceso,
									nivelCTC: ControlList[j].nivelCobertura,
									gravedadRiesgoResidual: RiesgoList[i].gravedadRiesgoResidual
								}
								this.RiesgosMapa.push(val);
								break;
							case "Alto":
								RiesgoList[i].gravedadRiesgoResidual = "MB";
								var val = {
									idRiesgo: RiesgoList[i].idRiesgo,
									riesgoInherente: RiesgoList[i].nivelRiesgo,
									macroproceso: RiesgoList[i].macroProceso,
									nivelCTC: ControlList[j].nivelCobertura,
									gravedadRiesgoResidual: RiesgoList[i].gravedadRiesgoResidual
								}
								this.RiesgosMapa.push(val);
								break;
							case "Medio":
								RiesgoList[i].gravedadRiesgoResidual = "B";
								var val = {
									idRiesgo: RiesgoList[i].idRiesgo,
									riesgoInherente: RiesgoList[i].nivelRiesgo,
									macroproceso: RiesgoList[i].macroProceso,
									nivelCTC: ControlList[j].nivelCobertura,
									gravedadRiesgoResidual: RiesgoList[i].gravedadRiesgoResidual
								}
								this.RiesgosMapa.push(val);
								break;
							case "Bajo":
								RiesgoList[i].gravedadRiesgoResidual = "M";
								var val = {
									idRiesgo: RiesgoList[i].idRiesgo,
									riesgoInherente: RiesgoList[i].nivelRiesgo,
									macroproceso: RiesgoList[i].macroProceso,
									nivelCTC: ControlList[j].nivelCobertura,
									gravedadRiesgoResidual: RiesgoList[i].gravedadRiesgoResidual
								}
								this.RiesgosMapa.push(val);
								break;
							case "Ausencia de control":
								RiesgoList[i].gravedadRiesgoResidual = "M";
								var val = {
									idRiesgo: RiesgoList[i].idRiesgo,
									riesgoInherente: RiesgoList[i].nivelRiesgo,
									macroproceso: RiesgoList[i].macroProceso,
									nivelCTC: ControlList[j].nivelCobertura,
									gravedadRiesgoResidual: RiesgoList[i].gravedadRiesgoResidual
								}
								this.RiesgosMapa.push(val);
						}
					}
					//Si el nivel de riesgo inherente es "B"
					else if (RiesgoList[i].nivelRiesgo === "B") {
						//Switch con los casos para el nivel de riesgo inherente "B"
						switch (ControlList[j].nivelCobertura) {
							case "Total":
								RiesgoList[i].gravedadRiesgoResidual = "MB";
								var val = {
									idRiesgo: RiesgoList[i].idRiesgo,
									riesgoInherente: RiesgoList[i].nivelRiesgo,
									macroproceso: RiesgoList[i].macroProceso,
									nivelCTC: ControlList[j].nivelCobertura,
									gravedadRiesgoResidual: RiesgoList[i].gravedadRiesgoResidual
								}
								this.RiesgosMapa.push(val);
								break;
							case "Alto":
								RiesgoList[i].gravedadRiesgoResidual = "MB";
								var val = {
									idRiesgo: RiesgoList[i].idRiesgo,
									riesgoInherente: RiesgoList[i].nivelRiesgo,
									macroproceso: RiesgoList[i].macroProceso,
									nivelCTC: ControlList[j].nivelCobertura,
									gravedadRiesgoResidual: RiesgoList[i].gravedadRiesgoResidual
								}
								this.RiesgosMapa.push(val);
								break;
							case "Medio":
								RiesgoList[i].gravedadRiesgoResidual = "MB";
								var val = {
									idRiesgo: RiesgoList[i].idRiesgo,
									riesgoInherente: RiesgoList[i].nivelRiesgo,
									macroproceso: RiesgoList[i].macroProceso,
									nivelCTC: ControlList[j].nivelCobertura,
									gravedadRiesgoResidual: RiesgoList[i].gravedadRiesgoResidual
								}
								this.RiesgosMapa.push(val);
								break;
							case "Bajo":
								RiesgoList[i].gravedadRiesgoResidual = "B";
								var val = {
									idRiesgo: RiesgoList[i].idRiesgo,
									riesgoInherente: RiesgoList[i].nivelRiesgo,
									macroproceso: RiesgoList[i].macroProceso,
									nivelCTC: ControlList[j].nivelCobertura,
									gravedadRiesgoResidual: RiesgoList[i].gravedadRiesgoResidual
								}
								this.RiesgosMapa.push(val);
								break;
							case "Ausencia de control":
								RiesgoList[i].gravedadRiesgoResidual = "B";
								var val = {
									idRiesgo: RiesgoList[i].idRiesgo,
									riesgoInherente: RiesgoList[i].nivelRiesgo,
									macroproceso: RiesgoList[i].macroProceso,
									nivelCTC: ControlList[j].nivelCobertura,
									gravedadRiesgoResidual: RiesgoList[i].gravedadRiesgoResidual
								}
								this.RiesgosMapa.push(val);
						}
					}
					//Si el nivel de riesgo inherente es "MB"
					else if (RiesgoList[i].nivelRiesgo === "MB") {
						//Switch con los casos para el nivel de riesgo inherente "MA"
						switch (ControlList[j].nivelCobertura) {
							case "Total":
								RiesgoList[i].gravedadRiesgoResidual = "MB";
								var val = {
									idRiesgo: RiesgoList[i].idRiesgo,
									riesgoInherente: RiesgoList[i].nivelRiesgo,
									macroproceso: RiesgoList[i].macroProceso,
									nivelCTC: ControlList[j].nivelCobertura,
									gravedadRiesgoResidual: RiesgoList[i].gravedadRiesgoResidual
								}
								this.RiesgosMapa.push(val);
								break;
							case "Alto":
								RiesgoList[i].gravedadRiesgoResidual = "MB";
								var val = {
									idRiesgo: RiesgoList[i].idRiesgo,
									riesgoInherente: RiesgoList[i].nivelRiesgo,
									macroproceso: RiesgoList[i].macroProceso,
									nivelCTC: ControlList[j].nivelCobertura,
									gravedadRiesgoResidual: RiesgoList[i].gravedadRiesgoResidual
								}
								this.RiesgosMapa.push(val);
								break;
							case "Medio":
								RiesgoList[i].gravedadRiesgoResidual = "MB";
								var val = {
									idRiesgo: RiesgoList[i].idRiesgo,
									riesgoInherente: RiesgoList[i].nivelRiesgo,
									macroproceso: RiesgoList[i].macroProceso,
									nivelCTC: ControlList[j].nivelCobertura,
									gravedadRiesgoResidual: RiesgoList[i].gravedadRiesgoResidual
								}
								this.RiesgosMapa.push(val);
								break;
							case "Bajo":
								RiesgoList[i].gravedadRiesgoResidual = "MB";
								var val = {
									idRiesgo: RiesgoList[i].idRiesgo,
									riesgoInherente: RiesgoList[i].nivelRiesgo,
									macroproceso: RiesgoList[i].macroProceso,
									nivelCTC: ControlList[j].nivelCobertura,
									gravedadRiesgoResidual: RiesgoList[i].gravedadRiesgoResidual
								}
								this.RiesgosMapa.push(val);
								break;
							case "Ausencia de control":
								RiesgoList[i].gravedadRiesgoResidual = "MB";
								var val = {
									idRiesgo: RiesgoList[i].idRiesgo,
									riesgoInherente: RiesgoList[i].nivelRiesgo,
									macroproceso: RiesgoList[i].macroProceso,
									nivelCTC: ControlList[j].nivelCobertura,
									gravedadRiesgoResidual: RiesgoList[i].gravedadRiesgoResidual
								}
								this.RiesgosMapa.push(val);
						}
					}
				}
			}
		}
		//Remover riesgos repetidos en el array de RiesgosFinales
		this.riesgosUnicos = this.RiesgosMapa.filter((element: { idRiesgo: any; }) => {
			const esDuplicado = this.idRiesgosUnicos.includes(element.idRiesgo);

			if (!esDuplicado) {
				this.idRiesgosUnicos.push(element.idRiesgo);
				return true;
			}

			return false;
		});
		/*console.log("Lista riesgos final");
		console.log(this.RiesgosMapa);*/
		console.log("Lista arregloSinRepetidos");
		console.log(this.riesgosUnicos);
		//Poblar el mapa de riesgos residuales
		for (let i = 0; i < this.riesgosUnicos.length; ++i) {
				//Verificar el maroproceso de cada riesgo y si está activo el riesgo
				if (this.riesgosUnicos[i].macroproceso == this._Activatedroute.snapshot.paramMap.get('macro')
				&& this.riesgosUnicos[i].idRiesgo !== 'NULL') {
					//Si el nivel de riesgo inherente es "MA"
					if (this.riesgosUnicos[i].riesgoInherente === "MA") {
						//Switch con los casos para el nivel de riesgo inherente "MA"
						switch (this.riesgosUnicos[i].nivelCTC) {
							case "Total":
								this.riesgoMuyAltoTotal = this.riesgoMuyAltoTotal + " " + this.riesgosUnicos[i].idRiesgo;
								this.mapaResidual.series[0]['data'][0] = {
									x: 0,
									y: 0,
									value: 0,
									name: this.riesgoMuyAltoTotal,
									description: ""
								};
								break;
							case "Alto":
								this.riesgoMuyAltoAlto = this.riesgoMuyAltoAlto + " " + this.riesgosUnicos[i].idRiesgo;
								this.mapaResidual.series[0]['data'][5] = {
									x: 1,
									y: 0,
									value: 50,
									name: this.riesgoMuyAltoAlto,
									description: ""
								};
								break;
							case "Medio":
								this.riesgoMuyAltoMedio = this.riesgoMuyAltoMedio + " " + this.riesgosUnicos[i].idRiesgo;
								this.mapaResidual.series[0]['data'][10] = {
									x: 2,
									y: 0,
									value: 75,
									name: this.riesgoMuyAltoMedio,
									description: ""
								};
								break;
							case "Bajo":
								this.riesgoMuyAltoBajo = this.riesgoMuyAltoBajo + " " + this.riesgosUnicos[i].idRiesgo;
								this.mapaResidual.series[0]['data'][15] = {
									x: 3,
									y: 0,
									value: 100,
									name: this.riesgoMuyAltoBajo,
									description: ""
								}
								break;
							case "Ausencia de control":
								this.riesgoMuyAltoAusenciaControl = this.riesgoMuyAltoAusenciaControl + " " + this.riesgosUnicos[i].idRiesgo;
								this.mapaResidual.series[0]['data'][20] = {
									x: 4,
									y: 0,
									value: 100,
									name: this.riesgoMuyAltoAusenciaControl,
									description: ""
								}
						}
					}
					//Si el nivel de riesgo inherente es "A"
					else if (RiesgoList[i].nivelRiesgo === "A") {
						//Switch con los casos para el nivel de riesgo inherente "A"
						switch (this.riesgosUnicos[i].nivelCTC) {
							case "Total":
								this.riesgoAltoTotal = this.riesgoAltoTotal + " " + this.riesgosUnicos[i].idRiesgo;
								this.mapaResidual.series[0]['data'][1] = {
									x: 0,
									y: 1,
									value: 0,
									name: this.riesgoAltoTotal,
									description: ""
								}
								break;
							case "Alto":
								this.riesgoAltoAlto = this.riesgoAltoAlto + " " + this.riesgosUnicos[i].idRiesgo;
								this.mapaResidual.series[0]['data'][6] = {
									x: 1,
									y: 1,
									value: 25,
									name: this.riesgoAltoAlto,
									description: ""
								}
								break;
							case "Medio":
								this.riesgoAltoMedio = this.riesgoAltoMedio + this.riesgosUnicos[i].idRiesgo;
								this.mapaResidual.series[0]['data'][11] = {
									x: 2,
									y: 1,
									value: 50,
									name: this.riesgoAltoMedio,
									description: ""
								}
								break;
							case "Bajo":
								this.riesgoAltoBajo = this.riesgoAltoBajo + " " + this.riesgosUnicos[i].idRiesgo;
								this.mapaResidual.series[0]['data'][16] = {
									x: 3,
									y: 1,
									value: 75,
									name: this.riesgoAltoBajo,
									description: ""
								}
								break;
							case "Ausencia de control":
								this.riesgoAltoAusenciaControl = this.riesgoAltoAusenciaControl + " " + this.riesgosUnicos[i].idRiesgo;
								this.mapaResidual.series[0]['data'][21] = {
									x: 4,
									y: 1,
									value: 75,
									name: this.riesgoAltoAusenciaControl,
									description: ""
								}
						}
					}
					//Si el nivel de riesgo inherente es "M"
					else if (this.riesgosUnicos[i].riesgoInherente === "M") {
						//Switch con los casos para el nivel de riesgo inherente "M"
						switch (this.riesgosUnicos[i].nivelCTC) {
							case "Total":
								this.riesgoMedioTotal = this.riesgoMedioTotal + " " + this.riesgosUnicos[i].idRiesgo;
								this.mapaResidual.series[0]['data'][2] = {
									x: 0,
									y: 2,
									value: 0,
									name: this.riesgoMedioTotal,
									description: ""
								}
								break;
							case "Alto":
								this.riesgoMedioAlto = this.riesgoMedioAlto + " " + this.riesgosUnicos[i].idRiesgo;
								this.mapaResidual.series[0]['data'][7] = {
									x: 1,
									y: 2,
									value: 0,
									name: this.riesgoMedioAlto,
									description: ""
								}
								break;
							case "Medio":
								this.riesgoMedioMedio = this.riesgoMedioMedio + " " + this.riesgosUnicos[i].idRiesgo;
								this.mapaResidual.series[0]['data'][12] = {
									x: 2,
									y: 2,
									value: 25,
									name: this.riesgoMedioMedio,
									description: ""
								}
								break;
							case "Bajo":
								this.riesgoMedioBajo = this.riesgoMedioBajo + " " + this.riesgosUnicos[i].idRiesgo;
								this.mapaResidual.series[0]['data'][17] = {
									x: 3,
									y: 2,
									value: 50,
									name: this.riesgoMedioBajo,
									description: ""
								}
								break;
							case "Ausencia de control":
								this.riesgoMedioAusenciaControl = this.riesgoMedioAusenciaControl + " " + this.riesgosUnicos[i].idRiesgo;
								this.mapaResidual.series[0]['data'][22] = {
									x: 4,
									y: 2,
									value: 50,
									name: this.riesgoMedioAusenciaControl,
									description: ""
								}
						}
					}
					//Si el nivel de riesgo inherente es "B"
					else if (this.riesgosUnicos[i].riesgoInherente === "B") {
						//Switch con los casos para el nivel de riesgo inherente "B"
						switch (this.riesgosUnicos[i].nivelCTC) {
							case "Total":
								this.riesgoBajoTotal = this.riesgoBajoTotal + " " + this.riesgosUnicos[i].idRiesgo;
								this.mapaResidual.series[0]['data'][3] = {
									x: 0,
									y: 3,
									value: 0,
									name: this.riesgoBajoTotal,
									description: ""
								}
								break;
							case "Alto":
								this.riesgoBajoAlto = this.riesgoBajoAlto + " " + this.riesgosUnicos[i].idRiesgo;
								this.mapaResidual.series[0]['data'][8] = {
									x: 1,
									y: 3,
									value: 0,
									name: this.riesgoBajoAlto,
									description: ""
								}
								break;
							case "Medio":
								this.riesgoBajoMedio = this.riesgoBajoMedio + " " + this.riesgosUnicos[i].idRiesgo;
								this.mapaResidual.series[0]['data'][13] = {
									x: 2,
									y: 3,
									value: 0,
									name: this.riesgoBajoMedio,
									description: ""
								}
								break;
							case "Bajo":
								RiesgoList[i].gravedadRiesgoResidual = "B";
								this.riesgoBajoBajo = this.riesgoBajoBajo + " " + this.riesgosUnicos[i].idRiesgo;
								this.mapaResidual.series[0]['data'][18] = {
									x: 3,
									y: 3,
									value: 25,
									name: this.riesgoBajoBajo,
									description: ""
								}
								break;
							case "Ausencia de control":
								this.riesgoBajoAusenciaControl = this.riesgoBajoAusenciaControl + " " + this.riesgosUnicos[i].idRiesgo;
								this.mapaResidual.series[0]['data'][23] = {
									x: 4,
									y: 3,
									value: 25,
									name: this.riesgoBajoAusenciaControl,
									description: ""
								}
						}
					}
					//Si el nivel de riesgo inherente es "MB"
					else if (this.riesgosUnicos[i].riesgoInherente === "MB") {
						//Switch con los casos para el nivel de riesgo inherente "MA"
						switch (this.riesgosUnicos[i].nivelCTC) {
							case "Total":
								this.riesgoMuyBajoTotal = this.riesgoMuyBajoTotal + " " + this.riesgosUnicos[i].idRiesgo;
								this.mapaResidual.series[0]['data'][4] = {
									x: 0,
									y: 4,
									value: 0,
									name: this.riesgoMuyBajoTotal,
									description: ""
								}
								break;
							case "Alto":
								this.riesgoMuyBajoAlto = this.riesgoMuyBajoAlto + " " + this.riesgosUnicos[i].idRiesgo;
								this.mapaResidual.series[0]['data'][9] = {
									x: 1,
									y: 4,
									value: 0,
									name: this.riesgoMuyBajoAlto,
									description: ""
								}
								break;
							case "Medio":
								this.riesgoMuyBajoMedio = this.riesgoMuyBajoMedio + " " + this.riesgosUnicos[i].idRiesgo;
								this.mapaResidual.series[0]['data'][14] = {
									x: 2,
									y: 4,
									value: 0,
									name: this.riesgoMuyBajoMedio,
									description: ""
								}
								break;
							case "Bajo":
								this.riesgoMuyBajoBajo = this.riesgoMuyBajoBajo + " " + this.riesgosUnicos[i].idRiesgo;
								this.mapaResidual.series[0]['data'][19] = {
									x: 3,
									y: 4,
									value: 0,
									name: this.riesgoMuyBajoBajo,
									description: ""
								}
								break;
							case "Ausencia de control":
								this.riesgoMuyBajoAusenciaControl = this.riesgoMuyBajoAusenciaControl + " " + this.riesgosUnicos[i].idRiesgo;
								this.mapaResidual.series[0]['data'][24] = {
									x: 4,
									y: 4,
									value: 0,
									name: this.riesgoMuyBajoAusenciaControl,
									description: ""
								}
						}
					}
					//Si riesgoMuyAltoTotal es nulo
					if (this.riesgoMuyAltoTotal === "") {
						this.mapaResidual.series[0]['data'][0] = {
							x: 0,
							y: 0,
							value: 0,
							name: "",
							description: "No existen riesgos para este cuadrante"
						};
					}
					//Si riesgoAltoTotal es nulo
					if (this.riesgoAltoTotal === "") {
						this.mapaResidual.series[0]['data'][1] = {
							x: 0,
							y: 1,
							value: 0,
							name: "",
							description: "No existen riesgos para este cuadrante"
						};
					}
					//Si riesgoMedioTotal es nulo
					if (this.riesgoMedioTotal === "") {
						this.mapaResidual.series[0]['data'][2] = {
							x: 0,
							y: 2,
							value: 0,
							name: "",
							description: "No existen riesgos para este cuadrante"
						};
					}
					//Si riesgoBajoTotal es nulo
					if (this.riesgoBajoTotal === "") {
						this.mapaResidual.series[0]['data'][3] = {
							x: 0,
							y: 3,
							value: 0,
							name: "",
							description: "No existen riesgos para este cuadrante"
						};
					}
					//Si riesgoMuyBajoTotal es nulo
					if (this.riesgoMuyBajoTotal === "") {
						this.mapaResidual.series[0]['data'][4] = {
							x: 0,
							y: 4,
							value: 0,
							name: "",
							description: "No existen riesgos para este cuadrante"
						};
					}
					//Si riesgoMuyAltoAlto es nulo
					if (this.riesgoMuyAltoAlto === "") {
						this.mapaResidual.series[0]['data'][5] = {
							x: 1,
							y: 0,
							value: 50,
							name: "",
							description: "No existen riesgos para este cuadrante"
						};
					}
					//Si riesgoAltoAlto es nulo
					if (this.riesgoAltoAlto === "") {
						this.mapaResidual.series[0]['data'][6] = {
							x: 1,
							y: 1,
							value: 25,
							name: "",
							description: "No existen riesgos para este cuadrante"
						};
					}
					//Si riesgoMedioAlto es nulo
					if (this.riesgoMedioAlto === "") {
						this.mapaResidual.series[0]['data'][7] = {
							x: 1,
							y: 2,
							value: 0,
							name: "",
							description: "No existen riesgos para este cuadrante"
						};
					}
					//Si riesgoBajoAlto es nulo
					if (this.riesgoBajoAlto === "") {
						this.mapaResidual.series[0]['data'][8] = {
							x: 1,
							y: 3,
							value: 0,
							name: "",
							description: "No existen riesgos para este cuadrante"
						};
					}
					//Si riesgoMuyBajoAlto es nulo
					if (this.riesgoMuyBajoAlto === "") {
						this.mapaResidual.series[0]['data'][9] = {
							x: 1,
							y: 4,
							value: 0,
							name: "",
							description: "No existen riesgos para este cuadrante"
						};
					}
					//Si riesgoMuyAltoMedio es nulo
					if (this.riesgoMuyAltoMedio === "") {
						this.mapaResidual.series[0]['data'][10] = {
							x: 2,
							y: 0,
							value: 75,
							name: "",
							description: "No existen riesgos para este cuadrante"
						};
					}
					//Si riesgoAltoMedio es nulo
					if (this.riesgoAltoMedio === "") {
						this.mapaResidual.series[0]['data'][11] = {
							x: 2,
							y: 1,
							value: 50,
							name: "",
							description: "No existen riesgos para este cuadrante"
						};
					}
					//Si riesgoMedioMedio es nulo
					if (this.riesgoMedioMedio === "") {
						this.mapaResidual.series[0]['data'][12] = {
							x: 2,
							y: 2,
							value: 25,
							name: "",
							description: "No existen riesgos para este cuadrante"
						};
					}
					//Si riesgoBajoMedio es nulo
					if (this.riesgoBajoMedio === "") {
						this.mapaResidual.series[0]['data'][13] = {
							x: 2,
							y: 3,
							value: 0,
							name: "",
							description: "No existen riesgos para este cuadrante"
						};
					}
					//Si riesgoMuyBajoMedio es nulo
					if (this.riesgoMuyBajoMedio === "") {
						this.mapaResidual.series[0]['data'][14] = {
							x: 2,
							y: 4,
							value: 0,
							name: "",
							description: "No existen riesgos para este cuadrante"
						};
					}
					//Si riesgoMuyAltoBajo es nulo
					if (this.riesgoMuyAltoBajo === "") {
						this.mapaResidual.series[0]['data'][15] = {
							x: 3,
							y: 0,
							value: 100,
							name: "",
							description: "No existen riesgos para este cuadrante"
						};
					}
					//Si riesgoAltoBajo es nulo
					if (this.riesgoAltoBajo === "") {
						this.mapaResidual.series[0]['data'][16] = {
							x: 3,
							y: 1,
							value: 75,
							name: "",
							description: "No existen riesgos para este cuadrante"
						};
					}
					//Si riesgoMedioBajo es nulo
					if (this.riesgoMedioBajo === "") {
						this.mapaResidual.series[0]['data'][17] = {
							x: 3,
							y: 2,
							value: 50,
							name: "",
							description: "No existen riesgos para este cuadrante"
						};
					}
					//Si riesgoBajoBajo es nulo
					if (this.riesgoBajoBajo === "") {
						this.mapaResidual.series[0]['data'][18] = {
							x: 3,
							y: 3,
							value: 25,
							name: "",
							description: "No existen riesgos para este cuadrante"
						};
					}
					//Si riesgoMuyBajoBajo es nulo
					if (this.riesgoMuyBajoBajo === "") {
						this.mapaResidual.series[0]['data'][19] = {
							x: 3,
							y: 4,
							value: 0,
							name: "",
							description: "No existen riesgos para este cuadrante"
						};
					}
					//Si riesgoMuyAltoAusenciaControl es nulo
					if (this.riesgoMuyAltoAusenciaControl === "") {
						this.mapaResidual.series[0]['data'][20] = {
							x: 4,
							y: 0,
							value: 100,
							name: "",
							description: "No existen riesgos para este cuadrante"
						};
					}
					//Si riesgoAltoAusenciaControl es nulo
					if (this.riesgoAltoAusenciaControl === "") {
						this.mapaResidual.series[0]['data'][21] = {
							x: 4,
							y: 1,
							value: 75,
							name: "",
							description: "No existen riesgos para este cuadrante"
						};
					}
					//Si riesgoMedioAusenciaControl es nulo
					if (this.riesgoMedioAusenciaControl === "") {
						this.mapaResidual.series[0]['data'][22] = {
							x: 4,
							y: 2,
							value: 50,
							name: "",
							description: "No existen riesgos para este cuadrante"
						};
					}
					//Si riesgoBajoAusenciaControl es nulo
					if (this.riesgoBajoAusenciaControl === "") {
						this.mapaResidual.series[0]['data'][23] = {
							x: 4,
							y: 3,
							value: 25,
							name: "",
							description: "No existen riesgos para este cuadrante"
						};
					}
					//Si riesgoMuyBajoAusenciaControl es nulo
					if (this.riesgoMuyBajoAusenciaControl === "") {
						this.mapaResidual.series[0]['data'][24] = {
							x: 4,
							y: 4,
							value: 0,
							name: "",
							description: "No existen riesgos para este cuadrante"
						};
					}
				}
			}
		this.mapaResidual.tooltip.formatter = function (this: any) {
			/*Return con todos los datos del riesgo
			return 'Cobertura: <b>' + getPointCategoryName(this.point, 'x') + '</b> <br>ID de los riesgos: <b>' +
			this.point.value + '</b><br> Con un riesgo residual: <b>' + getPointCategoryName(this.point, 'y') + '</b>'; */
			//Print this.point.name
			return 'ID de los riesgos: <b>' + this.point.name + '<br> ' + this.point.description + '</b>';
		}
		Highcharts.chart('container', this.mapaResidual);
	}
	buscarRiesgosSinMacros() {
		this.service.getRiesgoList().subscribe(data => {
			this.RiesgoList = data;
			for (let i = 0; i < this.RiesgoList.length; i++) {
				//Sino existen macros para la lista de riesgos
				if (this.RiesgoList[i].macroProceso != this._Activatedroute.snapshot.paramMap.get('macro')) {
					++this.contRiesgosSinMacro;
				}
			}
			if (this.contRiesgosSinMacro === this.RiesgoList.length) {
				console.log("Contador: " + this.contRiesgosSinMacro);
				console.log("No existen riesgos para el macro: " + this._Activatedroute.snapshot.paramMap.get('macro'));
			}
		});
	}


}

