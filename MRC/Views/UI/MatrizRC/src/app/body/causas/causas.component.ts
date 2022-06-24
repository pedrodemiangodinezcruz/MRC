import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import { Subject } from 'rxjs';

@Component({
	selector: 'app-causas',
	templateUrl: './causas.component.html',
	styleUrls: ['./causas.component.css']
})
export class CausasComponent implements OnInit, OnDestroy {
	dtOptions: DataTables.Settings = {};
	ocultarBoton: boolean = true;
	mostarBoton: boolean = false;
	contenteditable = false;
	dtTrigger: Subject<any> = new Subject<any>();

	editarCausa() {
		this.ocultarBoton = !this.ocultarBoton;
		this.mostarBoton = !this.mostarBoton;
		this.contenteditable = !this.contenteditable;

	}

	constructor(private service: SharedService) { }
	CausasList: any = [];
	ListaCausaSinFiltrado: any = [];
	causa: any;
	ActivarAltaCausa: boolean = false;
	ActivarEdicionCausa: boolean = false;
	Id: string | undefined;
	filtroPorIdRiesgosAsociados: string = "";
	filtroPorDescripcionCausa: string = "";
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



	ngOnInit(): void {
		this.refreshCausasList();
		/*this.dtOptions = {
			pagingType: 'full_numbers',
			pageLength: 2
		};
			this.service.getRiesgoList().subscribe(data => {
			this.CausasList = data;
			this.dtTrigger.next({});
			console.log("Valores: " + data);
		});*/
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

	}
	ngOnDestroy(): void {
		this.dtTrigger.unsubscribe();
	}
	addClick() {
		this.ActivarAltaCausa = true;
		this.causa = {
			Anadir: 0,
			Id: "",
			idRiesgoAsociado: "",
			idControlAsociado: "",
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
			this.ListaCausaSinFiltrado = datos;
			console.log("Lista de causas");
			console.log(this.CausasList);
		});
	}
	FilterFn() {
		var filtroPorIdRiesgosAsociados = this.filtroPorIdRiesgosAsociados;
		var filtroPorDescripcionCausa = this.filtroPorDescripcionCausa;

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
				&&
				el.descripcion.toString().toLowerCase().includes(
					filtroPorDescripcionCausa.toString().trim().toLowerCase()
				)
		});
	}

}
