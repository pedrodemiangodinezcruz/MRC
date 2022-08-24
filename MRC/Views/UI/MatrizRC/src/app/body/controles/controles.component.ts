import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

@Component({
	selector: 'app-controles',
	templateUrl: './controles.component.html',
	styleUrls: ['./controles.component.css']
})
export class ControlesComponent implements OnInit {

	ocultarBoton: boolean = true;
	mostarBoton: boolean = false;
	contenteditable = false;
	esFomulado: boolean = false;


	editarControl() {
		this.ocultarBoton = !this.ocultarBoton;
		this.mostarBoton = !this.mostarBoton;
		this.contenteditable = !this.contenteditable;
		this.esFomulado = !this.esFomulado;

	}
	guardarControl() {
		this.mostarBoton = this.mostarBoton;
	}


	constructor(private service: SharedService) { }

	ControlList: any = [];
	ListaControlSinFiltrado: any = [];
	control: any;
	ActivarAltaControl: boolean = false;
	ActivarEdicionControl: boolean = false;
	filtroPorIdControl: string = "";
	filtroPorDescripcionControl: string = "";
	Id: number = 0;
	macroProceso: string = "";
	proceso: string = "";
	subProceso: string = "";
	valorDiseñoDeControl: number = 0;
	valorCalificacionControl: number = 0;
	idRiesgoAsociado: string | undefined;
	idRiesgoAsociado2: string | undefined;
	idRiesgoAsociado3: string | undefined;
	idRiesgoAsociado4: string | undefined;
	idRiesgoAsociado5: string | undefined;
	idRiesgoAsociado6: string | undefined;
	idRiesgoAsociado7: string | undefined;
	idRiesgoAsociado8: string | undefined;
	idRiesgoAsociado9: string | undefined;
	idRiesgoAsociado10: string | undefined;
	idControl: string | undefined;
	general: string | undefined;
	descripcion: string | undefined;
	evidencia: string | undefined;
	segregacion: string | undefined;
	documentacion: string | undefined;
	tipoControl: string | undefined;
	naturalezaAdecuada: string | undefined;
	naturalezaControl: string | undefined;
	tipoAdecuado: string | undefined;
	frecuenciaControl: string | undefined;
	frecuenciaAdecuada: string | undefined;
	responsable: string | undefined;
	responsabilidadControl: string | undefined;
	generacionEvidencia: string | undefined;
	disenoControl: string | undefined;
	controlClave: string | undefined;
	controlFraude: string | undefined;
	cobertura: number | undefined;
	estrategiaMonitoreo: string | undefined;
	responsableTratamiento: string | undefined;
	descripcionTratamiento: string | undefined;
	evaluacionFuncionalidad: string | undefined;
	calificacionControl: number | undefined;
	coberturaPonderada: number | undefined;
	coberturaTotal: number | undefined;
	nivelCobertura: string | undefined;
	causasAdjuntas: string | undefined;
	observaciones: string | undefined;
	disenoPrueba: string | undefined;
	estadoActivo: string | undefined;


	ngOnInit(): void {
		//Refresar la lista de controles de la BD al incializar el componente
		this.refreshControlList();
		this.Id = this.control.Id;
		this.macroProceso = this.control.macroProceso;
		this.proceso = this.control.proceso;
		this.idRiesgoAsociado = this.control.idRiesgoAsociado;
		this.idRiesgoAsociado2 = this.control.idRiesgoAsociado2;
		this.idRiesgoAsociado3 = this.control.idRiesgoAsociado3;
		this.idRiesgoAsociado4 = this.control.idRiesgoAsociado4;
		this.idRiesgoAsociado5 = this.control.idRiesgoAsociado5;
		this.idRiesgoAsociado6 = this.control.idRiesgoAsociado6;
		this.idRiesgoAsociado7 = this.control.idRiesgoAsociado7;
		this.idRiesgoAsociado8 = this.control.idRiesgoAsociado8;
		this.idRiesgoAsociado9 = this.control.idRiesgoAsociado9;
		this.idRiesgoAsociado10 = this.control.idRiesgoAsociado10;
		this.idControl = this.control.idControl;
		this.general = this.control.general;
		this.descripcion = this.control.descripcion;
		this.evidencia = this.control.evidencia;
		this.segregacion = this.control.segregacion;
		this.documentacion = this.control.documentacion;
		this.tipoControl = this.control.tipoControl;
		this.naturalezaAdecuada = this.control.naturalezaAdecuada;
		this.naturalezaControl = this.control.naturalezaControl;
		this.tipoAdecuado = this.control.tipoAdecuado;
		this.frecuenciaControl = this.control.frecuenciaControl;
		this.frecuenciaAdecuada = this.control.frecuenciaAdecuada;
		this.responsable = this.control.responsable;
		this.responsabilidadControl = this.control.responsabilidadControl;
		this.generacionEvidencia = this.control.generacionEvidencia;
		this.disenoControl = this.control.disenoControl;
		this.controlClave = this.control.controlClave;
		this.controlFraude = this.control.controlFraude;
		this.cobertura = this.control.cobertura;
		this.estrategiaMonitoreo = this.control.estrategiaMonitoreo;
		this.responsableTratamiento = this.control.responsableTratamiento;
		this.descripcionTratamiento = this.control.descripcionTratamiento;
		this.evaluacionFuncionalidad = this.control.evaluacionFuncionalidad;
		this.calificacionControl = this.control.calificacionControl;
		this.coberturaPonderada = this.control.coberturaPonderada;
		this.coberturaTotal = this.control.coberturaTotal;
		this.nivelCobertura = this.control.nivelCobertura;
		this.causasAdjuntas = this.control.causasAdjuntas;
		this.observaciones = this.control.observaciones;
		this.disenoPrueba = this.control.disenoPrueba;
		this.estadoActivo = this.control.estadoActivo;

		console.log(this.control.idControl);

	}


