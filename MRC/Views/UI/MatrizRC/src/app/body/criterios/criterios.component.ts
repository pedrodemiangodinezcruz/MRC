import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-criterios',
  templateUrl: './criterios.component.html',
  styleUrls: ['./criterios.component.css']
})
export class CriteriosComponent implements OnInit {

  constructor(private service: SharedService) { }

  CriteriosList: any = [];
	criterio: any;
	ActivarAltaCriterio: boolean = false;
	ActivarEdicionCriterio: boolean = false;
	financieroCatastrofico: string = "";
	financieroCritico: string = "";
	financieroImportante: string = "";
	financieroDebil: string = "";
	financieroMarginal: string = "";
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
		this.financieroCatastrofico = this.financieroCatastrofico;
		this.financieroCritico = this.financieroCritico;
		this.financieroImportante = this.financieroImportante;
		this.financieroDebil = this.financieroDebil;
		this.financieroMarginal = this.financieroMarginal;
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
			financieroCatastrofico: this.financieroCatastrofico,
			financieroCritico: this.financieroCritico,
			financieroImportante: this.financieroImportante,
			financieroDebil:  this.financieroDebil,
			financieroMarginal: this.financieroMarginal,
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
		this.service.anadirCriterio(val).subscribe(res => {
			alert(res.toString());
			console.log(res.toString());
		});
	}
	updateCriterio() {
		var val = {
			financieroCatastrofico: this.financieroCatastrofico,
			financieroCritico: this.financieroCritico,
			financieroImportante: this.financieroImportante,
			financieroDebil:  this.financieroDebil,
			financieroMarginal: this.financieroMarginal,
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
		console.log(val);
		this.service.editarCriterio(val).subscribe(res => {
			//alert(res.toString());
		});
		this.refreshCriteriosList();
	}

	refreshCriteriosList() {
		this.service.getCriteriosList().subscribe(datos => {
			this.CriteriosList = datos;
			console.log("Lista de criterios");
			console.log(this.CriteriosList);
		});
	}
}
