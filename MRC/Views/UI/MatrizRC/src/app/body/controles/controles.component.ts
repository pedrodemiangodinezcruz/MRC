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


	ngOnInit(): void {
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
		};
		this.service.anadirControl(val).subscribe(res => {
			//alert(res.toString());
			//console.log(res.toString());
		});
	}


	eliminarControl(item: any) {
		console.log(item);
		console.log("ID BD del control a eliminar " + item.Id);
		this.service.borrarRiesgo(item.Id).subscribe(data => {
			alert(data.toString());
			this.refreshControlList();
		})
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
		this.calcularCalificacionControl(ControlList , ListaControlSinFiltrado);
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
		//console.log("Lista de controles despues de calcular la calificación del control: ");
		//console.log(ControlList);
		this.calcularCoberturaPonderadaPorControl(ControlList , ListaControlSinFiltrado);
	}

	calcularCoberturaPonderadaPorControl(ControlList: any, ListaControlSinFiltrado: any) {
		for (let i = 0; i < ControlList.length; ++i) {
			if (ControlList[i].evaluacionFuncionalidad == 'No efectivo') {
				ControlList[i].coberturaPonderada = (Math.ceil((ControlList[i].calificacionControl * ControlList[i].cobertura * 0.5)/100));
			}
			else  {
				ControlList[i].coberturaPonderada = (Math.ceil((ControlList[i].calificacionControl * ControlList[i].cobertura)/100));
			}
		}
		//console.log("Lista de controles despues de calcular coberturaPonderada: ");
		//console.log(ControlList);
		this.calcularCoberturaTotalControles(ControlList, ListaControlSinFiltrado);
	}
	calcularCoberturaTotalControles(ControlList: any, ListaControlSinFiltrado: any) {
		for (let i = 0; i < ControlList.length; ++i) {
				ControlList[i].coberturaTotal = ControlList[i].coberturaPonderada;
		//console.log("Lista de controles despues de calcular coberturaPonderada: ");
		//console.log(ControlList);
	}
}


	//Funcion para filtrar los controles
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
	//Funcion para ordenar los controles
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