	closeClick() {
		this.ActivarEdicionControl = !this.ActivarEdicionControl;
		this.refreshControlList();
	}


	editClick(item: any) {
		this.control = item;
		this.ActivarEdicionControl = true;
		console.log(item.idControl)

	}

	anadirControl() {
		var val = {
			Id: this.Id,
			macroProceso: this.macroProceso,
			proceso: this.proceso,
			idRiesgoAsociado: this.idRiesgoAsociado,
			idRiesgoAsociado2: this.idRiesgoAsociado2,
			idRiesgoAsociado3: this.idRiesgoAsociado3,
			idRiesgoAsociado4: this.idRiesgoAsociado4,
			idRiesgoAsociado5: this.idRiesgoAsociado5,
			idRiesgoAsociado6: this.idRiesgoAsociado6,
			idRiesgoAsociado7: this.idRiesgoAsociado7,
			idRiesgoAsociado8: this.idRiesgoAsociado8,
			idRiesgoAsociado9: this.idRiesgoAsociado9,
			idRiesgoAsociado10: this.idRiesgoAsociado10,
			idControl: this.idControl,
			general: this.general,
			descripcion: this.descripcion,
			evidencia: this.evidencia,
			segregacion: this.segregacion,
			documentacion: this.documentacion,
			tipoControl: this.tipoControl,
			naturalezaAdecuada: this.naturalezaAdecuada,
			naturalezaControl: this.naturalezaControl,
			tipoAdecuado: this.tipoAdecuado,
			frecuenciaControl: this.frecuenciaControl,
			frecuenciaAdecuada: this.frecuenciaAdecuada,
			responsable: this.responsable,
			responsabilidadControl: this.responsabilidadControl,
			generacionEvidencia: this.generacionEvidencia,
			controlClave: this.controlClave,
			controlFraude: this.controlFraude,
			cobertura: this.cobertura,
			estrategiaMonitoreo: this.estrategiaMonitoreo,
			responsableTratamiento: this.responsableTratamiento,
			descripcionTratamiento: this.descripcionTratamiento,
			evaluacionFuncionalidad: this.evaluacionFuncionalidad,
			calificacionControl: this.calificacionControl,
			coberturaPonderada: this.coberturaPonderada,
			coberturaTotal: this.coberturaTotal,
			nivelCobertura: this.nivelCobertura,
			causasAdjuntas: this.causasAdjuntas,
			observaciones: this.observaciones,
			disenoPrueba: this.disenoPrueba,
			estadoActivo: "Activo"
		};
		this.service.anadirControl(val).subscribe(res => {
			//alert(res.toString());
			//console.log(res.toString());
		});
	}


