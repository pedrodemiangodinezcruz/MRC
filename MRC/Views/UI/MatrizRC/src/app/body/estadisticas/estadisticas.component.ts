import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
declare var require: any;

let pareto = require('highcharts/modules/pareto');
let exporting = require('highcharts/modules/exporting');
let exportdata = require('highcharts/modules/export-data');
let accessibility = require('highcharts/modules/accessibility');


pareto(Highcharts);
exportdata(Highcharts);
exporting(Highcharts);
accessibility(Highcharts);


@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css']
})
export class EstadisticasComponent implements OnInit {

	riesgoInherente: boolean = true;
	residual: boolean = false;
	cobertura: boolean = false;
	
	public inherentePastel: any = {

		// Build the chart

			chart: {
				plotBackgroundColor: null,
				plotBorderWidth: null,
				plotShadow: false,
				type: 'pie'
			},
			title: {
				text: 'Diagrama de pastel del macroproceso <strong>"<%= proceso %>"</strong> mostrando la frecuencia de los niveles de riesgo'
			},
			tooltip: {
				pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
			},
			accessibility: {
				point: {
					valueSuffix: '%'
				}
			},
			plotOptions: {
				pie: {
					allowPointSelect: true,
					cursor: 'pointer',
					colors: ['rgb(255,0,0)', 'rgb(255,128,0)', 'rgb(255,255,0)', 'rgb(128,216,40)', 'rgb(0,176,80)'],
					dataLabels: {
						enabled: true,
						format: '<b>{point.name}</b><br>{point.percentage:.1f} %',
						distance: -50,
						filter: {
							property: 'percentage',
							operator: '>',
							value: 4
						}
					}
				}
			},
			series: [{
				name: 'Porcentaje',
				data: [
					{ name: 'MA', y: 46.41 },
					{ name: 'A', y: 13.84 },
					{ name: 'M', y: 9.85 },
					{ name: 'B', y: 15.23 },
					{ name: 'MB', y: 14.67 }
				]
			}]
      
	};
	public coberturaPastel: any = {

		// Build the chart
		chart: {
			plotBackgroundColor: null,
			plotBorderWidth: null,
			plotShadow: false,
			type: 'pie'
		},
		title: {
			text: 'Diagrama 2 de pastel del macroproceso <strong>"<%= proceso %>"</strong> mostrando la frecuencia de los niveles de riesgo'
		},
		tooltip: {
			pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
		},
		accessibility: {
			point: {
				valueSuffix: '%'
			}
		},
		plotOptions: {
			pie: {
				allowPointSelect: true,
				cursor: 'pointer',
				colors: ['rgb(255,0,0)', 'rgb(255,128,0)', 'rgb(255,255,0)', 'rgb(128,216,40)', 'rgb(0,176,80)'],
				dataLabels: {
					enabled: true,
					format: '<b>{point.name}</b><br>{point.percentage:.1f} %',
					distance: -50,
					filter: {
						property: 'percentage',
						operator: '>',
						value: 4
					}
				}
			}
		},
		series: [{
			name: 'Porcentaje',
			data: [
				{ name: 'MMMM', y: 46.41 },
				{ name: 'A', y: 13.84 },
				{ name: 'M', y: 9.85 },
				{ name: 'B', y: 15.23 },
				{ name: 'MB', y: 14.67 }
			]
		}]
	};
	public residualPastel:any = {
		chart: {
			plotBackgroundColor: null,
			plotBorderWidth: null,
			plotShadow: false,
			type: 'pie'
		},
		title: {
			text: 'Diagrama 3 de pastel del macroproceso <strong>"<%= proceso %>"</strong> mostrando la frecuencia de los niveles de riesgo'
		},
		tooltip: {
			pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
		},
		accessibility: {
			point: {
				valueSuffix: '%'
			}
		},
		plotOptions: {
			pie: {
				allowPointSelect: true,
				cursor: 'pointer',
				colors: ['rgb(0,176,80)', 'rgb(128,216,40)', 'rgb(255,255,0)', 'rgb(255,128,0)', 'rgb(255,0,0)'],
				dataLabels: {
					enabled: true,
					format: '<b>{point.name}</b><br>{point.percentage:.1f} %',
					distance: -50,
					filter: {
						property: 'percentage',
						operator: '>',
						value: 4
					}
				}
			}
		},
		series: [{
			name: 'Porcentaje',
			data: [
				{ name: 'Total', y: 46.41 },
				{ name: 'Alto', y: 13.84 },
				{ name: 'Medio', y: 9.85 },
				{ name: 'Bajo', y: 15.23 },
				{ name: 'Ausencia de control', y: 14.67 }
			]
		}]
	};

	irCobertura(){
		this.riesgoInherente = !this.riesgoInherente;
		this.cobertura = !this.cobertura;
		Highcharts.chart('container', this.coberturaPastel);
	}
	regresarInherente(){
		this.riesgoInherente = !this.riesgoInherente;
		this.cobertura = !this.cobertura;
		Highcharts.chart('container', this.inherentePastel);
	}
	irResidual(){
		this.cobertura = false;
		this.residual = true;
		Highcharts.chart('container', this.residualPastel);
	}
	regresarCobertura(){
		this.residual = false;
		this.cobertura = true;
		Highcharts.chart('container', this.coberturaPastel);
	}
	
  constructor() { }

  ngOnInit(): void {
	Highcharts.chart('container', this.inherentePastel);
  }

}
