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
	idControlAsociado2: string | undefined;
	idControlAsociado3: string | undefined;
	idControlAsociado4: string | undefined;
	idControlAsociado5: string | undefined;
	idControlAsociado6: string | undefined;
	idControlAsociado7: string | undefined;
	idControlAsociado8: string | undefined;
	idControlAsociado9: string | undefined;
	idControlAsociado10: string | undefined;
	descripcion: string | undefined;
	estadoActivo: string | undefined;
	nuevoRiesgo:  number = 0;
	nuevoControl:  number = 0;

	ngOnInit(): void {
		//Refrescar la lista de causas, riesgos y controles cada que se iniciene la pagina
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
		this.idControlAsociado2 = this.causa.idControlAsociado2;
		this.idControlAsociado3 = this.causa.idControlAsociado3;
		this.idControlAsociado4 = this.causa.idControlAsociado4;
		this.idControlAsociado5 = this.causa.idControlAsociado5;
		this.idControlAsociado6 = this.causa.idControlAsociado6;
		this.idControlAsociado7 = this.causa.idControlAsociado7;
		this.idControlAsociado8 = this.causa.idControlAsociado8;
		this.idControlAsociado9 = this.causa.idControlAsociado9;
		this.idControlAsociado10 = this.causa.idControlAsociado10;
		this.descripcion = this.causa.descripcion;
		this.estadoActivo = this.causa.estadoActivo;
	}

	desplegarNuevoRiesgo() {
		this.nuevoRiesgo = this.nuevoRiesgo+1;
	}
	desplegarNuevoControl() {
		this.nuevoControl = this.nuevoControl+1;
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
		idControlAsociado2: this.idControlAsociado2,
		idControlAsociado3: this.idControlAsociado3,
		idControlAsociado4: this.idControlAsociado4,
		idControlAsociado5: this.idControlAsociado5,
		idControlAsociado6: this.idControlAsociado6,
		idControlAsociado7: this.idControlAsociado7,
		idControlAsociado8: this.idControlAsociado8,
		idControlAsociado9: this.idControlAsociado9,
		idControlAsociado10: this.idControlAsociado10,
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
			idControlAsociado2: this.idControlAsociado2,
			idControlAsociado3: this.idControlAsociado3,
			idControlAsociado4: this.idControlAsociado4,
			idControlAsociado5: this.idControlAsociado5,
			idControlAsociado6: this.idControlAsociado6,
			idControlAsociado7: this.idControlAsociado7,
			idControlAsociado8: this.idControlAsociado8,
			idControlAsociado9: this.idControlAsociado9,
			idControlAsociado10: this.idControlAsociado10,
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
