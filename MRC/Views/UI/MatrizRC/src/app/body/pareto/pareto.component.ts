import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { Macroproceso } from './macroproceso';
import { SharedService } from 'src/app/shared.service';
import { ActivatedRoute } from '@angular/router';
//import { getEnabledCategories } from 'trace_events';


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
	selector: 'app-pareto',
	templateUrl: './pareto.component.html',
	styleUrls: ['./pareto.component.css']
})



export class ParetoComponent implements OnInit {
	macroproceso: Macroproceso[] | undefined;

	constructor(public _Activatedroute: ActivatedRoute, private service: SharedService) { }
	CausasList: any = [];
	RiesgoList: any = [];
	descripciones: any = [];
	causasPorMacroproceso: any = [];
	causa: any;
	datos: any = [];
	descripcion: string | undefined;
	public options: any = {

		Macro: "Jaun",
		chart: {
			renderTo: 'container',
			type: 'column'
		},
		title: {
			text: 'Pareto del macroproceso de: ' + this._Activatedroute.snapshot.paramMap.get('macro'),
		},
		tooltip: {
			shared: true
		},
		xAxis: {
			categories: [],
			crosshair: true
		},
		yAxis: [{
			title: {
				text: 'Frecuencia'
			}
		}, {
			title: {
				text: 'Frecuencía Acumulada'
			},
			minPadding: 0,
			maxPadding: 0,
			max: 100,
			min: 0,
			opposite: true,
			labels: {
				format: "{value}%"
			}
		}],
		series: [{
			type: 'pareto',
			name: 'Pareto',
			yAxis: 1,
			zIndex: 10,
			baseSeries: 1,
			tooltip: {
				valueDecimals: 2,
				valueSuffix: '%'
			}
		}, {
			name: 'Frecuencia',
			type: 'column',
			zIndex: 2,
			data: [21, 7, 4, 3, 3, 1, 1, 1, 1, 1, 1, 1]
		}]

	};

	ngOnInit() {
		//this.refreshCausasList();
		//this.refreshRiesgoList();
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
		//Obtener lista de riesgos y lista de causas
		this.service.getRiesgoList().subscribe(riesgos => {
			this.service.getCausasList().subscribe(causas => {
				this.RiesgoList = riesgos;
				this.CausasList = causas;
				//Recorrer listas de causas y lista de ruesgos
				for (let j = 0; j < this.CausasList.length; j++) {
					for (let i = 0; i < this.RiesgoList.length; i++) {
						//If que verifica que la lista s ellene con el macroProceso establecido en la ruta y que el ID del Riesgo Asociado desde 
						//la causa coincida con un riesgo en el sistem
						if (  (this.RiesgoList[i].macroProceso === this._Activatedroute.snapshot.paramMap.get('macro') ) && (this.RiesgoList[i].idRiesgo === (this.CausasList[j].idRiesgoAsociado || this.CausasList[j].idRiesgoAsociado2 ||
							this.CausasList[j].idRiesgoAsociado3 || this.CausasList[j].idRiesgoAsociado4 || this.CausasList[j].idRiesgoAsociado5 ||
							this.CausasList[j].idRiesgoAsociado6 || this.CausasList[j].idRiesgoAsociado7 || this.CausasList[j].idRiesgoAsociado8 ||
							this.CausasList[j].idRiesgoAsociado9 || this.CausasList[j].idRiesgoAsociado10))) {
							let causas = {
								macroproceso: this.RiesgoList[i].macroProceso,
								descripcion: this.CausasList[i].descripcion
							};
							//Llenar los resultados en el arreglos CausasPorMacroProceso
							this.causasPorMacroproceso.push(causas);
							//console.log(this.CausasList[i].descripcion);
						}
					}
				}
				console.log("Array con las descripciones de las cuasas separado por Macroproceso de los riesgos asociados a las cuasas");
				console.log(this.causasPorMacroproceso);
				//Si existen causas en los macroprocesos
				if(this.causasPorMacroproceso.length !=0){
				for(let i = 0; i < this.causasPorMacroproceso.length; i++){
				this.options.xAxis['categories'].push([this.causasPorMacroproceso[i].descripcion])
			}}
			//Sino
			else{
				this.options.xAxis['categories'].push(['No existen causas para el Macroproceso'])
			}
				Highcharts.chart('container', this.options);
			});
		});
	}


	refreshCausasList() {
		this.service.getCausasList().subscribe(datos => {
			this.CausasList = datos;
			/*console.log("Lista de causas");
			console.log(this.CausasList);
			for (let i = 0; i < this.CausasList.length; i++) {
				let descripcion = {
					id: i.toString(),
					descripciones: this.CausasList[i].descripcion
				};
				this.descripciones.push(descripcion);
				//console.log(this.CausasList[i].descripcion);
			}
			console.log("Array con las descripciones");
			console.log(this.descripciones);*/
		});
	}
	refreshRiesgoList() {
		this.service.getRiesgoList().subscribe(riesgos => {
			this.service.getCausasList().subscribe(causas => {
				this.RiesgoList = riesgos;
				//console.log("Lista de riesgos");
				//console.log(this.RiesgoList);
				this.CausasList = causas;
				//Recorrer listas de causas y lista de ruesgos
				for (let j = 0; j < this.CausasList.length; j++) {
					for (let i = 0; i < this.RiesgoList.length; i++) {
						//If que verifica que la lista s ellene con el macroProceso establecido en la ruta y que el ID del Riesgo Asociado desde 
						//la causa coincida con un riesgo en el sistem
						if (  (this.RiesgoList[i].macroProceso === this._Activatedroute.snapshot.paramMap.get('macro') ) && (this.RiesgoList[i].idRiesgo === (this.CausasList[j].idRiesgoAsociado || this.CausasList[j].idRiesgoAsociado2 ||
							this.CausasList[j].idRiesgoAsociado3 || this.CausasList[j].idRiesgoAsociado4 || this.CausasList[j].idRiesgoAsociado5 ||
							this.CausasList[j].idRiesgoAsociado6 || this.CausasList[j].idRiesgoAsociado7 || this.CausasList[j].idRiesgoAsociado8 ||
							this.CausasList[j].idRiesgoAsociado9 || this.CausasList[j].idRiesgoAsociado10))) {
							let causas = {
								macroproceso: this.RiesgoList[i].macroProceso,
								descripcion: this.CausasList[i].descripcion
							};
							//Llenar los resultados en el arreglos CausasPorMacroProceso
							this.causasPorMacroproceso.push(causas);
							//console.log(this.CausasList[i].descripcion);
						}
					}
				}
				console.log("Array con las descripciones de las cuasas separado por Macroproceso de los riesgos asociados a las cuasas");
				console.log(this.causasPorMacroproceso);
			});
		});

	}
}

