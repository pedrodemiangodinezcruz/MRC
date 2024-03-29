import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
declare var require: any;
import { Macroproceso } from '../pareto/macroproceso';
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
	macroproceso: Macroproceso[] | undefined;
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

	constructor(public _Activatedroute: ActivatedRoute, private service: SharedService) { }

	public inherentePastel: any = {

		// Build the chart

		chart: {
			plotBackgroundColor: null,
			plotBorderWidth: null,
			plotShadow: false,
			type: 'pie'
		},
		title: {
			text: 'Diagrama de pastel mostrando la frecuencia de los '
				+ 'riesgos inherentes asociados al macroproceso: <strong> ' + this._Activatedroute.snapshot.paramMap.get('macro') + '</strong>',
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
					distance: -65,
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

	ngOnInit(): void {
		this.refreshRiesgoList();
		this.refreshControlList();
		this.refreshCausaList();
		this.riesgoInherente = true;
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
		this.inherentePastel.series[0]['data'] = [{ name: 'MA', y: 0 }, { name: 'A', y: 0 }, { name: 'M', y: 0 }, { name: 'B', y: 0 }, { name: 'MB', y: 0 }];
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
			if (RiesgoList[i].macroProceso == this._Activatedroute.snapshot.paramMap.get('macro')
			 && RiesgoList[i].estadoActivo === 'Activo') {
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
		if (this.riesgosInherentesMuyAltos > 0 || this.riesgosInherentesAltos > 0
			|| this.riesgosInherentesMedios > 0 || this.riesgosInherentesBajos > 0
			|| this.riesgosInherentesMuyBajos > 0) {
			this.inherentePastel.series[0]['data'][0] = {
				name: 'MA',
				y: this.riesgosInherentesMuyAltos
			};
			this.inherentePastel.series[0]['data'][1] = {
				name: 'A',
				y: this.riesgosInherentesAltos
			};
			this.inherentePastel.series[0]['data'][2] = {
				name: 'M',
				y: this.riesgosInherentesMedios
			}
			this.inherentePastel.series[0]['data'][3] = {
				name: 'B',
				y: this.riesgosInherentesBajos
			}
			this.inherentePastel.series[0]['data'][4] = {
				name: 'MB',
				y: this.riesgosInherentesMuyBajos
			}
		}
		else{
			this.inherentePastel.series[0]['data'][0] = {
				name: 'No existen riesgos asociados a este macroproceso',
				y: 10
			};
		}
		Highcharts.chart('container', this.inherentePastel);
		RiesgoList = data;
	}

}
