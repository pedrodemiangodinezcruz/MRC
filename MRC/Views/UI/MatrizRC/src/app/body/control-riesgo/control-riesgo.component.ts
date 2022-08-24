import { Component, OnInit, Input } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

@Component({
	selector: 'app-control-riesgo',
	templateUrl: './control-riesgo.component.html',
	styleUrls: ['./control-riesgo.component.css']
})
export class ControlRiesgoComponent implements OnInit {
	//Uso de javascript formulario "Para filtrar los procesos, como los suprocesos adyacentes a un macroproceso automaticamente"
	myScriptElement: HTMLScriptElement;
	constructor(private service: SharedService) {
		this.myScriptElement = document.createElement('script');
		this.myScriptElement.src = '../../assets/js/formulario.js';
		document.body.appendChild(this.myScriptElement);
	}
	@Input() control: any;
	ControlList: any = [];
	RiesgoList: any = [];
	Anadir: number = 0;
	Id: number = 0;
	ActivarModal: boolean = false;
	macroProceso: string = "";
	proceso: string = "";
	subProceso: string = "";
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
	nivelCobertura: number | undefined;
	causasAdjuntas: string | undefined;
	observaciones: string | undefined;
	disenoPrueba: string | undefined;
	estadoActivo: string | undefined;
	nuevoRiesgo:  number = 0;
	

	ngOnInit(): void {
		//Refresca la lista de controles y riesgos de la BD
		this.refreshControlList();
		this.refreshRiesgoList();
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

	desplegarNuevoRiesgo() {
		//Aumentar la variable nuevoRiesgo para delimitar el limite de riesgos asociados a un control (Máximo 10)
		this.nuevoRiesgo = this.nuevoRiesgo+1;
	}
	updateControl() {
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
			estadoActivo: this.estadoActivo
		};
		console.log(this.idControl);
		console.log("Id a cambiar" + this.Id);
		console.log(val);
		this.service.editarControl(val).subscribe(res => {
			//alert(res.toString());
			//Aqui esta iba comentada
		});
		this.refreshControlList();
	}

	closeClick() {
		this.ActivarModal = false;
		this.refreshControlList();
		//this.ngOnInit();
	}
	refreshControlList() {
		this.service.getControlesList().subscribe(datos => {
			this.ControlList = datos;
			console.log("Lista de controles");
			console.log(this.ControlList);
		});
	}
	refreshRiesgoList() {
		this.service.getRiesgoList().subscribe(data => {
			this.RiesgoList = data;
			console.log("Lista de riesgos");
			console.log(this.RiesgoList);
		});
	}
}

