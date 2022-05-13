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
  macroProceso:  string = "";
  proceso:  string = "";
  subproceso:  string = "";
  idRiesgo:  string = "";
  descripcion:  string = "";
  causa:  string = "";
  consecuencia:  string = "";
  tipoEvento:  string = "";
  tipoRiesgo:  string = "";
  iff:  string = "";
  icc:  string = "";
  ios:  string = "";
  riesgoFraude:  string = "";
  probabilidad:  string = "";
  impacto:  string = "";

  ngOnInit(): void {
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
	console.log(this.impacto);
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
		alert("Riesgo Exitoso");
	});
}

}
