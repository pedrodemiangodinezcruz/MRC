import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { SharedService } from 'src/app/shared.service';
import { ActivatedRoute } from '@angular/router';
import { Macroproceso } from 'src/app/body/pareto/macroproceso';

declare function getPointCategoryName(point: any, dimension: any): any;
declare function obtenerRiesgos(riesgosPorMacro: any): any;
declare var require: any;

let heatmap = require('highcharts/modules/heatmap');
let exporting = require('highcharts/modules/exporting');
let exportingData = require('highcharts/modules/export-data');
let accessibility = require('highcharts/modules/accessibility');


heatmap(Highcharts);
exporting(Highcharts);
exportingData(Highcharts);
accessibility(Highcharts);

@Component({
	selector: 'app-mapa-riesgo',
	templateUrl: './mapa-riesgo.component.html',
	styleUrls: ['./mapa-riesgo.component.css']
})
export class MapaRiesgoComponent implements OnInit {
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
			marginTop: 40,
			marginBottom: 80,
			plotBorderWidth: 1
		},


		title: {
			text: '<strong>MAPA DE CALOR - RIESGO INHERENTE</strong>'
		},

		xAxis: {
			categories: ['Marginal', 'Débil', 'Importante', 'Crítico', 'Catastrófico'],
			title: ['Impacto'],
		},

		yAxis: {
			categories: ['Muy Alta', 'Alta', 'Media', 'Baja', 'Muy Baja'],
			title: ['Probabilidad'],
			reversed: true
		},

		accessibility: {
			/*point: {
				descriptionFormatter: function (point: any, riesgosPorMacro: any) {
					var ix = point.index + 1,
						xName = getPointCategoryName(point, 'x'),
						yName = getPointCategoryName(point, 'y'),
						val = obtenerRiesgos(riesgosPorMacro);
					return ix + '. ' + xName + ' sales ' + yName + ', ' + val + '.';
				},
			riesgos:{
				obtenerRiesgosOptions: function (riesgosPorMacro: any) {
					var val = obtenerRiesgos(riesgosPorMacro);
					return + val + '.';
				}
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
					maxWidth: 500
				},
				chartOptions: {
					yAxis: {
						labels: {
							formatter: function (this: any) {
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
	RiesgoListPorMacro: any = [];
	riesgos: string = "";
	contRiesgosSinMacro: number = 0;
	riesgoMapaCalor: string = "";
	riesgoMuyAltoMarginal: string = "";
	riesgoMuyAltoDebil: string = "";
	riesgoMuyAltoImportante: string = "";
	riesgoMuyAltoCritico: string = "";
	riesgoMuyAltoCatastrofico: string = "";
	riesgoAltoMarginal: string = "";
	riesgoAltoDebil: string = "";
	riesgoAltoImportante: string = "";
	riesgoAltoCritico: string = "";
	riesgoAltoCatastrofico: string = "";
	riesgoMedioMarginal: string = "";
	riesgoMedioDebil: string = "";
	riesgoMedioImportante: string = "";
	riesgoMedioCritico: string = "";
	riesgoMedioCatastrofico: string = "";
	riesgoBajoMarginal: string = "";
	riesgoBajoDebil: string = "";
	riesgoBajoImportante: string = "";
	riesgoBajoCritico: string = "";
	riesgoBajoCatastrofico: string = "";
	riesgoMuyBajoMarginal: string = "";
	riesgoMuyBajoDebil: string = "";
	riesgoMuyBajoImportante: string = "";
	riesgoMuyBajoCritico: string = "";
	riesgoMuyBajoCatastrofico: string = "";

	ngOnInit() {
		this.refreshRiesgoList();
		this.buscarRiesgosSinMacros();
		this.obtenerRiesgoInherente();
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

		this.chartOptions.series[0]['data'] = [{ x: 0, y: 0, value: 75, name: "" }, { x: 0, y: 1, value: 50, name: "" }, { x: 0, y: 2, value: 25, name: "" }, { x: 0, y: 3, value: 25, name: "" },
		{ x: 0, y: 4, value: 0, name: "" }, { x: 1, y: 0, value: 75, name: "" }, { x: 1, y: 1, value: 75, name: "" }, { x: 1, y: 2, value: 50, name: "" }, { x: 1, y: 3, value: 25, name: "" },
		{ x: 1, y: 4, value: 25, name: "" }, { x: 2, y: 0, value: 100, name: "" }, { x: 2, y: 1, value: 75, name: "" }, { x: 2, y: 2, value: 50, name: "" }, { x: 2, y: 3, value: 50, name: "" },
		{ x: 2, y: 4, value: 50, name: "" }, { x: 3, y: 0, value: 100, name: "" }, { x: 3, y: 1, value: 100, name: "" }, { x: 3, y: 2, value: 100, name: "" }, { x: 3, y: 3, value: 75, name: "" },
		{ x: 3, y: 4, value: 75, name: "" }, { x: 4, y: 0, value: 100, name: "" }, { x: 4, y: 1, value: 100, name: "" }, { x: 4, y: 2, value: 100, name: "" }, { x: 4, y: 3, value: 100, name: "" },
		{ x: 4, y: 4, value: 75, name: "" }];

	}
	refreshRiesgoList() {
		this.service.getRiesgoList().subscribe(data => {
			this.RiesgoList = data;
			console.log("Lista de riesgos");
			console.log(this.RiesgoList);

		});
	}
	/*
	var val = {
								idRiesgo: this.RiesgoList[i].idRiesgo,
								nivelRiesgoInherente: this.RiesgoList[i].nivelRiesgo,
							};
							this.RiesgoListPorMacro.push(val);
							//console.log("Lista de riesgos inherentes por macro");
				//console.log(this.RiesgoListPorMacro);
	*/
	obtenerRiesgoInherente() {
		this.service.getRiesgoList().subscribe(data => {
			this.RiesgoList = data;
			for (let i = 0; i < this.RiesgoList.length; i++) {
				//Si existen riesgos asociados al macroproceso correspondiente
				if (this.RiesgoList[i].macroProceso === this._Activatedroute.snapshot.paramMap.get('macro')) {
					if (this.RiesgoList[i].probabilidad == 'Muy Alta' && this.RiesgoList[i].impacto == 'Marginal') {
						this.RiesgoList[i].nivelRiesgo = "A";
						this.riesgoMuyAltoMarginal = this.riesgoMuyAltoMarginal + " " + this.RiesgoList[i].idRiesgo;
						this.chartOptions.series[0]['data'][0] = {
							x: 0,
							y: 0,
							value: 75,
							name: this.riesgoMuyAltoMarginal,
							description: ""
						};
					}
					else if (this.RiesgoList[i].probabilidad == 'Muy Alta' && this.RiesgoList[i].impacto == 'Débil') {
						this.RiesgoList[i].nivelRiesgo = "A";
						this.riesgoMuyAltoDebil = this.riesgoMuyAltoDebil + " " + this.RiesgoList[i].idRiesgo;
						this.chartOptions.series[0]['data'][5] = {
							x: 1,
							y: 0,
							value: 75,
							name: this.riesgoMuyAltoDebil,
							description: ""
						};
					}
					else if (this.RiesgoList[i].probabilidad == 'Muy Alta' && (this.RiesgoList[i].impacto == 'Importante')) {
						this.RiesgoList[i].nivelRiesgo = "MA";
						this.riesgoMuyAltoImportante = this.riesgoMuyAltoImportante + " " + this.RiesgoList[i].idRiesgo;
						this.chartOptions.series[0]['data'][10] = {
							x: 2,
							y: 0,
							value: 100,
							name: this.riesgoMuyAltoImportante,
							description: ""
						};
					}
					else if (this.RiesgoList[i].probabilidad == 'Muy Alta' && (this.RiesgoList[i].impacto == 'Crítico')) {
						this.RiesgoList[i].nivelRiesgo = "MA";
						this.riesgoMuyAltoCritico = this.riesgoMuyAltoCritico + " " + this.RiesgoList[i].idRiesgo;
						this.chartOptions.series[0]['data'][15] = {
							x: 3,
							y: 0,
							value: 100,
							name: this.riesgoMuyAltoCritico,
							description: ""
						};
					}
					else if (this.RiesgoList[i].probabilidad == 'Muy Alta' && (this.RiesgoList[i].impacto == 'Catastrófico')) {
						this.RiesgoList[i].nivelRiesgo = "MA";
						this.riesgoMuyAltoCatastrofico = this.riesgoMuyAltoCatastrofico + " " + this.RiesgoList[i].idRiesgo;
						this.chartOptions.series[0]['data'][20] = {
							x: 4,
							y: 0,
							value: 100,
							name: this.riesgoMuyAltoCatastrofico,
							description: ""
						};
					}
					else if (this.RiesgoList[i].probabilidad == 'Alta' && (this.RiesgoList[i].impacto == 'Marginal')) {
						this.RiesgoList[i].nivelRiesgo = "M";
						console.log("Legue aquí");
						this.riesgoAltoMarginal = this.riesgoAltoMarginal + " " + this.RiesgoList[i].idRiesgo;
						this.chartOptions.series[0]['data'][1] = {
							x: 0,
							y: 1,
							value: 50,
							name: this.riesgoAltoMarginal,
							description: ""
						};
					}
					else if (this.RiesgoList[i].probabilidad == 'Alta' && (this.RiesgoList[i].impacto == 'Débil')) {
						this.RiesgoList[i].nivelRiesgo = "A";
						this.riesgoAltoDebil = this.riesgoAltoDebil + " " + this.RiesgoList[i].idRiesgo;
						this.chartOptions.series[0]['data'][6] = {
							x: 1,
							y: 1,
							value: 75,
							name: this.riesgoAltoDebil,
							description: ""
						};
					}
					else if (this.RiesgoList[i].probabilidad == 'Alta' && (this.RiesgoList[i].impacto == 'Importante')) {
						this.RiesgoList[i].nivelRiesgo = "A";
						this.riesgoAltoImportante = this.riesgoAltoImportante + " " + this.RiesgoList[i].idRiesgo;
						this.chartOptions.series[0]['data'][11] = {
							x: 2,
							y: 1,
							value: 75,
							name: this.riesgoAltoImportante,
							description: ""
						};
					}
					else if (this.RiesgoList[i].probabilidad == 'Alta' && (this.RiesgoList[i].impacto == 'Crítico')) {
						this.RiesgoList[i].nivelRiesgo = "MA";
						this.riesgoAltoCritico = this.riesgoAltoCritico + " " + this.RiesgoList[i].idRiesgo;
						this.chartOptions.series[0]['data'][16] = {
							x: 3,
							y: 1,
							value: 100,
							name: this.riesgoAltoCritico,
							description: ""
						};
					}
					else if (this.RiesgoList[i].probabilidad == 'Alta' && (this.RiesgoList[i].impacto == 'Catastrófico')) {
						this.RiesgoList[i].nivelRiesgo = "MA";
						this.riesgoAltoCatastrofico = this.riesgoAltoCatastrofico + " " + this.RiesgoList[i].idRiesgo;
						this.chartOptions.series[0]['data'][21] = {
							x: 4,
							y: 1,
							value: 100,
							name: this.riesgoAltoCatastrofico,
							description: ""
						};
					}
					else if (this.RiesgoList[i].probabilidad == 'Media' && (this.RiesgoList[i].impacto == 'Marginal')) {
						this.RiesgoList[i].nivelRiesgo = "B";
						this.riesgoMedioMarginal = this.riesgoMedioMarginal + " " + this.RiesgoList[i].idRiesgo;
						this.chartOptions.series[0]['data'][2] = {
							x: 0,
							y: 2,
							value: 25,
							name: this.riesgoMedioMarginal,
							description: ""
						};
					}
					else if (this.RiesgoList[i].probabilidad == 'Media' && (this.RiesgoList[i].impacto == 'Débil')) {
						this.RiesgoList[i].nivelRiesgo = "M";
						this.riesgoMedioDebil = this.riesgoMedioDebil + " " + this.RiesgoList[i].idRiesgo;
						this.chartOptions.series[0]['data'][7] = {
							x: 1,
							y: 2,
							value: 50,
							name: this.riesgoMedioDebil,
							description: ""
						};
					}
					else if (this.RiesgoList[i].probabilidad == 'Media' && (this.RiesgoList[i].impacto == 'Importante')) {
						this.RiesgoList[i].nivelRiesgo = "M";
						this.riesgoMedioImportante = this.riesgoMedioImportante + " " + this.RiesgoList[i].idRiesgo;
						this.chartOptions.series[0]['data'][12] = {
							x: 2,
							y: 2,
							value: 50,
							name: this.riesgoMedioImportante,
							description: ""
						};
					}
					else if (this.RiesgoList[i].probabilidad == 'Media' && (this.RiesgoList[i].impacto == 'Crítico')) {
						this.RiesgoList[i].nivelRiesgo = "MA";
						this.riesgoMedioCritico = this.riesgoMedioCritico + " " + this.RiesgoList[i].idRiesgo;
						this.chartOptions.series[0]['data'][17] = {
							x: 3,
							y: 2,
							value: 100,
							name: this.riesgoMedioCritico,
							description: ""
						};
					}
					else if (this.RiesgoList[i].probabilidad == 'Media' && (this.RiesgoList[i].impacto == 'Catastrófico')) {
						this.RiesgoList[i].nivelRiesgo = "MA";
						this.riesgoMedioCatastrofico = this.riesgoMedioCatastrofico + " " + this.RiesgoList[i].idRiesgo;
						this.chartOptions.series[0]['data'][22] = {
							x: 4,
							y: 2,
							value: 100,
							name: this.riesgoMedioCatastrofico,
							description: ""
						};
					}
					else if (this.RiesgoList[i].probabilidad == 'Baja' && (this.RiesgoList[i].impacto == 'Marginal')) {
						this.RiesgoList[i].nivelRiesgo = "B";
						this.riesgoBajoMarginal = this.riesgoBajoMarginal + " " + this.RiesgoList[i].idRiesgo;
						this.chartOptions.series[0]['data'][3] = {
							x: 0,
							y: 3,
							value: 25,
							name: this.riesgoBajoMarginal,
							description: ""
						};
					}
					else if (this.RiesgoList[i].probabilidad == 'Baja' && (this.RiesgoList[i].impacto == 'Débil')) {
						this.RiesgoList[i].nivelRiesgo = "B";
						this.riesgoBajoDebil = this.riesgoBajoDebil + " " + this.RiesgoList[i].idRiesgo;
						this.chartOptions.series[0]['data'][8] = {
							x: 1,
							y: 3,
							value: 25,
							name: this.riesgoBajoDebil,
							description: ""
						};
					}
					else if (this.RiesgoList[i].probabilidad == 'Baja' && (this.RiesgoList[i].impacto == 'Importante')) {
						this.RiesgoList[i].nivelRiesgo = "M";
						this.riesgoBajoImportante = this.riesgoBajoImportante + " " + this.RiesgoList[i].idRiesgo;
						this.chartOptions.series[0]['data'][13] = {
							x: 2,
							y: 3,
							value: 50,
							name: this.riesgoBajoImportante,
							description: ""
						};
					}
					else if (this.RiesgoList[i].probabilidad == 'Baja' && (this.RiesgoList[i].impacto == 'Crítico')) {
						this.RiesgoList[i].nivelRiesgo = "A";
						this.riesgoBajoCritico = this.riesgoBajoCritico + " " + this.RiesgoList[i].idRiesgo;
						this.chartOptions.series[0]['data'][18] = {
							x: 3,
							y: 3,
							value: 75,
							name: this.riesgoBajoCritico,
							description: ""
						};
					}
					else if (this.RiesgoList[i].probabilidad == 'Baja' && (this.RiesgoList[i].impacto == 'Catastrófico')) {
						this.RiesgoList[i].nivelRiesgo = "MA";
						this.riesgoBajoCatastrofico = this.riesgoBajoCatastrofico + " " + this.RiesgoList[i].idRiesgo;
						this.chartOptions.series[0]['data'][23] = {
							x: 4,
							y: 3,
							value: 100,
							name: this.riesgoBajoCatastrofico,
							description: ""
						};
					}
					else if (this.RiesgoList[i].probabilidad == 'Muy Baja' && (this.RiesgoList[i].impacto == 'Marginal')) {
						this.RiesgoList[i].nivelRiesgo = "MB";
						this.riesgoMuyBajoMarginal = this.riesgoMuyBajoMarginal + " " + this.RiesgoList[i].idRiesgo;
						this.chartOptions.series[0]['data'][4] = {
							x: 0,
							y: 4,
							value: 0,
							name: this.riesgoMuyBajoMarginal,
							description: ""
						};
					}
					else if (this.RiesgoList[i].probabilidad == 'Muy Baja' && (this.RiesgoList[i].impacto == 'Débil')) {
						this.RiesgoList[i].nivelRiesgo = "B";
						this.riesgoMuyBajoDebil = this.riesgoMuyBajoDebil + " " + this.RiesgoList[i].idRiesgo;
						this.chartOptions.series[0]['data'][9] = {
							x: 1,
							y: 4,
							value: 25,
							name: this.riesgoMuyBajoDebil,
							description: ""
						};
					}
					else if (this.RiesgoList[i].probabilidad == 'Muy Baja' && (this.RiesgoList[i].impacto == 'Importante')) {
						this.RiesgoList[i].nivelRiesgo = "M";
						this.riesgoMuyBajoImportante = this.riesgoMuyBajoImportante + " " + this.RiesgoList[i].idRiesgo;
						this.chartOptions.series[0]['data'][14] = {
							x: 2,
							y: 4,
							value: 50,
							name: this.riesgoMuyBajoImportante,
							description:this.RiesgoList[i].nivelRiesgo
						};
					}
					else if (this.RiesgoList[i].probabilidad == 'Muy Baja' && (this.RiesgoList[i].impacto == 'Crítico')) {
						this.RiesgoList[i].nivelRiesgo = "A";
						this.riesgoMuyBajoCritico = this.riesgoMuyBajoCritico + " " + this.RiesgoList[i].idRiesgo;
						this.chartOptions.series[0]['data'][19] = {
							x: 3,
							y: 4,
							value: 75,
							name: this.riesgoMuyBajoCritico,
							description: ""
						};
					}
					else if (this.RiesgoList[i].probabilidad == 'Muy Baja' && (this.RiesgoList[i].impacto == 'Catastrófico')) {
						this.RiesgoList[i].nivelRiesgo = "A";
						this.riesgoMuyBajoCatastrofico = this.riesgoMuyBajoCatastrofico + " " + this.RiesgoList[i].idRiesgo;
						this.chartOptions.series[0]['data'][24] = {
							x: 4,
							y: 4,
							value: 75,
							name: this.riesgoMuyBajoCatastrofico,
							description: ""
						};
					}
					if(this.riesgoMuyAltoMarginal == ""){
						this.chartOptions.series[0]['data'][0] = {
							x: 0,
							y: 0,
							value: 75,
							name: " ",
							description: "No existen riesgos para este cuadrante"
						};
					}
					if(this.riesgoMuyAltoDebil == ""){
						this.chartOptions.series[0]['data'][5] = {
							x: 1,
							y: 0,
							value: 75,
							name: " ",
							description: "No existen riesgos para este cuadrante"
						};
					}
					if(this.riesgoMuyAltoImportante == ""){
						this.chartOptions.series[0]['data'][10] = {
							x: 2,
							y: 0,
							value: 100,
							name: " ",
							description: "No existen riesgos para este cuadrante"
						};
					}
					if(this.riesgoMuyAltoCritico == ""){
						this.chartOptions.series[0]['data'][15] = {
							x: 3,
							y: 0,
							value: 100,
							name: " ",
							description: "No existen riesgos para este cuadrante"
						};
					}
					if(this.riesgoMuyAltoCatastrofico == ""){
						this.chartOptions.series[0]['data'][20] = {
							x: 4,
							y: 0,
							value: 100,
							name: " ",
							description: "No existen riesgos para este cuadrante"
						};
					}
					if(this.riesgoAltoMarginal == ""){
						this.chartOptions.series[0]['data'][1] = {
							x: 0,
							y: 1,
							value: 50,
							name: " ",
							description: "No existen riesgos para este cuadrante"
						};
					}
					if(this.riesgoAltoDebil == ""){
						this.chartOptions.series[0]['data'][6] = {
							x: 1,
							y: 1,
							value: 75,
							name: " ",
							description: "No existen riesgos para este cuadrante"
						};
					}
					if(this.riesgoAltoImportante == ""){
						this.chartOptions.series[0]['data'][11] = {
							x: 2,
							y: 1,
							value: 75,
							name: " ",
							description: "No existen riesgos para este cuadrante"
						};
					}
					if(this.riesgoAltoCritico == ""){
						this.chartOptions.series[0]['data'][16] = {
							x: 3,
							y: 1,
							value: 100,
							name: " ",
							description: "No existen riesgos para este cuadrante"
						};
					}
					if(this.riesgoAltoCatastrofico == ""){
						this.chartOptions.series[0]['data'][21] = {
							x: 4,
							y: 1,
							value: 100,
							name: " ",
							description: "No existen riesgos para este cuadrante"
						};
					}
					if(this.riesgoMedioMarginal == ""){
						this.chartOptions.series[0]['data'][2] = {
							x: 0,
							y: 2,
							value: 25,
							name: " ",
							description: "No existen riesgos para este cuadrante"
						}
					}
					if(this.riesgoMedioDebil == ""){
						this.chartOptions.series[0]['data'][7] = {
							x: 1,
							y: 2,
							value: 50,
							name: " ",
							description: "No existen riesgos para este cuadrante"
						};
					}
					if(this.riesgoMedioImportante == ""){
						this.chartOptions.series[0]['data'][12] = {
							x: 2,
							y: 2,
							value: 50,
							name: " ",
							description: "No existen riesgos para este cuadrante"
						};
					}
					if(this.riesgoMedioCritico == ""){
						this.chartOptions.series[0]['data'][17] = {
							x: 3,
							y: 2,
							value: 100,
							name: " ",
							description: "No existen riesgos para este cuadrante"
						};
					}
					if(this.riesgoMedioCatastrofico == ""){
						this.chartOptions.series[0]['data'][22] = {
							x: 4,
							y: 2,
							value: 100,
							name: " ",
							description: "No existen riesgos para este cuadrante"
						};
					}
					if(this.riesgoBajoMarginal == ""){
						this.chartOptions.series[0]['data'][3] = {
							x: 0,
							y: 3,
							value: 25,
							name: " ",
							description: "No existen riesgos para este cuadrante"
						};
					}
					if(this.riesgoBajoDebil == ""){
						this.chartOptions.series[0]['data'][8] = {
							x: 1,
							y: 3,
							value: 25,
							name: " ",
							description: "No existen riesgos para este cuadrante"
						};
					}
					if(this.riesgoBajoImportante == ""){
						this.chartOptions.series[0]['data'][13] = {
							x: 2,
							y: 3,
							value: 50,
							name: " ",
							description: "No existen riesgos para este cuadrante"
						};
					}
					if(this.riesgoBajoCritico == ""){
						this.chartOptions.series[0]['data'][18] = {
							x: 3,
							y: 3,
							value: 75,
							name: " ",
							description: "No existen riesgos para este cuadrante"
						};
					}
					if(this.riesgoBajoCatastrofico == ""){
						this.chartOptions.series[0]['data'][23] = {
							x: 4,
							y: 3,
							value: 100,
							name: " ",
							description: "No existen riesgos para este cuadrante"
						};
					}
					if(this.riesgoMuyBajoMarginal == ""){
						this.chartOptions.series[0]['data'][4] = {
							x: 0,
							y: 4,
							value: 0,
							name: " ",
							description: "No existen riesgos para este cuadrante"
						};
					}
					if(this.riesgoMuyBajoDebil == ""){
						this.chartOptions.series[0]['data'][9] = {
							x: 1,
							y: 4,
							value: 25,
							name: " ",
							description: "No existen riesgos para este cuadrante"
						};
					}
					if (this.riesgoMuyBajoImportante == "") {
						this.chartOptions.series[0]['data'][14] = {
							x: 2,
							y: 4,
							value: 50,
							name: " ",
							description: "No existen riesgos para este cuadrante"
						};
					}
					if (this.riesgoMuyBajoCritico == "") {
						this.chartOptions.series[0]['data'][19] = {
							x: 3,
							y: 4,
							value: 75,
							name: " ",
							description: "No existen riesgos para este cuadrante"
						};
					}
					if (this.riesgoMuyBajoCatastrofico == "") {
						this.chartOptions.series[0]['data'][24] = {
							x: 4,
							y: 4,
							value: 75,
							name: " ",
							description: "No existen riesgos para este cuadrante"
						};
					}
				}
			}
			this.chartOptions.tooltip.formatter = function (this: any) {
				//return 'ID de los riesgos: <b>' + this.point.name + '</b><br>Impacto: <b>' + getPointCategoryName(this.point, 'x') + '</b> <br>Valor: <b>' +
				//this.point.value + '</b><br> Probabilidad: <b>' + getPointCategoryName(this.point, 'y') + '</b>' + '</b><br> Riesgo Inherente: <b>' + this.point.description + '</b>';
				return 'ID de los riesgos: <b>' + this.point.name + '' + this.point.description + '</b>';
			}
			Highcharts.chart('container', this.chartOptions);
		});
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
