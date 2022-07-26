import { Component, OnInit, Input } from '@angular/core';
import { SharedService } from 'src/app/shared.service';


@Component({
	selector: 'app-matriz',
	templateUrl: './matriz.component.html',
	styleUrls: ['./matriz.component.css']
})
export class MatrizComponent implements OnInit {

	ocultarBoton: boolean = true;
	mostarBoton: boolean = false;
	contenteditable = false;
	esFomulado: boolean = false;


	editarRiesgo() {
		this.ocultarBoton = !this.ocultarBoton;
		this.mostarBoton = !this.mostarBoton;
		this.contenteditable = !this.contenteditable;
		this.esFomulado = !this.esFomulado;

	}
	guardarRiesgo() {
		this.mostarBoton = this.mostarBoton;
	}
	//Show es matriz
	//app-edit es riesgo

	constructor(private service: SharedService) { }

	RiesgoList: any = [];
	ListaRiesgosSinFiltrado: any = [];
	ControlList: any = [];
	ListaControlSinFiltrado: any = [];
	CausaList: any = [];
	riesgo: any;
	filtroPorIdRiesgo: string = "";
	filtroPorIdControl: string = "";
	filtroPorDescripcionRiesgo: string = "";
	filtroPorDescripcionControl: string = "";
	filtroPorProbabilidadRiesgo: string = "";
	ocurrencias: number = 1;
	valorDiseñoDeControl: number = 0;
	valorCalificacionControl: number = 0;
	coberturaTotalControles: number = 0;
	ActivarAltaRiesgo: boolean = false;
	ActivarEdicionRiesgo: boolean = false;
	Id: string | undefined;
	macroProceso: string | undefined;
	proceso: string | undefined;
	idRiesgo: string | undefined;
	descripcion: string | undefined;
	causa: string | undefined;
	consecuencia: string | undefined;
	tipoEvento: string | undefined;
	tipoRiesgo: string | undefined;
	iff: string | undefined;
	icc: string | undefined;
	ios: string | undefined;
	riesgoFraude: string | undefined;
	probabilidad: number | undefined;
	impacto: string | undefined;
	nivelRiesgo: string | undefined;
	gravedadRiesgoResidual: string | undefined;


	//ngOnInit(): void {
		async ngOnInit() {
		this.refreshRiesgoList();
		this.refreshControlList();
		this.refreshCausaList();
		this.calculosControles();
		/*(function repeat(){
			let i = 0;
			if (++i > 5) return;
			//this.calculosControles();
			setTimeout(function(){
			  console.log("waited for: " + i + " seconds");
			  repeat();
			}, 1000);
		  })();*/
		  
		this.Id = this.riesgo.Id;
		this.macroProceso = this.riesgo.macroProceso;
		this.proceso = this.riesgo.proceso;
		this.idRiesgo = this.riesgo.idRiesgo;
		this.descripcion = this.riesgo.descripcion;
		this.causa = this.riesgo.causa;
		this.consecuencia = this.riesgo.consecuencia;
		this.tipoEvento = this.riesgo.tipoEvento;
		this.tipoRiesgo = this.riesgo.tipoRiesgo;
		this.iff = this.riesgo.iff;
		this.icc = this.riesgo.icc;
		this.ios = this.riesgo.ios;
		this.riesgoFraude = this.riesgo.riesgoFraude;
		this.probabilidad = this.riesgo.probabilidad;
		this.impacto = this.riesgo.impacto;
		this.nivelRiesgo = this.riesgo.nivelRiesgo;
		this.gravedadRiesgoResidual = this.riesgo.gravedadRiesgoResidual;
		console.log(this.riesgo.idRiesgo);

	}

	addClick() {
		this.ActivarAltaRiesgo = true;
		this.riesgo = {
			Anadir: 0,
			Id: 0,
			macroProceso: "",
			proceso: "",
			idRiesgo: "",
			descripcion: "",
			causa: "",
			consecuencia: "",
			tipoEvento: "",
			tipoRiesgo: "",
			iff: "",
			icc: "",
			ios: "",
			riesgoFraude: "",
			probabilidad: 0,
			impacto: "",
			nivelRiesgo: "",
			gravedadRiesgoResidual: ""
		}
	}
	closeClick() {
		this.ActivarEdicionRiesgo = !this.ActivarEdicionRiesgo;
		this.refreshRiesgoList();
	}


	editClick(item: any) {
		this.riesgo = item;
		this.ActivarEdicionRiesgo = true;
		console.log(item.idRiesgo)
	}

	anadirRiesgo() {
		var val = {
			Id: this.Id,
			idRiesgo: this.idRiesgo,
			macroProceso: this.macroProceso,
			proceso: this.proceso,
			descripcion: this.descripcion,
			causa: this.causa,
			consecuencia: this.consecuencia,
			tipoEvento: this.tipoEvento,
			tipoRiesgo: this.tipoRiesgo,
			iff: this.iff,
			icc: this.icc,
			ios: this.ios,
			riesgoFraude: this.riesgoFraude,
			probabilidad: this.probabilidad,
			impacto: this.impacto,
			nivelRiesgo: this.nivelRiesgo,
			gravedadRiesgoResidual: this.gravedadRiesgoResidual
		};
		this.service.anadirRiesgo(val).subscribe(res => {
			alert(res.toString());
			console.log(res.toString());
		});
	}


