import { Component, OnInit, Input } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

@Component({
	selector: 'app-criterios-definicion',
	templateUrl: './criterios-definicion.component.html',
	styleUrls: ['./criterios-definicion.component.css']
})
export class CriteriosDefinicionComponent implements OnInit {

	constructor(private service: SharedService) { }
	
	@Input() criterio: any;
	CriteriosList: any = [];
	Id: number = 0;
	Anadir: number = 0;
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
		//Refrescar la lista de criterios cada vez que se carga la página
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


	
	updateCriterio() {
		var val = {
			Id: this.Id,
			financieroCatastrofico: this.financieroCatastrofico,
			financieroCritico: this.financieroCritico,
			financieroImportante: this.financieroImportante,
			financieroDebil: this.financieroDebil,
			financieroMarginal: this.financieroMarginal,
			cumplimientoCatastrofico: this.cumplimientoCatastrofico,
			cumplimientoCritico: this.cumplimientoCritico,
			cumplimientoImportante: this.cumplimientoImportante,
			cumplimientoDebil: this.cumplimientoDebil,
			cumplimientoMarginal: this.cumplimientoMarginal,
			operacionalCatastrofico: this.operacionalCatastrofico,
			operacionalCritico: this.operacionalCritico,
			operacionalImportante: this.operacionalImportante,
			operacionalDebil: this.operacionalDebil,
			operacionalMarginal: this.operacionalMarginal
		};
		console.log("Id a cambiar: " + this.Id);
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

