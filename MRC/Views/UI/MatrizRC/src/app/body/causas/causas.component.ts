import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import { Subject } from 'rxjs';

@Component({
	selector: 'app-causas',
	templateUrl: './causas.component.html',
	styleUrls: ['./causas.component.css']
})
export class CausasComponent implements OnInit {
	dtOptions: DataTables.Settings = {};
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
	ListaCausaSinFiltrado: any = [];
	ControlList: any = [];
	ListaControlesSinFiltrado: any = [];
	causa: any;
	ActivarAltaCausa: boolean = false;
	ActivarEdicionCausa: boolean = false;
	Id: string | undefined;
	filtroPorIdRiesgosAsociados: string = "";
	filtroPorDescripcionCausa: string = "";
	filtroPorIdControlAsociado: string = "";
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



	ngOnInit(): void {
		//Refrescar lista de cuasas y controles de la BD
		this.refreshCausasList();
		this.refreshControlesList();
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
	addClick() {
		this.ActivarAltaCausa = true;
		this.causa = {
			Anadir: 0,
			Id: "",
			idRiesgoAsociado: "",
			idControlAsociado: "",
			descripcion: "",
			estadoActivo: "Activo"
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


	//Refrescar lista de causas de la BD
	eliminarCausa(item: any) {
		console.log("ID BD de la causa a eliminar " + item.Id);
		var val = {
			Id: item.Id,
			idRiesgoAsociado: item.idRiesgoAsociado,
			idRiesgoAsociado2: item.idRiesgoAsociado2,
			idRiesgoAsociado3: item.idRiesgoAsociado3,
			idRiesgoAsociado4: item.idRiesgoAsociado4,
			idRiesgoAsociado5: item.idRiesgoAsociado5,
			idRiesgoAsociado6: item.idRiesgoAsociado6,
			idRiesgoAsociado7: item.idRiesgoAsociado7,
			idRiesgoAsociado8: item.idRiesgoAsociado8,
			idRiesgoAsociado9: item.idRiesgoAsociado9,
			idRiesgoAsociado10: item.idRiesgoAsociado10,
			idControlAsociado: item.idControlAsociado,
			idControlAsociado2: item.idControlAsociado2,
			idControlAsociado3: item.idControlAsociado3,
			idControlAsociado4: item.idControlAsociado4,
			idControlAsociado5: item.idControlAsociado5,
			idControlAsociado6: item.idControlAsociado6,
			idControlAsociado7: item.idControlAsociado7,
			idControlAsociado8: item.idControlAsociado8,
			idControlAsociado9: item.idControlAsociado9,
			idControlAsociado10: item.idControlAsociado10,
			descripcion: item.descripcion,
			estadoActivo: "Inactivo"
		};
		console.log("Id a cambiar: " + item.Id);
		console.log(val);
		this.service.editarCausa(val).subscribe(res => {
			//alert(res.toString());
		});
	}
	//Refrescar lista de causas de la BD
	refreshCausasList() {
		this.service.getCausasList().subscribe(datos => {
			this.CausasList = datos;
			this.ListaCausaSinFiltrado = datos;
			console.log("Lista de causas");
			console.log(this.CausasList);
		});
	}
	refreshControlesList() {
		this.service.getControlesList().subscribe(datos => {
			this.ControlList = datos;
			this.ListaControlesSinFiltrado = datos;
			console.log("Lista de controles");
			console.log(this.ControlList);
		});
	}
	//Metodo para filtrar la lista de las causas por el id del riesgo asociado
	//incluyendo minusculas y mayusculas
	FilterIdRiesgo() {
		var filtroPorIdRiesgosAsociados = this.filtroPorIdRiesgosAsociados;

		this.CausasList = this.ListaCausaSinFiltrado.filter(function (el: any) {
			return el.idRiesgoAsociado.toString().toLowerCase().includes(
				filtroPorIdRiesgosAsociados.toString().trim().toLowerCase()) ||
				el.idRiesgoAsociado2.toString().toLowerCase().includes(
					filtroPorIdRiesgosAsociados.toString().trim().toLowerCase()) ||
				el.idRiesgoAsociado3.toString().toLowerCase().includes(
					filtroPorIdRiesgosAsociados.toString().trim().toLowerCase()) ||
				el.idRiesgoAsociado4.toString().toLowerCase().includes(
					filtroPorIdRiesgosAsociados.toString().trim().toLowerCase()) ||
				el.idRiesgoAsociado5.toString().toLowerCase().includes(
					filtroPorIdRiesgosAsociados.toString().trim().toLowerCase()) ||
				el.idRiesgoAsociado6.toString().toLowerCase().includes(
					filtroPorIdRiesgosAsociados.toString().trim().toLowerCase()) ||
				el.idRiesgoAsociado7.toString().toLowerCase().includes(
					filtroPorIdRiesgosAsociados.toString().trim().toLowerCase()) ||
				el.idRiesgoAsociado8.toString().toLowerCase().includes(
					filtroPorIdRiesgosAsociados.toString().trim().toLowerCase()) ||
				el.idRiesgoAsociado9.toString().toLowerCase().includes(
					filtroPorIdRiesgosAsociados.toString().trim().toLowerCase()) ||
				el.idRiesgoAsociado10.toString().toLowerCase().includes(
					filtroPorIdRiesgosAsociados.toString().trim().toLowerCase())
		});
	}
	//Metodo para filtrar la lista de las causas por el id del control asociado
	//incluyendo minusculas y mayusculas
	FilterIdControl() {
		var filtroPorIdControlAsociado = this.filtroPorIdControlAsociado;

		this.CausasList = this.ListaCausaSinFiltrado.filter(function (el: any) {
			return el.idControlAsociado.toString().toLowerCase().includes(
				filtroPorIdControlAsociado.toString().trim().toLowerCase()) ||
				el.idControlAsociado2.toString().toLowerCase().includes(
					filtroPorIdControlAsociado.toString().trim().toLowerCase()) ||
				el.idControlAsociado3.toString().toLowerCase().includes(
					filtroPorIdControlAsociado.toString().trim().toLowerCase()) ||
				el.idControlAsociado4.toString().toLowerCase().includes(
					filtroPorIdControlAsociado.toString().trim().toLowerCase()) ||
				el.idControlAsociado5.toString().toLowerCase().includes(
					filtroPorIdControlAsociado.toString().trim().toLowerCase()) ||
				el.idControlAsociado6.toString().toLowerCase().includes(
					filtroPorIdControlAsociado.toString().trim().toLowerCase()) ||
				el.idControlAsociado7.toString().toLowerCase().includes(
					filtroPorIdControlAsociado.toString().trim().toLowerCase()) ||
				el.idControlAsociado8.toString().toLowerCase().includes(
					filtroPorIdControlAsociado.toString().trim().toLowerCase()) ||
				el.idControlAsociado9.toString().toLowerCase().includes(
					filtroPorIdControlAsociado.toString().trim().toLowerCase()) ||
				el.idControlAsociado10.toString().toLowerCase().includes(
					filtroPorIdControlAsociado.toString().trim().toLowerCase())
		});
	}
	//Metodo para filtrar la lista de las causas por el nombre de la causa
	//incluyendo minusculas y mayusculas
	FilterDescripcion() {
		var filtroPorDescripcionCausa = this.filtroPorDescripcionCausa;

		this.CausasList = this.ListaCausaSinFiltrado.filter(function (el: any) {
			return  el.descripcion.toString().toLowerCase().includes(
					filtroPorDescripcionCausa.toString().trim().toLowerCase()
				)
		});
	}

}
