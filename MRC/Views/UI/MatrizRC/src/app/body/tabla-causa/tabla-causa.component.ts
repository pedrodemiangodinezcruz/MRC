import { Component, OnInit, Input } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

@Component({
	selector: 'app-tabla-causa',
	templateUrl: './tabla-causa.component.html',
	styleUrls: ['./tabla-causa.component.css']
})
export class TablaCausaComponent implements OnInit {

	myScriptElement: HTMLScriptElement;
	ocultarBoton: boolean = true;
	mostarBoton: boolean = false;
	contenteditable = false;

	editarCausa() {
		this.ocultarBoton = !this.ocultarBoton;
		this.mostarBoton = !this.mostarBoton;
		this.contenteditable = !this.contenteditable;

	}

	constructor(private service: SharedService) {
		this.myScriptElement = document.createElement('script');
		this.myScriptElement.src = '../../assets/js/matriz.js';
		document.body.appendChild(this.myScriptElement);


	}
	CausasList: any = [];
	RiesgoList: any = [];
	@Input() causa:any;
	ActivarAltaControl: boolean = false;
	ActivarEdicionControl: boolean = false;
	Id: string | undefined;
	idRiesgoAsociado: string | undefined;
	descripcion: string | undefined;



	ngOnInit(): void {
		this.refreshRiesgoList();
		this.refreshCausasList();
		this.Id = this.causa.Id;
		this.idRiesgoAsociado = this.causa.idRiesgoAsociado;
		this.descripcion = this.causa.descripcion;
		console.log(this.causa.Id);

	}

	addClick() {
		this.ActivarAltaControl = true;
		this.causa = {
			Anadir: 0,
			Id: "",
			idRiesgoAsociado: "",
			descripcion: ""
		}
	}
	closeClick() {
		this.ActivarEdicionControl = !this.ActivarEdicionControl;
		this.refreshCausasList();
	}


	editClick(item: any) {
		this.causa = item;
		this.ActivarEdicionControl = true;
		console.log(item.idControl)

	}

	anadirCausa() {
		var val = {
			Id: this.Id,
			idRiesgoAsociado: this.idRiesgoAsociado,
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
		  idRiesgoAsociado : this.idRiesgoAsociado,
		  descripcion : this.descripcion
		};
		console.log(this.Id);
		console.log("Id a cambiar: " + this.Id);
		console.log(val);
		this.service.editarCausa(val).subscribe(res => {
			//alert(res.toString());
			//Aqui esta iba comentada
		});
		this.refreshCausasList();
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
	refreshRiesgoList() {
		this.service.getRiesgoList().subscribe(data => {
			this.RiesgoList = data;
			console.log("Lista de riesgos");
			console.log(this.RiesgoList);
		});
	}



}
