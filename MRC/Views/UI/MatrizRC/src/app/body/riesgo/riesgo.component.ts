import { Component, OnInit, Input } from '@angular/core';
import { SharedService } from 'src/app/shared.service';


@Component({
  selector: 'app-riesgo',
  templateUrl: './riesgo.component.html',
  styleUrls: ['./riesgo.component.css']
})
export class RiesgoComponent implements OnInit {


  constructor(private service: SharedService) { }
  @Input() riesgo:any;
  Anadir: number = 0;
  macroProceso:  string = "";
  proceso:  string = "";
  subProceso:  string = "";
  idRiesgo:  string = "";
  descripcion:  string = "";
  causa:  string = "";
  consecuencia:  string = "";
  tipoEvento:  string = "";
  tipoRiesgo:  string = "";
  iff:  string = "";
  ic:  string = "";
  ios:  string = "";
  riesgoFraude:  string = "";
  probabilidad:  string = "";
  impacto:  string = "";

  ngOnInit(): void {
	this.Anadir = this.riesgo.Anadir;
	this.macroProceso = this.riesgo.macroProceso;
	this.proceso = this.riesgo.proceso;
	this.subProceso = this.riesgo.subProceso;
	this.idRiesgo = this.riesgo.idRiesgo;
	this.descripcion = this.riesgo.descripcion;
	this.causa = this.riesgo.causa;
	this.consecuencia = this.riesgo.consecuencia;
	this.tipoEvento = this.riesgo.tipoEvento;
	this.tipoRiesgo = this.riesgo.tipoRiesgo;
	this.iff = this.riesgo.iff;
	this.ic = this.riesgo.ic;
	this.ios = this.riesgo.ios;
	this.riesgoFraude = this.riesgo.riesgoFraude;
	this.probabilidad = this.riesgo.probabilidad;
	this.impacto = this.riesgo.impacto;
	console.log(this.idRiesgo);
  }

 anadirRiesgo() {
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
		ic: this.ic,
		ios: this.ios,
		riesgoFraude: this.riesgoFraude,
		probabilidad: this.probabilidad,
		impacto: this.impacto
	};
	console.log(this.idRiesgo);
	console.log(val);
	this.service.anadirRiesgo(val).subscribe(res => {
		alert(res.toString());
	});
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
		icc: this.ic,
		ios: this.ios,
		riesgoFraude: this.riesgoFraude,
		probabilidad: this.probabilidad,
		impacto: this.impacto
	};
	console.log(this.idRiesgo);
	console.log(val);
	this.service.editarRiesgo(val).subscribe(res => {
		alert(res.toString());
	});
}
}
