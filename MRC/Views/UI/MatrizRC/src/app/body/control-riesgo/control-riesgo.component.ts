import { Component, OnInit, Input } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-control-riesgo',
  templateUrl: './control-riesgo.component.html',
  styleUrls: ['./control-riesgo.component.css']
})
export class ControlRiesgoComponent implements OnInit {

	constructor(private service: SharedService) { }
	@Input() control:any;
	ControlList: any = [];
	RiesgoList: any = [];
	Anadir: number = 0;
	Id: number = 0;
	ActivarModal: boolean = false;
	macroProceso:  string = "";
	proceso:  string = "";
	subProceso:  string = "";
	idRiesgoAsociado: string | undefined;
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
		this.refreshRiesgoList();
		this.Id = this.control.Id;
		this.macroProceso = this.control.macroProceso;
		this.proceso = this.control.proceso;
		this.idRiesgoAsociado = this.control.idRiesgoAsociado;
		this.idControl= this.control.idControl;
		this.general= this.control.general;
		this.descripcion= this.control.descripcion;
		this.evidencia= this.control.evidencia;
		this.segregacion= this.control.segregacion;
		this.documentacion= this.control.documentacion;
		this.tipoControl= this.control.tipoControl;
		this.naturalezaAdecuada = this.control.naturalezaAdecuada;
		this.naturalezaControl= this.control.naturalezaControl;
		this.tipoAdecuado= this.control.tipoAdecuado;
		this.frecuenciaControl= this.control.frecuenciaControl;
		this.frecuenciaAdecuada= this.control.frecuenciaAdecuada;
		this.responsable= this.control.responsable;
		this.responsabilidadControl= this.control.responsabilidadControl;
		this.generacionEvidencia= this.control.generacionEvidencia;
		this.controlClave= this.control.controlClave;
		this.controlFraude= this.control.controlFraude;
		this.cobertura= this.control.cobertura;
		this.estrategia= this.control.estrategia;
		this.responsableTratamiento= this.control.responsableTratamiento;
		this.descripcionTratamiento= this.control.descripcionTratamiento;
		this.causasAdjuntas= this.control.causasAdjuntas;
		this.observaciones= this.control.observaciones;
	  console.log("Id Riesgo a cambiar" + this.control.idControl);
	  console.log("Id Riesgo BD " + this.control.Id);
	}
  
	anadirControl() {
		var val = {
			Id: this.Id,
		macroProceso : this.macroProceso,
		proceso : this.proceso,
		idRiesgoAsociado : this.idRiesgoAsociado,
		idControl : this.idControl,
		general : this.general,
		descripcion : this.descripcion,
		evidencia : this.evidencia,
		segregacion : this.segregacion,
		documentacion : this.documentacion,
		tipoControl : this.tipoControl,
		naturalezaAdecuada: this.naturalezaAdecuada,
		naturalezaControl : this.naturalezaControl,
		tipoAdecuado: this.tipoAdecuado,
		frecuenciaControl: this.frecuenciaControl,
		frecuenciaAdecuada : this.frecuenciaAdecuada,
		responsable: this.responsable,
		responsabilidadControl: this.responsabilidadControl,
		generacionEvidencia: this.generacionEvidencia,
		controlClave: this.controlClave,
		controlFraude: this.controlFraude,
		cobertura:this.cobertura,
		estrategia: this.estrategia,
		responsableTratamiento: this.responsableTratamiento,
		descripcionTratamiento: this.descripcionTratamiento,
		causasAdjuntas: this.causasAdjuntas,
		observaciones: this.observaciones,
		};
		this.service.anadirControl(val).subscribe(res => {
			//alert(res.toString());
			//console.log(res.toString());
		});
	}

  updateControl() {
	  var val = {
		Id: this.Id,
		macroProceso : this.macroProceso,
		proceso : this.proceso,
		idRiesgoAsociado : this.idRiesgoAsociado,
		idControl : this.idControl,
		general : this.general,
		descripcion : this.descripcion,
		evidencia : this.evidencia,
		segregacion : this.segregacion,
		documentacion : this.documentacion,
		tipoControl : this.tipoControl,
		naturalezaAdecuada: this.naturalezaAdecuada,
		naturalezaControl : this.naturalezaControl,
		tipoAdecuado: this.tipoAdecuado,
		frecuenciaControl: this.frecuenciaControl,
		frecuenciaAdecuada : this.frecuenciaAdecuada,
		responsable: this.responsable,
		responsabilidadControl: this.responsabilidadControl,
		generacionEvidencia: this.generacionEvidencia,
		controlClave: this.controlClave,
		controlFraude: this.controlFraude,
		cobertura:this.cobertura,
		estrategia: this.estrategia,
		responsableTratamiento: this.responsableTratamiento,
		descripcionTratamiento: this.descripcionTratamiento,
		causasAdjuntas: this.causasAdjuntas,
		observaciones: this.observaciones,
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
  
  closeClick(){
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
  
