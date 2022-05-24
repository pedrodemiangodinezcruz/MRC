import { Component, OnInit, Input } from '@angular/core'; import { withLatestFrom } from 'rxjs';
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
	ControlList: any = [];
	riesgo:any;
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


	ngOnInit(): void {
		this.refreshRiesgoList();
		//this.refreshControlList(idRiesgoComp);
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
		console.log(this.riesgo.idRiesgo);
 
	}

	addClick() {
		this.ActivarAltaRiesgo = true;
		this.riesgo = {
			Anadir:0,
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
			impacto: ""
		}
	}
	closeClick() {
		this.ActivarEdicionRiesgo = !this.ActivarEdicionRiesgo;
		this.refreshRiesgoList();
	}
	

	editClick(item: any){
		this.ActivarEdicionRiesgo = true;
		this.riesgo=item;
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
			impacto: this.impacto
		};
		this.service.anadirRiesgo(val).subscribe(res => {
			alert(res.toString());
			console.log(res.toString());
		});
	}

	
	elimarRiesgo(item:any){
		console.log(item);
		console.log("ID BD del riesgo a eliminar " + item.Id);
		this.service.borrarRiesgo(item.Id).subscribe(data => {
			alert(data.toString());
			this.refreshRiesgoList();
		})
	}

	refreshRiesgoList() {
		this.service.getRiesgoList().subscribe(data => {
			this.RiesgoList = data;
			//console.log(this.RiesgoList);
			this.service.getControlesList().subscribe(datos => {
				this.ControlList = datos;
				//console.log(this.ControlList);
			for (let i = 0; i < this.ControlList.length; i++){ 
				//console.log(this.RiesgoList[i].idRiesgo);
				var idRiesgoReferencia = this.RiesgoList[i].idRiesgo;
				if(idRiesgoReferencia == this.ControlList[i].IdRiesgoAsociado){
					console.log(this.ControlList[i].IdRiesgoAsociado);
					console.log("id Riesgo y control IdRiesgoAsociado iguales");
					//this.RiesgoList = data;
					}
					else{
						console.log("No coinciden los riesgos");
						//this.RiesgoList = [];
					}
		}
		});
		});
	}
	refreshControlList() {
		this.service.getControlesList().subscribe(datos => {
			this.ControlList = datos;
			console.log(this.ControlList);
			for (let i = 0; i < this.ControlList.length; i++){ 
				
			}
		});
	}

}
