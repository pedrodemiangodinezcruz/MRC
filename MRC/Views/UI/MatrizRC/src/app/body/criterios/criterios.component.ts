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
	Id: number | undefined;
	financieroCatastrofico: string | undefined;
	financieroCritico: string | undefined;
	financieroImportante: string | undefined;
	financieroDebil: string | undefined;
	financieroMarginal: string | undefined;
	cumplimientoCatastrofico: string | undefined;
	cumplimientoCritico: string | undefined;
	cumplimientoImportante: string | undefined;
	cumplimientoDebil: string | undefined;
	cumplimientoMarginal: string | undefined;
	operacionalCatastrofico: string | undefined;
	operacionalCritico: string | undefined;
	operacionalImportante: string | undefined;
	operacionalDebil: string | undefined;
	operacionalMarginal: string | undefined;

	ngOnInit(): void {
		this.refreshCriteriosList();
		this.Id = this.criterio.Id;
		this.financieroCatastrofico = this.criterio.financieroCatastrofico;
		this.financieroCritico = this.criterio.financieroCritico;
		this.financieroImportante = this.criterio.financieroImportante;
		this.financieroDebil = this.criterio.financieroDebil;
		this.financieroMarginal = this.criterio.financieroMarginal;
		this.cumplimientoCatastrofico = this.criterio.cumplimientoCatastrofico;
		this.cumplimientoCritico = this.criterio.cumplimientoCritico;
		this.cumplimientoImportante = this.criterio.cumplimientoImportante;
		this.cumplimientoDebil = this.criterio.cumplimientoDebil;
		this.cumplimientoMarginal = this.criterio.cumplimientoMarginal;
		this.operacionalCatastrofico = this.criterio.operacionalCatastrofico;
		this.operacionalCritico = this.criterio.operacionalCritico;
		this.operacionalImportante = this.criterio.operacionalImportante;
		this.operacionalDebil = this.criterio.operacionalDebil;
		this.operacionalMarginal = this.criterio.operacionalMarginal;
	}

	closeClick() {
		this.ActivarEdicionCriterio = !this.ActivarEdicionCriterio;
		this.refreshCriteriosList();
	}
	editClick(item: any) {
		this.criterio = item;
		this.ActivarEdicionCriterio = true;
		console.log(item.Id)
	}
	
	refreshCriteriosList() {
		this.service.getCriteriosList().subscribe(datos => {
			this.CriteriosList = datos;
			console.log("Lista de criterios");
			console.log(this.CriteriosList);
		});
	}
}
