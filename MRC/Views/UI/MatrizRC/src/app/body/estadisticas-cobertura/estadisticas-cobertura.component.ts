import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
declare var require: any;
import { Macroproceso } from '../pareto/macroproceso';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from 'src/app/shared.service';

@Component({
	selector: 'app-estadisticas-cobertura',
	templateUrl: './estadisticas-cobertura.component.html',
	styleUrls: ['./estadisticas-cobertura.component.css']
})
export class EstadisticasCoberturaComponent implements OnInit {
	macroproceso: Macroproceso[] | undefined;
	RiesgoList: any = [];
	CausaList: any = [];
	ControlList: any = [];
	riesgosInherentesMuyAltos: number = 0;
	riesgosInherentesAltos: number = 0;
	riesgosInherentesMedios: number = 0;
	riesgosInherentesBajos: number = 0;
	riesgosInherentesMuyBajos: number = 0;
	controlesTotales: number = 0;
	controlesAltos: number = 0;
	controlesMedios: number = 0;
	controlesBajos: number = 0;
	ausenciasDeControl: number = 0;
	ocurrencias: number = 1;
	valorDiseñoDeControl: number = 0;
	valorCalificacionControl: number = 0;
	coberturaTotalControles: number = 0;
	riesgoInherente: boolean = true;
	residual: boolean = false;
	cobertura: boolean = false;

	constructor(public _Activatedroute: ActivatedRoute, private service: SharedService) { }


	public coberturaPastel: any = {

		// Build the chart
		chart: {
			plotBackgroundColor: null,
			plotBorderWidth: null,
			plotShadow: false,
			type: 'pie'
		},
		title: {
			text: 'Diagrama de pastel del macroproceso: <strong>' + this._Activatedroute.snapshot.paramMap.get('macro') + '</strong> mostrando las fecuencias de las coberturas de los controles',
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
			data: [
			]
		}]
	};

	ngOnInit(): void {
		this.refreshRiesgoList();
		this.refreshControlList();
		this.refreshCausaList();
		this.calculosControles();
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
		this.coberturaPastel.series[0]['data'] = [{ name: 'Total', y: 0 }, { name: 'Alto', y: 0 }, { name: 'Medio', y: 0 }, { name: 'Bajo', y: 0 }, { name: 'Ausencia de Control', y: 0 }];
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
			if (RiesgoList[i].macroProceso == this._Activatedroute.snapshot.paramMap.get('macro')) {
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
		RiesgoList = data;
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
				ControlList[i].coberturaPonderada = (Math.round((ControlList[i].calificacionControl * ControlList[i].cobertura * 0.5) / 100));
			}
			else {
				ControlList[i].coberturaPonderada = (Math.round((ControlList[i].calificacionControl * ControlList[i].cobertura) / 100));
			}
		}
		//console.log("Lista de controles despues de calcular coberturaPonderada: ");
		//console.log(ControlList);
		this.calcularCoberturaTotalControles(ControlList);
	}
	calcularCoberturaTotalControles(ControlList: any) {
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
			//Ver si recorrer la liesta de riesgos para ver cualtes estan en el macro proceso
			for (let i = 0; i < this.RiesgoList.length; ++i) {
				if (this.RiesgoList[i].macroProceso == this._Activatedroute.snapshot.paramMap.get('macro')) {
					if (this.RiesgoList[i].idRiesgo === ControlList[j].idRiesgoAsociado || this.RiesgoList[i].idRiesgo === ControlList[j].idRiesgoAsociado2
						|| this.RiesgoList[i].idRiesgo === ControlList[j].idRiesgoAsociado3 || this.RiesgoList[i].idRiesgo === ControlList[j].idRiesgoAsociado4
						|| this.RiesgoList[i].idRiesgo === ControlList[j].idRiesgoAsociado5 || this.RiesgoList[i].idRiesgo === ControlList[j].idRiesgoAsociado6
						|| this.RiesgoList[i].idRiesgo === ControlList[j].idRiesgoAsociado7 || this.RiesgoList[i].idRiesgo === ControlList[j].idRiesgoAsociado8
						|| this.RiesgoList[i].idRiesgo === ControlList[j].idRiesgoAsociado9 || this.RiesgoList[i].idRiesgo === ControlList[j].idRiesgoAsociado10) {
						//Si la cobertura total 0-20%, cobetura = Ausencia de control
						if (ControlList[j].coberturaTotal <= 20) {
							ControlList[j].nivelCobertura = "Ausencia de control";
							++this.ausenciasDeControl;
						}
						//Si la cobertura total 20-40%, cobetura = Bajo
						else if (ControlList[j].coberturaTotal > 20 && ControlList[j].coberturaTotal <= 40) {
							ControlList[j].nivelCobertura = "Bajo";
							++this.controlesBajos;
						}
						//Si la cobertura total 40-60%, cobetura = Medio
						else if (ControlList[j].coberturaTotal > 40 && ControlList[j].coberturaTotal <= 60) {
							ControlList[j].nivelCobertura = "Medio";
							++this.controlesMedios;
						}
						//Si la cobertura total 60-80%, cobetura = Alto
						else if (ControlList[j].coberturaTotal > 60 && ControlList[j].coberturaTotal <= 80) {
							ControlList[j].nivelCobertura = "Alto";
							++this.controlesAltos;
						}
						//Si la cobertura total 80-100%, cobetura = Total
						else if (ControlList[j].coberturaTotal > 80 && ControlList[j].coberturaTotal <= 100) {
							ControlList[j].nivelCobertura = "Total";
							++this.controlesTotales;
						}
					}
				}
			}
		}
		if(this.controlesTotales > 0 || this.controlesAltos > 0 || this.controlesMedios > 0 || this.controlesBajos > 0 || this.ausenciasDeControl > 0){
		this.coberturaPastel.series[0]['data'][0] = {
			name: 'Total',
			y: this.controlesTotales
		};
		this.coberturaPastel.series[0]['data'][1] = {
			name: 'Alto',
			y: this.controlesAltos
		};
		this.coberturaPastel.series[0]['data'][2] = {
			name: 'Medio',
			y: this.controlesMedios
		};
		this.coberturaPastel.series[0]['data'][3] = {
			name: 'Bajo',
			y: this.controlesBajos
		};
		this.coberturaPastel.series[0]['data'][4] = {
			name: 'Ausencia de control',
			y: this.ausenciasDeControl
		};
	}
	else{
		this.coberturaPastel.series[0]['data'][0] = {
			name: 'No existen riesgos asociados a este macroproceso',
			y: 10
		};
	}
		Highcharts.chart('container', this.coberturaPastel);
		this.calcularGravedadRiesgoResidual(ControlList);
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

	}

}