	eliminarControl(item: any) {
		console.log(item);
		console.log("ID BD del control a eliminar " + item.Id);
		var val = {
			Id: item.Id,
			macroProceso: item.macroProceso,
			proceso: item.proceso,
			idRiesgoAsociado: item.idRiesgoAsociado,
			idRiesgoAsociado2: item.idRiesgoAsociado2,
			idRiesgoAsociado3: item.idRiesgoAsociado3,
			idRiesgoAsociado4: item.idRiesgoAsociado4,
			idRiesgoAsociado5: item.idRiesgoAsociado5,
			idRiesgoAsociado6: item.idRiesgoAsociado6,
			idRiesgoAsociado7: item.idRiesgoAsociado7,
			idRiesgoAsociado8: item.idRiesgoAsociado8,
			idRiesgoAsociado9: item.idRiesgoAsociado9,
			idRiesgoAsociado10: item.idRiesgoAsociado10,
			idControl: "NULL",
			general: item.general,
			descripcion: item.descripcion,
			evidencia: item.evidencia,
			segregacion: item.segregacion,
			documentacion: item.documentacion,
			tipoControl: item.tipoControl,
			naturalezaAdecuada: item.naturalezaAdecuada,
			naturalezaControl: item.naturalezaControl,
			tipoAdecuado: item.tipoAdecuado,
			frecuenciaControl: item.frecuenciaControl,
			frecuenciaAdecuada: item.frecuenciaAdecuada,
			responsable: item.responsable,
			responsabilidadControl: item.responsabilidadControl,
			generacionEvidencia: item.generacionEvidencia,
			controlClave: item.controlClave,
			controlFraude: item.controlFraude,
			cobertura: item.cobertura,
			estrategiaMonitoreo: item.estrategiaMonitoreo,
			responsableTratamiento: item.responsableTratamiento,
			descripcionTratamiento: item.descripcionTratamiento,
			evaluacionFuncionalidad: item.evaluacionFuncionalidad,
			calificacionControl: item.calificacionControl,
			coberturaPonderada: item.coberturaPonderada,
			coberturaTotal: item.coberturaTotal,
			nivelCobertura: item.nivelCobertura,
			causasAdjuntas: item.causasAdjuntas,
			observaciones: item.observaciones,
			disenoPrueba: item.disenoPrueba,
			estadoActivo: "Inactivo"
		};
		console.log(val);
		this.service.editarControl(val).subscribe(res => {
			
		});
	}

	refreshControlList() {
		this.calcularDiseñoControl();
	}

	calcularDiseñoControl() {
		this.service.getControlesList().subscribe(data => {
			this.ControlList = data;
			for (let i = 0; i < this.ControlList.length; ++i) {
				if (this.ControlList[i].evaluacionFuncionalidad == 0) {
					this.ControlList[i].disenoControl = "No se identifico control";
				}
				//Aumentar el valor del Diseño de Control según el valor de la "evaluación de controles"
				else if (this.ControlList[i].segregacion == 'Sí') {
					++this.valorDiseñoDeControl;
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
			//If´s para todos los casos de la estrategia de monitoreo
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
		this.calcularCalificacionControl(ControlList , ListaControlSinFiltrado);
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
			//Switch para sumar todos los casos de la calificación de control
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
		this.calcularCoberturaPonderadaPorControl(ControlList , ListaControlSinFiltrado);
	}

	calcularCoberturaPonderadaPorControl(ControlList: any, ListaControlSinFiltrado: any) {
		for (let i = 0; i < ControlList.length; ++i) {
			if (ControlList[i].evaluacionFuncionalidad == 'No efectivo') {
				ControlList[i].coberturaPonderada = (Math.round((ControlList[i].calificacionControl * ControlList[i].cobertura * 0.5)/100));
			}
			else  {
				ControlList[i].coberturaPonderada = (Math.round((ControlList[i].calificacionControl * ControlList[i].cobertura)/100));
			}
		}
		this.calcularCoberturaTotalControles(ControlList, ListaControlSinFiltrado);
	}
	calcularCoberturaTotalControles(ControlList: any, ListaControlSinFiltrado: any) {
		//Al ser solo UN control, asignar el mismo valor al de la cobertura ponderada
		for (let i = 0; i < ControlList.length; ++i) {
			ControlList[i].coberturaTotal = ControlList[i].coberturaPonderada;
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
		//Print controlList
		console.log("Lista de controles despues todos los calculos: ");
		console.log(ControlList);
	}



	//Funcion para filtrar los controles por descripción
	//Recibe el valor del input y la lista de controles
	//Devuelve la lista de controles filtrada por medio de la descripción del control incluyendo minusculas y mayusculas
	FilterFn() {
		var filtroPorIdControl = this.filtroPorIdControl;
		var filtroPorDescripcionControl = this.filtroPorDescripcionControl;

		this.ControlList = this.ListaControlSinFiltrado.filter(function (el: any) {
			return el.idControl.toString().toLowerCase().includes(
				filtroPorIdControl.toString().trim().toLowerCase()
			) &&
				el.descripcion.toString().toLowerCase().includes(
					filtroPorDescripcionControl.toString().trim().toLowerCase()
				)
		});
	}
	//Funcion para ordenar los controles de formar ascendente o descendente alfabeticamente
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
