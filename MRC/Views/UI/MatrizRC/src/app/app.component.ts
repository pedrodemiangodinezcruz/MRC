import { Component, OnInit, Input } from '@angular/core';;
import * as Highcharts from 'highcharts';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'MatrizRC';
 
  constructor(private service:SharedService) {}

  @Input() riesgo:any;
  //riesgo:any;
  ActivarAltaRiesgo: boolean = false;
  macroProceso: string | undefined;
  proceso: string | undefined;
  subproceso: string | undefined;
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
	this.macroProceso = this.macroProceso;
	this.proceso = this.proceso;
	this.subproceso = this.subproceso;
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
	console.log(this.impacto);

}
  addClick() {
	this.ActivarAltaRiesgo = true;
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
		probabilidad: 0,
		impacto: ""
	}
}
anadirRiesgo() {
	var val = {
		idRiesgo: this.riesgo.idRiesgo,
		macroProceso: this.riesgo.macroProceso,
		proceso: this.riesgo.proceso,
		descripcion: this.riesgo.descripcion,
		causa: this.riesgo.causa,
		consecuencia: this.riesgo.consecuencia,
		tipoEvento: this.riesgo.tipoEvento,
		tipoRiesgo: this.riesgo.tipoRiesgo,
		iff: this.riesgo.iff,
		icc: this.riesgo.icc,
		ios: this.riesgo.ios,
		riesgoFraude: this.riesgo.riesgoFraude,
		probabilidad: this.riesgo.probabilidad,
		impacto: this.riesgo.impacto
	};
	this.service.anadirRiesgo(val).subscribe(res => {
		alert(res.toString());
	});
}

}
