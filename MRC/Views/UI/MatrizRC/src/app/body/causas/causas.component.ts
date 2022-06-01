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
	causa: any;
	ActivarAltaCausa: boolean = false;
	ActivarEdicionCausa: boolean = false;
	Id: string | undefined;
	IdRiesgoAsociado: string | undefined;
	IdControlAsociado: string | undefined;
	descripcion: string | undefined;



	ngOnInit(): void {
		this.refreshCausasList();
		this.Id = this.causa.Id;
		this.IdRiesgoAsociado = this.causa.IdRiesgoAsociado;
		this.IdControlAsociado = this.causa.IdControlAsociado;
		this.descripcion = this.causa.descripcion;
	}

	addClick() {
		this.ActivarAltaCausa = true;
		this.causa = {
			Anadir: 0,
			Id: "",
			IdRiesgoAsociado: "",
			IdControlAsociado: "",
			descripcion: ""
		}
	}
	closeClick() {
		this.ActivarEdicionCausa = !this.ActivarEdicionCausa;
		this.refreshCausasList();
	}


	editClick(item: any) {
		this.causa = item;
		this.ActivarEdicionCausa = true;
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
