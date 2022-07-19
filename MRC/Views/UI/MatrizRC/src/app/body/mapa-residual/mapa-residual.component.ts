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

	public chartOptions: any = {
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
			title: ['COBERTURA DEL CONJUNTO DE CONTROLES'],
			
		},

		yAxis: {
			categories: ['MA', 'A', 'M', 'B', 'MB'],
			title: ['RIESGO RESIDUAL'],
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
					width : '70px',
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
					maxWidth: 800
				},
				chartOptions: {
					yAxis: {
						labels: {
							formatter: function format(this: any){
								return this.value.charAt(0);
							}
						}
					}
				}
			}]
		}

	};


	constructor(private service: SharedService, public _Activatedroute:ActivatedRoute) { }
	RiesgoList: any = [];
	ControlList: any = [];
	CausaList: any = [];
	valorDiseñoDeControl: number = 0;
	valorCalificacionControl: number = 0;
	coberturaTotalControles: number = 0;
	contRiesgosSinMacro: number = 0;
	riesgoM: string = "";

	ngOnInit() {
		this.refreshRiesgoList();
		this.refreshControlList();
		this.refreshCausaList();
		this.calculosControles();
		this.buscarRiesgosSinMacro();
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
		
		this.chartOptions.series[0]['data'] = [{ x: 0, y: 0, value: 0, name: "" }, { x: 0, y: 1, value: 0, name: "" }, { x: 0, y: 2, value: 0, name: "" }, { x: 0, y: 3, value: 0, name: "" },
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
			console.log("Lista de controles");
			console.log(this.ControlList);
		});
	}
	refreshCausaList() {
		this.service.getCausasList().subscribe(datos => {
			this.CausaList = datos;
			console.log("Lista de causas");
			console.log(this.CausaList);
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
		for (let i = 0; i < this.RiesgoList.length; ++i) {
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
		console.log("Lista de riesgos");
		console.log(RiesgoList);
	}
	
	calculosControles() {
		this.calcularDiseñoControl();
	}
	calcularDiseñoControl() {
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
			this.calcularEstrategiaMonitoreo(this.ControlList);
		});
	}
	calcularEstrategiaMonitoreo(ControlList: any) {
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
		this.calcularCalificacionControl(ControlList);
		//console.log("Lista de controles despues de calcular estrategia de monitoreo: ");
		//console.log(ControlList);
	}

	calcularCalificacionControl(ControlList: any) {
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
		this.calcularCoberturaPonderadaPorControl(ControlList);
		//console.log("Lista de controles despues de calcular la calificación del control: ");
		//console.log(ControlList);

	}
	calcularCoberturaPonderadaPorControl(ControlList: any) {
		for (let i = 0; i < ControlList.length; ++i) {
			if (ControlList[i].evaluacionFuncionalidad == 'No efectivo') {
				ControlList[i].coberturaPonderada = (Math.ceil((ControlList[i].calificacionControl * ControlList[i].cobertura * 0.5) / 100));
			}
			else {
				ControlList[i].coberturaPonderada = (Math.ceil((ControlList[i].calificacionControl * ControlList[i].cobertura) / 100));
			}
		}
		//console.log("Lista de controles despues de calcular coberturaPonderada: ");
		//console.log(ControlList);
		this.calcularCoberturaTotalControles(ControlList);
	}
	calcularCoberturaTotalControles(ControlList: any, ) {
		//Recorrer todas las listas, para encontrar todos los controles asociados que aparezcan en la matriz
		for (let i = 0; i < this.RiesgoList.length; ++i) {
			for (let k = 0; k < this.CausaList.length; ++k) {
				for (let j = 0; j < ControlList.length; ++j) {
					//Si los ID´s del riesgo, causa y control inherentes como asociados son iguales, entonces se suma la cobertura ponderada
					//de los controles adjuntos a la variable "coberturaTotalControles"
					if ((this.RiesgoList[i].idRiesgo === this.CausaList[k].idRiesgoAsociado || this.RiesgoList[i].idRiesgo === this.CausaList[k].idRiesgoAsociado2
						|| this.RiesgoList[i].idRiesgo === this.CausaList[k].idRiesgoAsociado3 || this.RiesgoList[i].idRiesgo === this.CausaList[k].idRiesgoAsociado4
						|| this.RiesgoList[i].idRiesgo === this.CausaList[k].idRiesgoAsociado5 || this.RiesgoList[i].idRiesgo === this.CausaList[k].idRiesgoAsociado6
						|| this.RiesgoList[i].idRiesgo === this.CausaList[k].idRiesgoAsociado7 || this.RiesgoList[i].idRiesgo === this.CausaList[k].idRiesgoAsociado8
						|| this.RiesgoList[i].idRiesgo === this.CausaList[k].idRiesgoAsociado9 || this.RiesgoList[i].idRiesgo === this.CausaList[k].idRiesgoAsociado10)
						&& (this.RiesgoList[i].idRiesgo === ControlList[j].idRiesgoAsociado || this.RiesgoList[i].idRiesgo === ControlList[j].idRiesgoAsociado2
							|| this.RiesgoList[i].idRiesgo === ControlList[j].idRiesgoAsociado3 || this.RiesgoList[i].idRiesgo === ControlList[j].idRiesgoAsociado4
							|| this.RiesgoList[i].idRiesgo === ControlList[j].idRiesgoAsociado5 || this.RiesgoList[i].idRiesgo === ControlList[j].idRiesgoAsociado6
							|| this.RiesgoList[i].idRiesgo === ControlList[j].idRiesgoAsociado7 || this.RiesgoList[i].idRiesgo === ControlList[j].idRiesgoAsociado8
							|| this.RiesgoList[i].idRiesgo === ControlList[j].idRiesgoAsociado9 || this.RiesgoList[i].idRiesgo === ControlList[j].idRiesgoAsociado10)
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
							if (this.RiesgoList[i].idRiesgo === ControlList[l].idRiesgoAsociado || this.RiesgoList[i].idRiesgo === ControlList[l].idRiesgoAsociado2
								|| this.RiesgoList[i].idRiesgo === ControlList[l].idRiesgoAsociado3 || this.RiesgoList[i].idRiesgo === ControlList[l].idRiesgoAsociado4
								|| this.RiesgoList[i].idRiesgo === ControlList[l].idRiesgoAsociado5 || this.RiesgoList[i].idRiesgo === ControlList[l].idRiesgoAsociado6
								|| this.RiesgoList[i].idRiesgo === ControlList[l].idRiesgoAsociado7 || this.RiesgoList[i].idRiesgo === ControlList[l].idRiesgoAsociado8
								|| this.RiesgoList[i].idRiesgo === ControlList[l].idRiesgoAsociado9 || this.RiesgoList[i].idRiesgo === ControlList[l].idRiesgoAsociado10) {
								ControlList[l].coberturaTotal = this.coberturaTotalControles;
							}
						}
					}
				}
			}
			//Resetar la variable "coberturaTotalControles" para que no se sumen todas las coberturas ponderadas de los controles
			this.coberturaTotalControles = 0;
		}
		this.calcularNivelCobertura(ControlList);
	}

	calcularNivelCobertura(ControlList: any) {
		//Recorrer losta de los controles
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
		this.calcularGravedadRiesgoResidual(ControlList);
		console.log("Legue aqui: ");
		console.log(ControlList);
	}
	
	calcularGravedadRiesgoResidual(ControlList: any) {
		//Recorrer lista de los controles
		//Recorrer lista de los riesgos
		for (let i = 0; i < this.RiesgoList.length; ++i) {
			for (let j = 0; j < ControlList.length; ++j) {
				//Si el id del riesgo es igual al id del riesgo asociado, luego comparar si el nivelRiesgo es alto
				if (this.RiesgoList[i].idRiesgo === ControlList[j].idRiesgoAsociado || this.RiesgoList[i].idRiesgo === ControlList[j].idRiesgoAsociado2
					|| this.RiesgoList[i].idRiesgo === ControlList[j].idRiesgoAsociado3 || this.RiesgoList[i].idRiesgo === ControlList[j].idRiesgoAsociado4
					|| this.RiesgoList[i].idRiesgo === ControlList[j].idRiesgoAsociado5 || this.RiesgoList[i].idRiesgo === ControlList[j].idRiesgoAsociado6
					|| this.RiesgoList[i].idRiesgo === ControlList[j].idRiesgoAsociado7 || this.RiesgoList[i].idRiesgo === ControlList[j].idRiesgoAsociado8
					|| this.RiesgoList[i].idRiesgo === ControlList[j].idRiesgoAsociado9 || this.RiesgoList[i].idRiesgo === ControlList[j].idRiesgoAsociado10) {
					//Si el nivel de riesgo inherente es "MA"
					if (this.RiesgoList[i].nivelRiesgo === "MA") {
						//Switch con los casos para el nivel de riesgo inherente "MA"
						switch (ControlList[j].nivelCobertura) {
							case "Total":
								this.RiesgoList[i].gravedadRiesgoResidual = "MB";
								this.chartOptions.series[0]['data'][0] = {
									x: 0,
									y: 0,
									value: 75,
									name: "Wow",
									description: ""
								};
								break;
							case "Alto":
								this.RiesgoList[i].gravedadRiesgoResidual = "M";
								break;
							case "Medio":
								this.RiesgoList[i].gravedadRiesgoResidual = "A";
								break;
							case "Bajo":
								this.RiesgoList[i].gravedadRiesgoResidual = "MA";
								break;
							case "Ausencia de control":
								this.RiesgoList[i].gravedadRiesgoResidual = "MA";
						}
					}
					//Si el nivel de riesgo inherente es "A"
					else if (this.RiesgoList[i].nivelRiesgo === "A") {
						//Switch con los casos para el nivel de riesgo inherente "A"
						switch (ControlList[j].nivelCobertura) {
							case "Total":
								this.RiesgoList[i].gravedadRiesgoResidual = "MB";
								break;
							case "Alto":
								this.RiesgoList[i].gravedadRiesgoResidual = "B";
								break;
							case "Medio":
								this.RiesgoList[i].gravedadRiesgoResidual = "M";
								break;
							case "Bajo":
								this.RiesgoList[i].gravedadRiesgoResidual = "A";
								break;
							case "Ausencia de control":
								this.RiesgoList[i].gravedadRiesgoResidual = "A";
						}
					}
					//Si el nivel de riesgo inherente es "M"
					else if (this.RiesgoList[i].nivelRiesgo === "M") {
						//Switch con los casos para el nivel de riesgo inherente "M"
						switch (ControlList[j].nivelCobertura) {
							case "Total":
								this.RiesgoList[i].gravedadRiesgoResidual = "MB";
								break;
							case "Alto":
								this.RiesgoList[i].gravedadRiesgoResidual = "MB";
								break;
							case "Medio":
								this.RiesgoList[i].gravedadRiesgoResidual = "B";
								break;
							case "Bajo":
								this.RiesgoList[i].gravedadRiesgoResidual = "M";
								break;
							case "Ausencia de control":
								this.RiesgoList[i].gravedadRiesgoResidual = "M";
						}
					}
					//Si el nivel de riesgo inherente es "B"
					else if (this.RiesgoList[i].nivelRiesgo === "B") {
					//Switch con los casos para el nivel de riesgo inherente "B"
					switch (ControlList[j].nivelCobertura) {
						case "Total":
							this.RiesgoList[i].gravedadRiesgoResidual = "MB";
							break;
						case "Alto":
							this.RiesgoList[i].gravedadRiesgoResidual = "MB";
							break;
						case "Medio":
							this.RiesgoList[i].gravedadRiesgoResidual = "MB";
							break;
						case "Bajo":
							this.RiesgoList[i].gravedadRiesgoResidual = "B";
							break;
						case "Ausencia de control":
							this.RiesgoList[i].gravedadRiesgoResidual = "B";
					}
				}
				//Si el nivel de riesgo inherente es "MB"
				else if (this.RiesgoList[i].nivelRiesgo === "MB") {
					//Switch con los casos para el nivel de riesgo inherente "MA"
					switch (ControlList[j].nivelCobertura) {
						case "Total":
							this.RiesgoList[i].gravedadRiesgoResidual = "MB";
							break;
						case "Alto":
							this.RiesgoList[i].gravedadRiesgoResidual = "MB";
							break;
						case "Medio":
							this.RiesgoList[i].gravedadRiesgoResidual = "MB";
							break;
						case "Bajo":
							this.RiesgoList[i].gravedadRiesgoResidual = "MB";
							break;
						case "Ausencia de control":
							this.RiesgoList[i].gravedadRiesgoResidual = "MB";
					}
				}
				}
			}
		}
		this.chartOptions.tooltip.formatter =  function (this: any) {
			/*Return con todos los datos del riesgo
			return 'Cobertura: <b>' + getPointCategoryName(this.point, 'x') + '</b> <br>ID de los riesgos: <b>' +
			this.point.value + '</b><br> Con un riesgo residual: <b>' + getPointCategoryName(this.point, 'y') + '</b>'; */
			return 'ID de los riesgos: <b>' + this.point.name
		}
		Highcharts.chart('container', this.chartOptions);
	}

	buscarRiesgosSinMacro() {
		this.service.getRiesgoList().subscribe(data => {
			this.RiesgoList = data;
			for (let i = 0; i < this.RiesgoList.length; i++) {
					//Sino existen macros para la lista de riesgos
				if (this.RiesgoList[i].macroProceso != this._Activatedroute.snapshot.paramMap.get('macro')){
					++this.contRiesgosSinMacro;
				}
			}
			if(this.contRiesgosSinMacro === this.RiesgoList.length){
			console.log("Contador: " + this.contRiesgosSinMacro);
			console.log("No existen riesgos para el macro: " + this._Activatedroute.snapshot.paramMap.get('macro'));
			}
		});
	}
}

