import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

@Component({
	selector: 'app-criterios-definicion',
	templateUrl: './criterios-definicion.component.html',
	styleUrls: ['./criterios-definicion.component.css']
})
export class CriteriosDefinicionComponent implements OnInit {

	constructor(private service: SharedService) { }
	CriteriosList: any = [];
	criterio: any;
	ActivarAltaCriterio: boolean = false;
	ActivarEdicionCriterio: boolean = false;
	finacieroCatastrofico: string = "";
	finacieroCritico: string = "";
	finacieroImportante: string = "";
	finacieroDebil: string = "";
	finacieroMarginal: string = "";
	cumplimientoCatastrofico: string = "";
	cumplimientoCritico: string = "";
	cumplimientoImportante: string = "";
	cumplimientoDebil: string = "";
	cumplimientoMarginal: string = "";
	operacionalCatastrofico: string = "";
	operacionalCritico: string = "";
	operacionalImportante: string = "";
	operacionalDebil: string = "";
	operacionalMarginal: string = "";
	ngOnInit(): void {
		this.refreshCriteriosList();
		this.finacieroCatastrofico = this.finacieroCatastrofico;
		this.finacieroCritico = this.finacieroCritico;
		this.finacieroImportante = this.finacieroImportante;
		this.finacieroDebil = this.finacieroDebil;
		this.finacieroMarginal = this.finacieroMarginal;
		this.cumplimientoCatastrofico = this.cumplimientoCatastrofico;
		this.cumplimientoCritico = this.cumplimientoCritico;
		this.cumplimientoImportante = this.cumplimientoImportante;
		this.cumplimientoDebil = this.cumplimientoDebil;
		this.cumplimientoMarginal = this.cumplimientoMarginal;
		this.operacionalCatastrofico = this.operacionalCatastrofico;
		this.operacionalCritico = this.operacionalCritico;
		this.operacionalImportante = this.operacionalImportante;
		this.operacionalDebil = this.operacionalDebil;
		this.operacionalMarginal = this.operacionalMarginal;
	}

	addClick() {
		this.ActivarAltaCriterio = true;
		this.criterio = {
			Anadir: 0,
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
		this.ActivarEdicionCriterio = !this.ActivarEdicionCriterio;
		this.refreshCriteriosList();
	}
	editClick(item: any) {
		this.criterio = item;
		this.ActivarAltaCriterio = true;
	}

	anadirCriterio() {
		var val = {
			finacieroCatastrofico: this.finacieroCatastrofico,
			finacieroCritico: this.finacieroCritico,
			finacieroImportante: this.finacieroImportante,
			finacieroDebil:  this.finacieroDebil,
			finacieroMarginal: this.finacieroMarginal,
			cumplimientoCatastrofico:  this.cumplimientoCatastrofico,
			cumplimientoCritico:  this.cumplimientoCritico,
			cumplimientoImportante:  this.cumplimientoImportante,
			cumplimientoDebil:  this.cumplimientoDebil,
			cumplimientoMarginal:  this.cumplimientoMarginal,
			operacionalCatastrofico:  this.operacionalCatastrofico,
			operacionalCritico:  this.operacionalCritico,
			operacionalImportante:  this.operacionalImportante,
			operacionalDebil:  this.operacionalDebil,
			operacionalMarginal:  this.operacionalMarginal
		};
		this.service.anadirRiesgo(val).subscribe(res => {
			alert(res.toString());
			console.log(res.toString());
		});
	}

	refreshCriteriosList() {
		this.service.getControlesList().subscribe(datos => {
			this.CriteriosList = datos;
			console.log("Lista de criterios");
			console.log(this.CriteriosList);
		});
	}
}

