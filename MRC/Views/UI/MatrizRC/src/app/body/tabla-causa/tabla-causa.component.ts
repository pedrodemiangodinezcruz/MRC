import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit, Input } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

@Component({
	selector: 'app-tabla-causa',
	templateUrl: './tabla-causa.component.html',
	styleUrls: ['./tabla-causa.component.css']
})
export class TablaCausaComponent implements OnInit {

	constructor(private service: SharedService) { }
	@Input() causa: any;
	CausasList: any = [];
	RiesgoList: any = [];
	ControlList: any = [];
	ActivarAltaControl: boolean = false;
	ActivarEdicionControl: boolean = false;
	Anadir: number = 0;
	Id: string | undefined;
	idRiesgoAsociado: string | undefined;
	idRiesgoAsociado2: string | undefined;
	idRiesgoAsociado3: string | undefined;
	idRiesgoAsociado4: string | undefined;
	idRiesgoAsociado5: string | undefined;
	idRiesgoAsociado6: string | undefined;
	idRiesgoAsociado7: string | undefined;
	idRiesgoAsociado8: string | undefined;
	idRiesgoAsociado9: string | undefined;
	idRiesgoAsociado10: string | undefined;
	idControlAsociado: string | undefined;
	descripcion: string | undefined;
	nuevoRiesgo:  number = 0;

	ngOnInit(): void {
		this.refreshRiesgoList();
		this.refreshCausasList();
		this.refreshControlList();
		this.Id = this.causa.Id;
		this.idRiesgoAsociado = this.causa.idRiesgoAsociado;
		this.idRiesgoAsociado2 = this.causa.idRiesgoAsociado2;
		this.idRiesgoAsociado3 = this.causa.idRiesgoAsociado3;
		this.idRiesgoAsociado4 = this.causa.idRiesgoAsociado4;
		this.idRiesgoAsociado5 = this.causa.idRiesgoAsociado5;
		this.idRiesgoAsociado6 = this.causa.idRiesgoAsociado6;
		this.idRiesgoAsociado7 = this.causa.idRiesgoAsociado7;
		this.idRiesgoAsociado8 = this.causa.idRiesgoAsociado8;
		this.idRiesgoAsociado9 = this.causa.idRiesgoAsociado9;
		this.idRiesgoAsociado10 = this.causa.idRiesgoAsociado10;
		this.idControlAsociado = this.causa.idControlAsociado;
		this.descripcion = this.causa.descripcion;
		//console.log(this.causa.Id);
		//this.numRiesgos = this.refreshRiesgoList();
		//console.log("Total riesgos" + this.numRiesgos)

	}

	desplegarNuevoRiesgo() {
		this.nuevoRiesgo = this.nuevoRiesgo+1;
	}

	closeClick() {
		this.ActivarEdicionControl = !this.ActivarEdicionControl;
		this.refreshCausasList();
	}

	anadirCausa() {
		var val = {
			Id: this.Id,
		idRiesgoAsociado: this.idRiesgoAsociado,
		idRiesgoAsociado2: this.idRiesgoAsociado2,
		idRiesgoAsociado3: this.idRiesgoAsociado3,
		idRiesgoAsociado4: this.idRiesgoAsociado4,
		idRiesgoAsociado5: this.idRiesgoAsociado5,
		idRiesgoAsociado6: this.idRiesgoAsociado6,
		idRiesgoAsociado7: this.idRiesgoAsociado7,
		idRiesgoAsociado8: this.idRiesgoAsociado8,
		idRiesgoAsociado9: this.idRiesgoAsociado9,
		idRiesgoAsociado10: this.idRiesgoAsociado10,
		idControlAsociado: this.idControlAsociado,
		descripcion: this.descripcion,
		};
		this.service.anadirCausa(val).subscribe(res => {
			//console.log(res.toString());
			console.log(val);
		});
	}

	updateCausa() {
		var val = {
			Id: this.Id,
			idRiesgoAsociado: this.idRiesgoAsociado,
			idControlAsociado: this.idControlAsociado,
			idControlAsociado2: this.idControlAsociado,
			idControlAsociado3: this.idControlAsociado,
			idControlAsociado4: this.idControlAsociado,
			idControlAsociado5: this.idControlAsociado,
			idControlAsociado6: this.idControlAsociado,
			idControlAsociado7: this.idControlAsociado,
			idControlAsociado8: this.idControlAsociado,
			idControlAsociado9: this.idControlAsociado,
			idControlAsociado10: this.idControlAsociado,
			descripcion: this.descripcion
		};
		console.log(this.Id);
		console.log("Id a cambiar: " + this.Id);
		console.log(val);
		this.service.editarCausa(val).subscribe(res => {
			//alert(res.toString());
		});
		this.refreshCausasList();
	}

	refreshCausasList() {
		this.service.getCausasList().subscribe(datos => {
			this.CausasList = datos;
			console.log("Lista de causas");
			console.log(this.CausasList);
		});
	}
	refreshRiesgoList(): any {
		this.service.getRiesgoList().subscribe(dato => {
			this.RiesgoList = dato;
			console.log("Num de riesgos: " + this.RiesgoList.length);
			return this.RiesgoList.length;
		});
	}
	refreshControlList() {
		this.service.getControlesList().subscribe(data => {
			this.ControlList = data;
			console.log("Lista de controles");
			console.log(this.ControlList);
		});
	}

}
