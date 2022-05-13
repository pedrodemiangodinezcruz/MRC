import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core'; import { withLatestFrom } from 'rxjs';
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

	constructor(private service: SharedService) {

	}

	RiesgoList: any = [];
	ControlList: any = [];
	@Input() riesgo:any;
	ActivarEdicionRiesgo: boolean = false;
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
		this.refreshControlList();
		this.macroProceso = this.macroProceso;
		this.proceso = this.proceso;
		this.idRiesgo = this.idRiesgo;
		this.descripcion = this.descripcion;
		this.causa = this.causa;
		this.consecuencia = this.consecuencia;
		this.tipoEvento = this.tipoEvento;
		this.tipoRiesgo = this.tipoRiesgo;
		this.iff = this.iff;
		this.icc = this.icc;
		this.ios = this.ios;
		this.riesgoFraude = this.riesgoFraude;
		this.probabilidad = this.probabilidad;
		this.impacto = this.impacto;
 
	}
	addClick() {
		this.riesgo = {
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
			probabilidad: "",
			impacto: ""
		}
	}
	closeClick() {
		this.ActivarEdicionRiesgo = !this.ActivarEdicionRiesgo;
		this.refreshRiesgoList();
	}
	

	editClick(item: any) {
		this.riesgo = item;
		this.ActivarEdicionRiesgo = true;
	}
	updateRiesgo() {
		var val = {
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
		this.service.editarRiesgo(val).subscribe(res => {
			alert(res.toString());
		});
	}

	refreshRiesgoList() {
		this.service.getRiesgoList().subscribe(data => {
			this.RiesgoList = data;
			console.log(this.RiesgoList);
		});
	}
	refreshControlList() {
		this.service.getControlesList().subscribe(datos => {
			this.ControlList = datos;
			console.log(this.ControlList);
		});
	}

}