	eliminarRiesgo(item: any) {
		console.log(item);
		console.log("ID BD del riesgo a eliminar " + item.Id);
		this.service.borrarRiesgo(item.Id).subscribe(data => {
			alert(data.toString());
			this.refreshRiesgoList();
		})
	}

	refreshRiesgoList() {
		this.calcularTipoRiesgo();
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
	/*VER CÓMO ACTUALIZAR LOS VALORES EN TIEMPO REAL */
	calcularNivelRiesgoInherente(RiesgoList: any, data: any) {
		for (let i = 0; i < this.RiesgoList.length; ++i) {
			if (RiesgoList[i].probabilidad == 'Muy Alta' && (RiesgoList[i].impacto == 'Marginal' || RiesgoList[i].impacto == 'Débil')) {
				RiesgoList[i].nivelRiesgo = "A";
			}
			else if (RiesgoList[i].probabilidad == 'Muy Alta' && (RiesgoList[i].impacto == 'Importante' || RiesgoList[i].impacto == 'Crítico' || RiesgoList[i].impacto == 'Catastrófico')) {
				RiesgoList[i].nivelRiesgo = "MA";
			}
			else if (RiesgoList[i].probabilidad == 'Alta' && (RiesgoList[i].impacto == 'Marginal')) {
				RiesgoList[i].nivelRiesgo = "M";
			}
			else if (RiesgoList[i].probabilidad == 'Alta' && (RiesgoList[i].impacto == 'Débil' || RiesgoList[i].impacto == 'Importante')) {
				RiesgoList[i].nivelRiesgo = "A";
			}
			else if (RiesgoList[i].probabilidad == 'Alta' && (RiesgoList[i].impacto == 'Crítico' || RiesgoList[i].impacto == 'Catastrófico')) {
				RiesgoList[i].nivelRiesgo = "MA";
			}
			else if (RiesgoList[i].probabilidad == 'Media' && (RiesgoList[i].impacto == 'Marginal')) {
				RiesgoList[i].nivelRiesgo = "B";
			}
			else if (RiesgoList[i].probabilidad == 'Media' && (RiesgoList[i].impacto == 'Débil' || RiesgoList[i].impacto == 'Importante')) {
				RiesgoList[i].nivelRiesgo = "M";
			}
			else if (RiesgoList[i].probabilidad == 'Media' && (RiesgoList[i].impacto == 'Crítico' || RiesgoList[i].impacto == 'Catastrófico')) {
				RiesgoList[i].nivelRiesgo = "MA";
			}
			else if (RiesgoList[i].probabilidad == 'Baja' && (RiesgoList[i].impacto == 'Marginal' || RiesgoList[i].impacto == 'Débil')) {
				RiesgoList[i].nivelRiesgo = "B";
			}
			else if (RiesgoList[i].probabilidad == 'Baja' && (RiesgoList[i].impacto == 'Importante')) {
				RiesgoList[i].nivelRiesgo = "M";
			}
			else if (RiesgoList[i].probabilidad == 'Baja' && (RiesgoList[i].impacto == 'Crítico')) {
				RiesgoList[i].nivelRiesgo = "A";
			}
			else if (RiesgoList[i].probabilidad == 'Baja' && (RiesgoList[i].impacto == 'Catastrófico')) {
				RiesgoList[i].nivelRiesgo = "MA";
			}
			else if (RiesgoList[i].probabilidad == 'Muy Baja' && (RiesgoList[i].impacto == 'Marginal')) {
				RiesgoList[i].nivelRiesgo = "MB";
			}
			else if (RiesgoList[i].probabilidad == 'Muy Baja' && (RiesgoList[i].impacto == 'Débil')) {
				RiesgoList[i].nivelRiesgo = "B";
			}
			else if (RiesgoList[i].probabilidad == 'Muy Baja' && (RiesgoList[i].impacto == 'Importante')) {
				RiesgoList[i].nivelRiesgo = "M";
			}
			else if (RiesgoList[i].probabilidad == 'Muy Baja' && (RiesgoList[i].impacto == 'Crítico' || RiesgoList[i].impacto == 'Catastrófico')) {
				RiesgoList[i].nivelRiesgo = "A";
			}

		}
		RiesgoList = data;
		console.log("Lista de riesgos");
		console.log(RiesgoList);
	}
	refreshControlList() {
		this.service.getControlesList().subscribe(data => {
			this.ControlList = data;
			console.log("Lista de contorles");
			console.log(this.ControlList);
		});
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
			this.ListaControlSinFiltrado = data;
			this.calcularEstrategiaMonitoreo(this.ControlList, this.ListaControlSinFiltrado);
		});
	}
	calcularEstrategiaMonitoreo(ControlList: any, ListaControlSinFiltrado: any) {
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
		this.calcularCalificacionControl(ControlList, ListaControlSinFiltrado);
		//console.log("Lista de controles despues de calcular estrategia de monitoreo: ");
		//console.log(ControlList);
	}

	calcularCalificacionControl(ControlList: any, ListaControlSinFiltrado: any) {
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
		this.calcularCoberturaPonderadaPorControl(ControlList, ListaControlSinFiltrado);
		//console.log("Lista de controles despues de calcular la calificación del control: ");
		//console.log(ControlList);

	}
	calcularCoberturaPonderadaPorControl(ControlList: any, ListaControlSinFiltrado: any) {
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
		this.calcularCoberturaTotalControles(ControlList, ListaControlSinFiltrado);
	}


	calcularCoberturaTotalControles(ControlList: any, ListaControlSinFiltrado: any) {
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
								/*if(ControlList[l].coberturaTotal > 100){
									ControlList[l] = "Revisar cobertura Individual por control";
								}*/
							}
						}
					}
				}
			}
			//Resetar la variable "coberturaTotalControles" para que no se sumen todas las coberturas ponderadas de los controles
			this.coberturaTotalControles = 0;
		}
		this.calcularNivelCobertura(ControlList, ListaControlSinFiltrado);
	}

	calcularNivelCobertura(ControlList: any, ListaControlSinFiltrado: any) {
		//Recorrer losta de los controles
		for (let j = 0; j < ControlList.length; ++j) {
			//Si la cobertura total 0-20%, cobetura = Ausencia de control
			if (ControlList[j].coberturaTotal <= 20) {
				ControlList[j].nivelCobertura = "Ausencia de control";
			}
			//Si la cobertura total 20-40%, cobetura = Bajo
			else if (ControlList[j].coberturaTotal > 20 && ControlList[j].coberturaTotal <= 40) {
				ControlList[j].nivelCobertura = "Bajo";
			}
			//Si la cobertura total 40-60%, cobetura = Medio
			else if (ControlList[j].coberturaTotal > 40 && ControlList[j].coberturaTotal <= 60) {
				ControlList[j].nivelCobertura = "Medio";
			}
			//Si la cobertura total 60-80%, cobetura = Alto
			else if (ControlList[j].coberturaTotal > 60 && ControlList[j].coberturaTotal <= 80) {
				ControlList[j].nivelCobertura = "Alto";
			}
			//Si la cobertura total 80-100%, cobetura = Total
			else if (ControlList[j].coberturaTotal > 80 && ControlList[j].coberturaTotal <= 100) {
				ControlList[j].nivelCobertura = "Total";
			}
		}
		this.calcularGravedadRiesgoResidual(ControlList, ListaControlSinFiltrado);
	}
	calcularGravedadRiesgoResidual(ControlList: any, ListaControlSinFiltrado: any) {
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

	refreshCausaList() {
		this.service.getCausasList().subscribe(datos => {
			this.CausaList = datos;
			console.log("Lista de causas");
			console.log(this.CausaList);
		});
	}

	FilterFn() {
		var filtroPorIdRiesgo = this.filtroPorIdRiesgo;
		var filtroPorDescripcionRiesgo = this.filtroPorDescripcionRiesgo;
		var filtroPorProbabilidadRiesgo = this.filtroPorProbabilidadRiesgo;
		var filtroPorControl = this.filtroPorIdControl;
		var filtroPorDescripcionControl = this.filtroPorDescripcionControl;

		this.RiesgoList = this.ListaRiesgosSinFiltrado.filter(function (el: any) {
			return el.idRiesgo.toString().toLowerCase().includes(
				filtroPorIdRiesgo.toString().trim().toLowerCase()
			) &&
				el.descripcion.toString().toLowerCase().includes(
					filtroPorDescripcionRiesgo.toString().trim().toLowerCase()
				) &&
				el.probabilidad.toString().toLowerCase().includes(
					filtroPorProbabilidadRiesgo.toString().trim().toLowerCase()
				)
		});
		this.ControlList = this.ListaControlSinFiltrado.filter(function (el: any) {
			return el.idControl.toString().toLowerCase().includes(
				filtroPorControl.toString().trim().toLowerCase()
			) &&
				el.descripcion.toString().toLowerCase().includes(
					filtroPorDescripcionControl.toString().trim().toLowerCase()
				)
		});
	}

	sortResult(prop: any, asc: any) {
		this.RiesgoList = this.ListaRiesgosSinFiltrado.sort(function (a: any, b: any) {
			if (asc) {
				return (a[prop] > b[prop]) ? 1 : ((a[prop] < b[prop]) ? -1 : 0);
			} else {
				return (b[prop] > a[prop]) ? 1 : ((b[prop] < a[prop]) ? -1 : 0);
			}
		})
	}
	sortResultControl(prop: any, asc: any) {
		this.ControlList = this.ListaControlSinFiltrado.sort(function (a: any, b: any) {
			if (asc) {
				return (a[prop] > b[prop]) ? 1 : ((a[prop] < b[prop]) ? -1 : 0);
			} else {
				return (b[prop] > a[prop]) ? 1 : ((b[prop] < a[prop]) ? -1 : 0);
			}
		})
	}

}
