import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { SharedService } from 'src/app/shared.service';
import { ActivatedRoute } from '@angular/router';
import { Macroproceso } from 'src/app/body/pareto/macroproceso';

declare function getPointCategoryName(point: any, dimension: any): any;
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
			categories: ['Muy Alto', 'Alto', 'Medio', 'Bajo', 'Muy Bajo'],
			title: ['Probabilidad'],
			reversed: true
		},

		accessibility: {
			point: {
				descriptionFormatter: function (point: any) {
					var ix = point.index + 1,
						xName = getPointCategoryName(point, 'x'),
						yName = getPointCategoryName(point, 'y'),
						val = point.value;
					return ix + '. ' + xName + ' sales ' + yName + ', ' + val + '.';
				}
			}
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
			symbolHeight: 280
		},

		tooltip: {
		},

		series: [{
			name: 'Riesgo Inherente',
			//Verificar si es el nombre correcto
			borderWidth: 1,
			data: [[0, 0, 75,], [0, 1, 50], [0, 2, 25], [0, 3, 25], [0, 4, 0], [1, 0, 75], [1, 1, 75], [1, 2, 50], [1, 3, 25], [1, 4, 25], [2, 0, 100], [2, 1, 75], [2, 2, 50], [2, 3, 50], [2, 4, 50], [3, 0, 100], [3, 1, 100], [3, 2, 100], [3, 3, 75], [3, 4, 75], [4, 0, 100], [4, 1, 100], [4, 2, 100], [4, 3, 100], [4, 4, 75]],
			dataLabels: {
				enabled: true,
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
	riesgosPorMacro: string = "";
	riesgos: string = "";
	contRiesgosSinMacro: number = 0;

	ngOnInit() {
		this.refreshRiesgoList();
		this.buscarRiesgosSinMacros();
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
		this.service.getRiesgoList().subscribe(data => {
			this.RiesgoList = data;
			for (let i = 0; i < this.RiesgoList.length; i++) {
				//Si existen riesgos asociados al macroproceso correspondiente
				if (this.RiesgoList[i].macroProceso === this._Activatedroute.snapshot.paramMap.get('macro')) {
					this.RiesgoListPorMacro.push(this.RiesgoList[i].idRiesgo);
					console.log("Riesgo con macro");
				}
			}
			for (let j = 0; j < this.RiesgoListPorMacro.length; j++) {
				console.log(this.RiesgoListPorMacro[j]);
				this.riesgosPorMacro += " " + this.RiesgoListPorMacro[j];
			}
			//console.log(this.riesgosPorMacro);
			this.chartOptions.tooltip.formatter = function (this: any) {
				this.riesgos = this.riesgosPorMacro;
				console.log("Aca: " + this.riesgosPorMacro);
				return 'ID de los riesgos: <b>' + this.riesgos + '</b><br>Impacto: <b>' + getPointCategoryName(this.point, 'x') + '</b> <br>Valor: <b>' +
					this.point.value + '</b><br> Con nivel de probabilidad: <b>' + getPointCategoryName(this.point, 'y') + '</b>';
			}
			console.log( "Aqui" + this.riesgosPorMacro);
			Highcharts.chart('container', this.chartOptions);
		});

	}
	refreshRiesgoList() {
		this.service.getRiesgoList().subscribe(data => {
			this.RiesgoList = data;
			console.log("Lista de riesgos");
			console.log(this.RiesgoList);

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
