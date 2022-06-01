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
	idControlAsociado: string | undefined;
	descripcion: string | undefined;



	ngOnInit(): void {
		this.refreshRiesgoList();
		this.refreshCausasList();
		this.refreshControlList();
		this.Id = this.causa.Id;
		this.idRiesgoAsociado = this.causa.idRiesgoAsociado;
		this.idControlAsociado = this.causa.idControlAsociado;
		this.descripcion = this.causa.descripcion;
		//console.log(this.causa.Id);

	}


	closeClick() {
		this.ActivarEdicionControl = !this.ActivarEdicionControl;
		this.refreshCausasList();
	}

	anadirCausa() {
		var val = {
			Id: this.Id,
		idRiesgoAsociado: this.idRiesgoAsociado,
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
	refreshRiesgoList() {
		this.service.getRiesgoList().subscribe(dato => {
			this.RiesgoList = dato;
			console.log("Lista de riesgos");
			console.log(this.RiesgoList);
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
