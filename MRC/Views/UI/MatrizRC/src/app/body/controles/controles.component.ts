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
	filtroPorIdControl: string="";
	filtroPorDescripcionControl: string="";
	Id: number | undefined;
	macroProceso: string | undefined;
	proceso: string | undefined;
	idRiesgoAsociado: string | undefined;
	idRiesgoAsociado2: string | undefined;
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
	controlClave: string | undefined;
	controlFraude: string | undefined;
	cobertura: string | undefined;
	estrategia: string | undefined;
	responsableTratamiento: string | undefined;
	descripcionTratamiento: string | undefined;
	causasAdjuntas: string | undefined;
	observaciones: string | undefined;


	ngOnInit(): void {
		this.refreshControlList();
		this.Id = this.control.Id;
		this.macroProceso = this.control.macroProceso;
		this.proceso = this.control.proceso;
		this.idRiesgoAsociado = this.control.idRiesgoAsociado;
		this.idRiesgoAsociado2 = this.control.idRiesgoAsociado2;
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
		this.controlClave = this.control.controlClave;
		this.controlFraude = this.control.controlFraude;
		this.cobertura = this.control.cobertura;
		this.estrategia = this.control.estrategia;
		this.responsableTratamiento = this.control.responsableTratamiento;
		this.descripcionTratamiento = this.control.descripcionTratamiento;
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
			estrategia: this.estrategia,
			responsableTratamiento: this.responsableTratamiento,
			descripcionTratamiento: this.descripcionTratamiento,
			causasAdjuntas: this.causasAdjuntas,
			observaciones: this.observaciones,
		};
		this.service.anadirControl(val).subscribe(res => {
			alert(res.toString());
			console.log(res.toString());
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
		this.service.getControlesList().subscribe(datos => {
			this.ControlList = datos;
			this.ListaControlSinFiltrado = datos;
			console.log("Lista de controles");
			console.log(this.ControlList);
		});
	}

	FilterFn(){
		var filtroPorIdControl = this.filtroPorIdControl;
		var filtroPorDescripcionControl = this.filtroPorDescripcionControl;
	
		this.ControlList = this.ListaControlSinFiltrado.filter(function (el:any){
			return el.idControl.toString().toLowerCase().includes(
				filtroPorIdControl.toString().trim().toLowerCase()
			)&&
			el.descripcion.toString().toLowerCase().includes(
				filtroPorDescripcionControl.toString().trim().toLowerCase()
			)
		});
	  }
	
	  sortResultControl(prop:any,asc:any){
		this.ControlList = this.ListaControlSinFiltrado.sort(function(a:any,b:any){
		  if(asc){
			  return (a[prop]>b[prop])?1 : ((a[prop]<b[prop]) ?-1 :0);
		  }else{
			return (b[prop]>a[prop])?1 : ((b[prop]<a[prop]) ?-1 :0);
		  }
		})
	  }

}
