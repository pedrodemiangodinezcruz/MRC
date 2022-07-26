import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { Macroproceso } from './macroproceso';
import { SharedService } from 'src/app/shared.service';
import { ActivatedRoute } from '@angular/router';
import { ThisReceiver } from '@angular/compiler';
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
	ControlList: any = [];
	causasPorMacroproceso: any = [];
	causasPorRepeticion: any = [];
	causa: any;
	datos: any = [];
	contador: number = 0;
	causasDuplicadas: any = [];
	anteriorCausa: string = "";
	descripcion: string | undefined;

	public options: any = {

		Macro: "",
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
			color: 'rgb(201, 223, 238)',
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
			color: 'rgb(0, 100, 175)',
			name: 'Frecuencia',
			type: 'column',
			zIndex: 2,
			data: [],
		}]

	};

	ngOnInit() {
		this.refreshCausasList();
		this.poblarPareto();
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
		/*this.service.getRiesgoList().subscribe(riesgos => {
			this.service.getCausasList().subscribe(causas => {
				this.RiesgoList = riesgos;
				this.CausasList = causas;
				//Recorrer listas de causas y lista de ruesgos
				for (let j = 0; j < this.CausasList.length; j++) {
					for (let i = 0; i < this.RiesgoList.length; i++) {
						//If que verifica que la lista se llene con el macroProceso establecido en la ruta y que el ID del Riesgo Asociado desde 
						//la causa coincida con un riesgo en el sistem
						if ((this.RiesgoList[i].macroProceso === this._Activatedroute.snapshot.paramMap.get('macro')) && (this.RiesgoList[i].idRiesgo == this.CausasList[j].idRiesgoAsociado
							|| this.RiesgoList[i].idRiesgo == this.CausasList[j].idRiesgoAsociado2 || this.RiesgoList[i].idRiesgo == this.CausasList[j].idRiesgoAsociado3 
							|| this.RiesgoList[i].idRiesgo == this.CausasList[j].idRiesgoAsociado4 || this.RiesgoList[i].idRiesgo == this.CausasList[j].idRiesgoAsociado5
							|| this.RiesgoList[i].idRiesgo == this.CausasList[j].idRiesgoAsociado6 || this.RiesgoList[i].idRiesgo == this.CausasList[j].idRiesgoAsociado7 
							|| this.RiesgoList[i].idRiesgo == this.CausasList[j].idRiesgoAsociado8 || this.RiesgoList[i].idRiesgo == this.CausasList[j].idRiesgoAsociado9 
							|| this.RiesgoList[i].idRiesgo == this.CausasList[j].idRiesgoAsociado10)) {
							let causas = {
								riesgo: this.RiesgoList[i].idRiesgo,
								macroproceso: this.RiesgoList[i].macroProceso,
								descripcion: this.CausasList[j].descripcion
							};
							//Llenar los resultados en el arreglos CausasPorMacroProceso
							this.causasPorMacroproceso.push(causas);
							//console.log(this.CausasList[i].descripcion);
						}
					}
				}
				console.log("Array con las descripciones de las causas separado por Macroproceso de los riesgos asociados a las cuasas");
				console.log(this.causasPorMacroproceso);
				//Si existen causas en los macroprocesos
				if (this.causasPorMacroproceso.length != 0) {
				//Para contar las causas duplicadas, primer ordenar el arreglo (Por descripción)
					this.causasPorMacroproceso.sort((elemento:any,elemento2:any) => {
					if (elemento.descripcion > elemento2.descripcion) {
						return 1;
					}
				
					if (elemento.descripcion < elemento2.descripcion) {
						return -1;
					}
				
					return 0;
				});
					console.log("Lista ordenada: ");
					console.log(this.causasPorMacroproceso);
					console.log("Valores duplicados: ");
					for (let i=0; i < this.causasPorMacroproceso.length; ++i) {
						//Validación: Cubrir caso de si es el primer elemento del array
						//Si son iguales las causas, se suma 1 al contador de ocurrencias la causa y los duplicados
						if (this.causasPorMacroproceso[i].descripcion === this.anteriorCausa) {
							++this.numDup;
							++this.ocurrencias;
							//Si sí
							if (this.numDup === 1) {
								++this.dupCont;
								if (this.dupCont === 1) {
									console.log("Ocurrencias de '" + this.causasPorMacroproceso[i].descripcion + "': "  + this.ocurrencias);
									//this.options.xAxis['categories'].push([this.causasPorMacroproceso[i].descripcion])
									this.options.series[1]['data'].push([this.ocurrencias]);
								}
								else {
									++this.ocurrencias;
									console.log("Ocurrencias de '" + this.causasPorMacroproceso[i].descripcion + "': "  + this.ocurrencias);
									//this.options.xAxis['categories'].push([this.causasPorMacroproceso[i].descripcion])
									this.options.series[1]['data'].push([this.ocurrencias]);
								}
							}
						}
						//Si no son iguales las causas
						else {
							//Si van a existir repetidos no adjuntar hasta que sea la última ocurrencia
							if(this.ocurrencias >= 2){
							}
							//Aqui cambiar el 0 por 1
							else if(i>=1){	
							//Popular con el número de ocurrencias
							this.options.series[1]['data'].push([this.ocurrencias]);
							}
							this.anteriorCausa =  this.causasPorMacroproceso[i].descripcion;
							this.numDup = 0;
							//Popular las categorias en el pareto solo una vez cuando existen repetidos
							this.options.xAxis['categories'].push([this.causasPorMacroproceso[i].descripcion])
							//Dejar las ocurrecnias en 1 ya que siempre existe una cuasa por riesgo
							this.ocurrencias = 1;
						}

					}
					console.log("Número de valores duplicados: " + this.dupCont);
				}
				//Sino
				else {
					this.options.title['text'] = 'No existen causas para el Macroproceso: ' + this._Activatedroute.snapshot.paramMap.get('macro')
					//this.options.xAxis['categories'].push(['No existen causas para el Macroproceso: ' + this._Activatedroute.snapshot.paramMap.get('macro')])
					this.options.series[1]['data'] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
				}
				Highcharts.chart('container', this.options);
			});
		});*/
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
	poblarPareto() {
		//Obtener lista de riesgos y lista de causas
		this.service.getRiesgoList().subscribe(riesgos => {
			this.service.getCausasList().subscribe(causas => {
				this.service.getControlesList().subscribe(controles => {
					this.ControlList = controles;
					this.RiesgoList = riesgos;
					this.CausasList = causas;
					//Recorrer listas de causas, riesgos y controles para contar las causas repetidas
					for (let i = 0; i < this.RiesgoList.length; i++) {
						for (let k = 0; k < this.ControlList.length; k++) {
							for (let j = 0; j < this.CausasList.length; j++) {
								//If que verifica que la lista se llene con el macroProceso establecido en la ruta y que el ID del Riesgo Asociado desde 
								//la causa coincida con un riesgo en el sistem
								if ((this.RiesgoList[i].macroProceso === this._Activatedroute.snapshot.paramMap.get('macro'))
									&& (this.RiesgoList[i].idRiesgo == this.CausasList[j].idRiesgoAsociado
										|| this.RiesgoList[i].idRiesgo == this.CausasList[j].idRiesgoAsociado2 || this.RiesgoList[i].idRiesgo == this.CausasList[j].idRiesgoAsociado3
										|| this.RiesgoList[i].idRiesgo == this.CausasList[j].idRiesgoAsociado4 || this.RiesgoList[i].idRiesgo == this.CausasList[j].idRiesgoAsociado5
										|| this.RiesgoList[i].idRiesgo == this.CausasList[j].idRiesgoAsociado6 || this.RiesgoList[i].idRiesgo == this.CausasList[j].idRiesgoAsociado7
										|| this.RiesgoList[i].idRiesgo == this.CausasList[j].idRiesgoAsociado8 || this.RiesgoList[i].idRiesgo == this.CausasList[j].idRiesgoAsociado9
										|| this.RiesgoList[i].idRiesgo == this.CausasList[j].idRiesgoAsociado10)
									&& (this.RiesgoList[i].idRiesgo === this.ControlList[k].idRiesgoAsociado || this.RiesgoList[i].idRiesgo === this.ControlList[k].idRiesgoAsociado2
										|| this.RiesgoList[i].idRiesgo === this.ControlList[k].idRiesgoAsociado3 || this.RiesgoList[i].idRiesgo === this.ControlList[k].idRiesgoAsociado4
										|| this.RiesgoList[i].idRiesgo === this.ControlList[k].idRiesgoAsociado5 || this.RiesgoList[i].idRiesgo === this.ControlList[k].idRiesgoAsociado6
										|| this.RiesgoList[i].idRiesgo === this.ControlList[k].idRiesgoAsociado7 || this.RiesgoList[i].idRiesgo === this.ControlList[k].idRiesgoAsociado8
										|| this.RiesgoList[i].idRiesgo === this.ControlList[k].idRiesgoAsociado9 || this.RiesgoList[i].idRiesgo === this.ControlList[k].idRiesgoAsociado10)
									&& (this.ControlList[k].idControl === this.CausasList[j].idControlAsociado || this.ControlList[k].idControl === this.CausasList[j].idControlAsociado2
										|| this.ControlList[k].idControl === this.CausasList[j].idControlAsociado3 || this.ControlList[k].idControl === this.CausasList[j].idControlAsociado4
										|| this.ControlList[k].idControl === this.CausasList[j].idControlAsociado5 || this.ControlList[k].idControl === this.CausasList[j].idControlAsociado6
										|| this.ControlList[k].idControl === this.CausasList[j].idControlAsociado7 || this.ControlList[k].idControl === this.CausasList[j].idControlAsociado8
										|| this.ControlList[k].idControl === this.CausasList[j].idControlAsociado9 || this.ControlList[k].idControl === this.CausasList[j].idControlAsociado10)) {
									let causas = {
										//riesgo: this.RiesgoList[i].idRiesgo,
										descripcion: this.CausasList[j].descripcion,
									};
									//Llenar los resultados en el arreglos CausasPorMacroProceso
									this.causasPorMacroproceso.push(causas);
								}
							}
						}
					}
					//Ordenar el arreglo para contar duplicados, primero si existen causas en los macroprocesos
					if (this.causasPorMacroproceso.length != 0) {
						//Para contar las causas duplicadas, primer ordenar el arreglo (Por descripción)
						this.causasPorMacroproceso.sort((elemento: any, elemento2: any) => {
							if (elemento.descripcion > elemento2.descripcion) {
								return 1;
							}

							if (elemento.descripcion < elemento2.descripcion) {
								return -1;
							}

							return 0;
						});
					}
					//Sino
					else {
						this.options.title['text'] = 'No existen causas para el Macroproceso: ' + this._Activatedroute.snapshot.paramMap.get('macro')
						//this.options.xAxis['categories'].push(['No existen causas para el Macroproceso: ' + this._Activatedroute.snapshot.paramMap.get('macro')])
						this.options.series[1]['data'] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
					}
					console.log("Array ordenado alfabeticamente de las multiples causas por los riesgos: ");
					console.log(this.causasPorMacroproceso);
					//Contar el  número de repeticiones de la descripcion de las causas en this.causasPorMacroproceso
					this.causasPorMacroproceso.forEach((element: any) => {
						this.contador = 0;
						this.causasPorMacroproceso.forEach((element2:any) => {
							if (element.descripcion === element2.descripcion) {
								this.contador++;
							}
						}
						);
						//Llenar el arreglo de los duplicados con las repeticiones y la descripcion de las causas
						var val ={
							repeticiones: this.contador,
							descripcion: element.descripcion
						}
						this.causasDuplicadas.push(val);
					}
					);
					console.log("Array de las causas con su número de repeticiones: ");
					console.log(this.causasDuplicadas);
					//Quitar los duplicados del arreglo this.causasDuplicadas
					this.causasPorRepeticion = this.causasDuplicadas.filter((value: any, index: any) => {
						const _value = JSON.stringify(value);
						return index === this.causasDuplicadas.findIndex((resultados: any) => {
						  return JSON.stringify(resultados) === _value;
						});
					  });
					  console.log("Array de los resultados sin duplicados: ");
					  console.log(this.causasPorRepeticion);
					  for (let i = 0; i < this.causasPorRepeticion.length; ++i) {
						  this.options.xAxis['categories'].push(this.causasPorRepeticion[i].descripcion);
						  this.options.series[1]['data'].push(this.causasPorRepeticion[i].repeticiones);
					  }
					Highcharts.chart('container', this.options);
				});
			});
		});
	}
}

