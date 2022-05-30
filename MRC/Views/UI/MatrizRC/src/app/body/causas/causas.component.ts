import { Component, OnInit, Input } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

@Component({
	selector: 'app-causas',
	templateUrl: './causas.component.html',
	styleUrls: ['./causas.component.css']
})
export class CausasComponent implements OnInit {

	ocultarBoton: boolean = true;
	mostarBoton: boolean = false;
	contenteditable = false;

	editarCausa() {
		this.ocultarBoton = !this.ocultarBoton;
		this.mostarBoton = !this.mostarBoton;
		this.contenteditable = !this.contenteditable;

	}

	constructor(private service: SharedService) { }
	CausasList: any = [];
	RiesgoList: any = [];
	causa: any;
	ActivarAltaCausa: boolean = false;
	ActivarEdicionCausa: boolean = false;
	Id: string | undefined;
	idRiesgoAsociado: string | undefined;
	descripcion: string | undefined;



	ngOnInit(): void {
		this.refreshCausasList();
		this.Id = this.causa.Id;
		this.idRiesgoAsociado = this.causa.idRiesgoAsociado;
		this.descripcion = this.causa.descripcion;
	}

	addClick() {
		this.ActivarAltaCausa = true;
		this.causa = {
			Anadir: 0,
			Id: "",
			idRiesgoAsociado: "",
			descripcion: ""
		}
	}
	closeClick() {
		this.ActivarEdicionCausa = !this.ActivarEdicionCausa;
		this.refreshCausasList();
	}


	editClick(item: any) {
		this.causa = item;
		//this.ActivarEdicionCausa = true;
		console.log(item.descripcion)
		console.log(item.IdRiesgoAsociado)

	}
	

	anadirCausa() {
		var val = {
			Id: this.Id,
			idRiesgoAsociado: this.idRiesgoAsociado,
			descripcion: this.descripcion,
		};
		this.service.anadirCausa(val).subscribe(res => {
			alert(res.toString());
		});
	}
	
	eliminarCausa(item: any) {
		console.log(item);
		console.log("ID BD del causa a eliminar " + item.Id);
		this.service.borrarCausa(item.Id).subscribe(data => {
			alert(data.toString());
			this.refreshCausasList();
		})
	}

	refreshCausasList() {
		this.service.getCausasList().subscribe(datos => {
			this.CausasList = datos;
			console.log("Lista de causas");
			console.log(this.CausasList);
		});
	}

}
