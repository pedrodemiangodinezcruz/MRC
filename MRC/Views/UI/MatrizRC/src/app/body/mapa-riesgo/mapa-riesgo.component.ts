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
			name: 'Riesgo Inherente',
			borderWidth: 1,
			data: [],
			dataLabels: {
				enabled: false,
				color: '#000000'
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

	ngOnInit() {
		this.refreshRiesgoList();
		this.buscarRiesgosSinMacros();
		//this.calcularNivelRiesgoInherente();
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
		this.chartOptions.tooltip.formatter = function (this: any) {
			//return 'ID de los riesgos: <b>' + obtenerRiesgos(this.riesgosPorMacro) + '</b>';
			return 'ID de los riesgos: <b>' + this.point.name + '</b><br>Impacto: <b>' + getPointCategoryName(this.point, 'x') + '</b> <br>Valor: <b>' +
				this.point.value + '</b><br> Con nivel de probabilidad: <b>' + getPointCategoryName(this.point, 'y') + '</b>';
		}
		this.chartOptions.series[0]['data'] = [[0, 0, 75], [0, 1, 50], [0, 2, 25], [0, 3, 25], [0, 4, 0], [1, 0, 75], [1, 1, 75], [1, 2, 50], [1, 3, 25], [1, 4, 25], [2, 0, 100], [2, 1, 75], [2, 2, 50], [2, 3, 50], [2, 4, 50], [3, 0, 100], [3, 1, 100], [3, 2, 100], [3, 3, 75], [3, 4, 75], [4, 0, 100], [4, 1, 100], [4, 2, 100], [4, 3, 100], [4, 4, 75]];

		Highcharts.chart('container', this.chartOptions);

	}
	refreshRiesgoList() {
		this.service.getRiesgoList().subscribe(data => {
			this.RiesgoList = data;
			console.log("Lista de riesgos");
			console.log(this.RiesgoList);

		});
	}
	/*calcularNivelRiesgoInherente() {
		for (let i = 0; i < this.RiesgoList.length; ++i) {
			if (this.RiesgoList[i].probabilidad == 'Muy Alta' && (this.RiesgoList[i].impacto == 'Marginal' || this.RiesgoList[i].impacto == 'Débil')) {
				this.RiesgoList[i].nivelRiesgo = "A";
			}
			else if (this.RiesgoList[i].probabilidad == 'Muy Alta' && (this.RiesgoList[i].impacto == 'Importante' || this.RiesgoList[i].impacto == 'Crítico' || this.RiesgoList[i].impacto == 'Catastrófico')) {
				this.RiesgoList[i].nivelRiesgo = "MA";
			}
			else if (this.RiesgoList[i].probabilidad == 'Alta' && (this.RiesgoList[i].impacto == 'Marginal')) {
				this.RiesgoList[i].nivelRiesgo = "M";
			}
			else if (this.RiesgoList[i].probabilidad == 'Alta' && (this.RiesgoList[i].impacto == 'Débil' || this.RiesgoList[i].impacto == 'Importante')) {
				this.RiesgoList[i].nivelRiesgo = "A";
			}
			else if (this.RiesgoList[i].probabilidad == 'Alta' && (this.RiesgoList[i].impacto == 'Crítico' || this.RiesgoList[i].impacto == 'Catastrófico')) {
				this.RiesgoList[i].nivelRiesgo = "MA";
			}
			else if (this.RiesgoList[i].probabilidad == 'Media' && (this.RiesgoList[i].impacto == 'Marginal')) {
				this.RiesgoList[i].nivelRiesgo = "B";
			}
			else if (this.RiesgoList[i].probabilidad == 'Media' && (this.RiesgoList[i].impacto == 'Débil' || this.RiesgoList[i].impacto == 'Importante')) {
				this.RiesgoList[i].nivelRiesgo = "M";
			}
			else if (this.RiesgoList[i].probabilidad == 'Media' && (this.RiesgoList[i].impacto == 'Crítico' || this.RiesgoList[i].impacto == 'Catastrófico')) {
				this.RiesgoList[i].nivelRiesgo = "MA";
			}
			else if (this.RiesgoList[i].probabilidad == 'Baja' && (this.RiesgoList[i].impacto == 'Marginal' || this.RiesgoList[i].impacto == 'Débil')) {
				this.RiesgoList[i].nivelRiesgo = "B";
			}
			else if (this.RiesgoList[i].probabilidad == 'Baja' && (this.RiesgoList[i].impacto == 'Importante')) {
				this.RiesgoList[i].nivelRiesgo = "M";
			}
			else if (this.RiesgoList[i].probabilidad == 'Baja' && (this.RiesgoList[i].impacto == 'Crítico')) {
				this.RiesgoList[i].nivelRiesgo = "A";
			}
			else if (this.RiesgoList[i].probabilidad == 'Baja' && (this.RiesgoList[i].impacto == 'Catastrófico')) {
				this.RiesgoList[i].nivelRiesgo = "MA";
			}
			else if (this.RiesgoList[i].probabilidad == 'Muy Baja' && (this.RiesgoList[i].impacto == 'Marginal')) {
				this.RiesgoList[i].nivelRiesgo = "MB";
			}
			else if (this.RiesgoList[i].probabilidad == 'Muy Baja' && (this.RiesgoList[i].impacto == 'Débil')) {
				this.RiesgoList[i].nivelRiesgo = "B";
			}
			else if (this.RiesgoList[i].probabilidad == 'Muy Baja' && (this.RiesgoList[i].impacto == 'Importante')) {
				this.RiesgoList[i].nivelRiesgo = "M";
			}
			else if (this.RiesgoList[i].probabilidad == 'Muy Baja' && (this.RiesgoList[i].impacto == 'Crítico' || this.RiesgoList[i].impacto == 'Catastrófico')) {
				this.RiesgoList[i].nivelRiesgo = "A";
			}

		}
		this.obtenerRiesgoInherente(this.RiesgoList);
	}*/
	/*{
					x: 0,
					y: 0,
					value: 75,
					name: "",
				} */

	/*
	series: [{
				name: 'Riesgo Inherente',
				borderWidth: 1,
				data: [[0,0,75], [0, 1, 50], [0, 2, 25], [0, 3, 25], [0, 4, 0], [1, 0, 75], [1, 1, 75], [1, 2, 50], [1, 3, 25], [1, 4, 25], [2, 0, 100], [2, 1, 75], [2, 2, 50], [2, 3, 50], [2, 4, 50], [3, 0, 100], [3, 1, 100], [3, 2, 100], [3, 3, 75], [3, 4, 75], [4, 0, 100], [4, 1, 100], [4, 2, 100], [4, 3, 100], [4, 4, 75]],
				dataLabels: {
					enabled: false,
					color: '#000000'
				}
			}],
	*/

	obtenerRiesgoInherente() {
		this.service.getRiesgoList().subscribe(data => {
			this.RiesgoList = data;
			for (let i = 0; i < this.RiesgoList.length; i++) {
				//Si existen riesgos asociados al macroproceso correspondiente
				if (this.RiesgoList[i].macroProceso === this._Activatedroute.snapshot.paramMap.get('macro')) {
					if (this.RiesgoList[i].probabilidad == 'Muy Alta' && (this.RiesgoList[i].impacto == 'Marginal' || this.RiesgoList[i].impacto == 'Débil')) {
						this.RiesgoList[i].nivelRiesgo = "A";
						var val = {
							idRiesgo: this.RiesgoList[i].idRiesgo,
							nivelRiesgoInherente: this.RiesgoList[i].nivelRiesgo,
						};
						this.RiesgoListPorMacro.push(val);
						//this.chartOptions.series['data'] = [0, 0, 75], [0, 1, 50], [0, 2, 25], [0, 3, 25], [0, 4, 0], [1, 0, 75], [1, 1, 75], [1, 2, 50], [1, 3, 25], [1, 4, 25], [2, 0, 100], [2, 1, 75], [2, 2, 50], [2, 3, 50], [2, 4, 50], [3, 0, 100], [3, 1, 100], [3, 2, 100], [3, 3, 75], [3, 4, 75], [4, 0, 100], [4, 1, 100], [4, 2, 100], [4, 3, 100], [4, 4, 75];
					}
					else if (this.RiesgoList[i].probabilidad == 'Muy Alta' && (this.RiesgoList[i].impacto == 'Importante' || this.RiesgoList[i].impacto == 'Crítico' || this.RiesgoList[i].impacto == 'Catastrófico')) {
						this.RiesgoList[i].nivelRiesgo = "MA";
						var val = {
							idRiesgo: this.RiesgoList[i].idRiesgo,
							nivelRiesgoInherente: this.RiesgoList[i].nivelRiesgo,
						};
						this.RiesgoListPorMacro.push(val);
					}
					else if (this.RiesgoList[i].probabilidad == 'Alta' && (this.RiesgoList[i].impacto == 'Marginal')) {
						this.RiesgoList[i].nivelRiesgo = "M";
						var val = {
							idRiesgo: this.RiesgoList[i].idRiesgo,
							nivelRiesgoInherente: this.RiesgoList[i].nivelRiesgo,
						};
						this.RiesgoListPorMacro.push(val);
					}
					else if (this.RiesgoList[i].probabilidad == 'Alta' && (this.RiesgoList[i].impacto == 'Débil' || this.RiesgoList[i].impacto == 'Importante')) {
						this.RiesgoList[i].nivelRiesgo = "A";
						var val = {
							idRiesgo: this.RiesgoList[i].idRiesgo,
							nivelRiesgoInherente: this.RiesgoList[i].nivelRiesgo,
						};
						this.RiesgoListPorMacro.push(val);
					}
					else if (this.RiesgoList[i].probabilidad == 'Alta' && (this.RiesgoList[i].impacto == 'Crítico' || this.RiesgoList[i].impacto == 'Catastrófico')) {
						this.RiesgoList[i].nivelRiesgo = "MA";
						var val = {
							idRiesgo: this.RiesgoList[i].idRiesgo,
							nivelRiesgoInherente: this.RiesgoList[i].nivelRiesgo,
						};
						this.RiesgoListPorMacro.push(val);
					}
					else if (this.RiesgoList[i].probabilidad == 'Media' && (this.RiesgoList[i].impacto == 'Marginal')) {
						this.RiesgoList[i].nivelRiesgo = "B";
						var val = {
							idRiesgo: this.RiesgoList[i].idRiesgo,
							nivelRiesgoInherente: this.RiesgoList[i].nivelRiesgo,
						};
						this.RiesgoListPorMacro.push(val);
					}
					else if (this.RiesgoList[i].probabilidad == 'Media' && (this.RiesgoList[i].impacto == 'Débil' || this.RiesgoList[i].impacto == 'Importante')) {
						this.RiesgoList[i].nivelRiesgo = "M";
						var val = {
							idRiesgo: this.RiesgoList[i].idRiesgo,
							nivelRiesgoInherente: this.RiesgoList[i].nivelRiesgo,
						};
						this.RiesgoListPorMacro.push(val);
					}
					else if (this.RiesgoList[i].probabilidad == 'Media' && (this.RiesgoList[i].impacto == 'Crítico' || this.RiesgoList[i].impacto == 'Catastrófico')) {
						this.RiesgoList[i].nivelRiesgo = "MA";
						var val = {
							idRiesgo: this.RiesgoList[i].idRiesgo,
							nivelRiesgoInherente: this.RiesgoList[i].nivelRiesgo,
						};
						this.RiesgoListPorMacro.push(val);
					}
					else if (this.RiesgoList[i].probabilidad == 'Baja' && (this.RiesgoList[i].impacto == 'Marginal' || this.RiesgoList[i].impacto == 'Débil')) {
						this.RiesgoList[i].nivelRiesgo = "B";
						var val = {
							idRiesgo: this.RiesgoList[i].idRiesgo,
							nivelRiesgoInherente: this.RiesgoList[i].nivelRiesgo,
						};
						this.RiesgoListPorMacro.push(val);
					}
					else if (this.RiesgoList[i].probabilidad == 'Baja' && (this.RiesgoList[i].impacto == 'Importante')) {
						this.RiesgoList[i].nivelRiesgo = "M";
						var val = {
							idRiesgo: this.RiesgoList[i].idRiesgo,
							nivelRiesgoInherente: this.RiesgoList[i].nivelRiesgo,
						};
						this.RiesgoListPorMacro.push(val);
					}
					else if (this.RiesgoList[i].probabilidad == 'Baja' && (this.RiesgoList[i].impacto == 'Crítico')) {
						this.RiesgoList[i].nivelRiesgo = "A";
						var val = {
							idRiesgo: this.RiesgoList[i].idRiesgo,
							nivelRiesgoInherente: this.RiesgoList[i].nivelRiesgo,
						};
						this.RiesgoListPorMacro.push(val);
					}
					else if (this.RiesgoList[i].probabilidad == 'Baja' && (this.RiesgoList[i].impacto == 'Catastrófico')) {
						this.RiesgoList[i].nivelRiesgo = "MA";
						var val = {
							idRiesgo: this.RiesgoList[i].idRiesgo,
							nivelRiesgoInherente: this.RiesgoList[i].nivelRiesgo,
						};
						this.RiesgoListPorMacro.push(val);
					}
					else if (this.RiesgoList[i].probabilidad == 'Muy Baja' && (this.RiesgoList[i].impacto == 'Marginal')) {
						this.RiesgoList[i].nivelRiesgo = "MB";
						var val = {
							idRiesgo: this.RiesgoList[i].idRiesgo,
							nivelRiesgoInherente: this.RiesgoList[i].nivelRiesgo,
						};
						this.RiesgoListPorMacro.push(val);
					}
					else if (this.RiesgoList[i].probabilidad == 'Muy Baja' && (this.RiesgoList[i].impacto == 'Débil')) {
						this.RiesgoList[i].nivelRiesgo = "B";
						var val = {
							idRiesgo: this.RiesgoList[i].idRiesgo,
							nivelRiesgoInherente: this.RiesgoList[i].nivelRiesgo,
						};
						this.RiesgoListPorMacro.push(val);
					}
					else if (this.RiesgoList[i].probabilidad == 'Muy Baja' && (this.RiesgoList[i].impacto == 'Importante')) {
						this.RiesgoList[i].nivelRiesgo = "M";
						var val = {
							idRiesgo: this.RiesgoList[i].idRiesgo,
							nivelRiesgoInherente: this.RiesgoList[i].nivelRiesgo,
						};
						this.RiesgoListPorMacro.push(val);
					}
					else if (this.RiesgoList[i].probabilidad == 'Muy Baja' && (this.RiesgoList[i].impacto == 'Crítico' || this.RiesgoList[i].impacto == 'Catastrófico')) {
						this.RiesgoList[i].nivelRiesgo = "A";
						var val = {
							idRiesgo: this.RiesgoList[i].idRiesgo,
							nivelRiesgoInherente: this.RiesgoList[i].nivelRiesgo,
						};
						this.RiesgoListPorMacro.push(val);
					}
				}
			}

			console.log("Lista de riesgos inherentes por macro");
			console.log(this.RiesgoListPorMacro);
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
