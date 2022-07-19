import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
declare var require: any;
import {Macroproceso} from '../pareto/macroproceso';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from 'src/app/shared.service';

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
	macroproceso:Macroproceso[] | undefined;
	RiesgoList: any = [];
	CausaList: any = [];
	ControlList: any = [];
	riesgosInherentesMuyAltos: number = 0;
	riesgosInherentesAltos: number = 0;
	riesgosInherentesMedios: number = 0;
	riesgosInherentesBajos: number = 0;
	riesgosInherentesMuyBajos: number = 0;
	riesgoInherente: boolean = true;
	residual: boolean = false;
	cobertura: boolean = false;
	
	constructor(public _Activatedroute:ActivatedRoute, private service: SharedService) { }

	public inherentePastel: any = {

		// Build the chart

			chart: {
				plotBackgroundColor: null,
				plotBorderWidth: null,
				plotShadow: false,
				type: 'pie'
			},
			title: {
				text: 'Diagrama de pastel del macroproceso de: <strong> ' + this._Activatedroute.snapshot.paramMap.get('macro') + '</strong>',
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
				data: []
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
			text: 'Diagrama de pastel del macroproceso: <strong>'+  this._Activatedroute.snapshot.paramMap.get('macro') + '</strong> mostrando la frecuencia de los niveles de riesgo',
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
			text: 'Diagrama 3 de pastel del macroproceso: <strong>' +  this._Activatedroute.snapshot.paramMap.get('macro') + '</strong> mostrando la frecuencia de los niveles de riesgo'
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
	


  ngOnInit(): void {
	this.refreshRiesgoList();
	this.refreshControlList();
	this.refreshCausaList();
	this.riesgoInherente = true;
	this.macroproceso =[
		{Nombre: "Concepto al Producto"},
		{Nombre: "Compra al Pago"},
		{Nombre: "Demanda al Abasto"},
		{Nombre: "Pedido al Cobro"},
		{Nombre: "Mantenimiento a la Liquidación"},
		{Nombre: "Inversión a la Desinversión"},
		{Nombre: "Finanzas a la Administración"},
		{Nombre: "Contratación al Retiro"},
		{Nombre: "Procesos Criticos fuera de Macros"}
	];
	this.inherentePastel.series[0]['data'] = [ { name: 'MA', y: 46.41 }, { name: 'A', y: 13.84 }, { name: 'M', y: 9.85 }, { name: 'B', y: 15.23 }, { name: 'MB', y: 14.67 }];
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

calcularNivelRiesgoInherente(RiesgoList: any, data: any) {
	for (let i = 0; i < RiesgoList.length; ++i) {
		if (RiesgoList[i].macroProceso ==  this._Activatedroute.snapshot.paramMap.get('macro')) {
		if (RiesgoList[i].probabilidad == 'Muy Alta' && (RiesgoList[i].impacto == 'Marginal' || RiesgoList[i].impacto == 'Débil')) {
			RiesgoList[i].nivelRiesgo = "A";
			++this.riesgosInherentesAltos;
		}
		else if (RiesgoList[i].probabilidad == 'Muy Alta' && (RiesgoList[i].impacto == 'Importante' || RiesgoList[i].impacto == 'Crítico' || RiesgoList[i].impacto == 'Catastrófico')) {
			RiesgoList[i].nivelRiesgo = "MA";
			++this.riesgosInherentesMuyAltos;
		}
		else if (RiesgoList[i].probabilidad == 'Alta' && (RiesgoList[i].impacto == 'Marginal')) {
			RiesgoList[i].nivelRiesgo = "M";
			++this.riesgosInherentesMedios;
		}
		else if (RiesgoList[i].probabilidad == 'Alta' && (RiesgoList[i].impacto == 'Débil' || RiesgoList[i].impacto == 'Importante')) {
			RiesgoList[i].nivelRiesgo = "A";
			++this.riesgosInherentesAltos;
		}
		else if (RiesgoList[i].probabilidad == 'Alta' && (RiesgoList[i].impacto == 'Crítico' || RiesgoList[i].impacto == 'Catastrófico')) {
			RiesgoList[i].nivelRiesgo = "MA";
			++this.riesgosInherentesMuyAltos;
		}
		else if (RiesgoList[i].probabilidad == 'Media' && (RiesgoList[i].impacto == 'Marginal')) {
			RiesgoList[i].nivelRiesgo = "B";
			++this.riesgosInherentesBajos;
		}
		else if (RiesgoList[i].probabilidad == 'Media' && (RiesgoList[i].impacto == 'Débil' || RiesgoList[i].impacto == 'Importante')) {
			RiesgoList[i].nivelRiesgo = "M";
			++this.riesgosInherentesMedios;
		}
		else if (RiesgoList[i].probabilidad == 'Media' && (RiesgoList[i].impacto == 'Crítico' || RiesgoList[i].impacto == 'Catastrófico')) {
			RiesgoList[i].nivelRiesgo = "MA";
			++this.riesgosInherentesMuyAltos;
		}
		else if (RiesgoList[i].probabilidad == 'Baja' && (RiesgoList[i].impacto == 'Marginal' || RiesgoList[i].impacto == 'Débil')) {
			RiesgoList[i].nivelRiesgo = "B";
			++this.riesgosInherentesBajos;
		}
		else if (RiesgoList[i].probabilidad == 'Baja' && (RiesgoList[i].impacto == 'Importante')) {
			RiesgoList[i].nivelRiesgo = "M";
			++this.riesgosInherentesMedios;
		}
		else if (RiesgoList[i].probabilidad == 'Baja' && (RiesgoList[i].impacto == 'Crítico')) {
			RiesgoList[i].nivelRiesgo = "A";
			++this.riesgosInherentesAltos;
		}
		else if (RiesgoList[i].probabilidad == 'Baja' && (RiesgoList[i].impacto == 'Catastrófico')) {
			RiesgoList[i].nivelRiesgo = "MA";
			++this.riesgosInherentesMuyAltos;
		}
		else if (RiesgoList[i].probabilidad == 'Muy Baja' && (RiesgoList[i].impacto == 'Marginal')) {
			RiesgoList[i].nivelRiesgo = "MB";
			++this.riesgosInherentesMuyBajos;
		}
		else if (RiesgoList[i].probabilidad == 'Muy Baja' && (RiesgoList[i].impacto == 'Débil')) {
			RiesgoList[i].nivelRiesgo = "B";
			++this.riesgosInherentesBajos;
		}
		else if (RiesgoList[i].probabilidad == 'Muy Baja' && (RiesgoList[i].impacto == 'Importante')) {
			RiesgoList[i].nivelRiesgo = "M";
			++this.riesgosInherentesMedios;
		}
		else if (RiesgoList[i].probabilidad == 'Muy Baja' && (RiesgoList[i].impacto == 'Crítico' || RiesgoList[i].impacto == 'Catastrófico')) {
			RiesgoList[i].nivelRiesgo = "A";
			++this.riesgosInherentesAltos;
		}
		}
	}
	this.inherentePastel.series[0]['data'][0] = {
		y: this.riesgosInherentesAltos
	};
	
	Highcharts.chart('container', this.inherentePastel);
	RiesgoList = data;
}

}
