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
	descripciones: any = [];
	causa: any;
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
			/*[
			'Información incorrecta, incompleta o no confiable desde su origen externo a este proceso',
			'Ejecución de procesos manuales / Sistemas no alineados a las necesidades de la operación',
			'Falta de capacitación, perfil inadecuado, falta de lineamientos en políticas y procedimientos',
			'Falta de supervisión y segregación de funciones en la aprobación de los estados financieros',
			'Saldos de cuentas contables presentados incorrectamente en los estados financieros',
			'Cambios en las Normas de Información Financiera Mexicanas (NIFs) no implemntados adecuadamente',
			'Inadecuada segregación de funciones',
			'Ausencia de un inventario y una matriz de riesgo de la información clasificada, incluyendo los estados financieros proyectados o consolidados en físico, digitalizados, en correos electrónicos o carpetas compartidas',
			'Falta de actualización de las políticas de seguridad de la información:* Copias de seguridad * Cifrado de datos * Dispositivos externos * Acceso remoto y bloqueo * Permisos para crear, modificar y eliminar datos',
			'Objetivos o metas no alineados a la estrategia del grupo, o poco realistas',
			'Sobreestimación / subestimación de activos/ingresos * Diferencias en tiempo * Valuación indebida de activos * Revelaciones indebidas * Diferencias en tiempo * Ingresos sobreestimados / subestimados * Pasivos y gastos sobreestimados / ocultos',
			'Sobreestimación / subestimación de activos / ingresos * Diferencias en tiempo * Valuación indebida de activos * Revelaciones indebidas * Diferencias en tiempo * Ingresos sobreestimados / subestimados * Pasivos y gastos sobreestimados / ocultos',
		  ] */
			categories: [
				'this.CausasList[1].descripcion',
				'this.CausasList[2].descripcion',
				'this.CausasList[3].descripcion',
				'this.CausasList[4].descripcion',
				'this.CausasList[5].descripcion',
				'this.CausasList[6].descripcion',
				'this.CausasList[7].descripcion',
				'this.CausasList[8].descripcion',
				'this.CausasList[9].descripcion',
				'this.CausasList[10].descripcion',
				'this.CausasList[11].descripcion',
				'this.CausasList[12].descripcion',],
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

	ngOnInit(): void {
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
		Highcharts.chart('container', this.options);
		this.refreshCausasList();
		this.descripcion = this.causa.descripcion;
	}


	refreshCausasList() {
		this.service.getCausasList().subscribe(datos => {
			this.CausasList = datos;
			console.log("Lista de causas");
			console.log(this.CausasList);
			for (let i = 0; i < this.CausasList.length; i++) {
				let descripcion = {
					id: i.toString(),
					name: "Tony"
				};
				this.descripciones.push(descripcion);
				console.log(this.CausasList[i].descripcion);
			}
		});
	}
}

