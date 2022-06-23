import { HttpClient } from '@angular/common/http';
import { Component, OnInit, OnDestroy, Input, AfterViewInit, ViewChild } from '@angular/core';
import * as Highcharts from 'highcharts';
import { Subject } from 'rxjs';
import { SharedService } from 'src/app/shared.service';
'@angular/platform-browser';
declare const $:any;

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
	@ViewChild('dTable',{static: false}) dataTable: any;
	title = 'MatrizRC';
	dtOptions: DataTables.Settings = {};
	dtTrigger: Subject<any> = new Subject();
	data: any;
	myScriptElement: HTMLScriptElement;
	constructor(private service: SharedService, private httpClient: HttpClient) {
		this.myScriptElement = document.createElement('script');
		this.myScriptElement.src = '/assets/js/formulario.js';
		document.body.appendChild(this.myScriptElement);
	}

	RiesgoList: any = [];
	ControlList: any = [];
	@Input() riesgo: any;
	@Input() control: any;
	@Input() causa: any;
	//riesgo:any;
	ActivarAltaRiesgo: boolean = false;
	ActivarAltaControl: boolean = false;
	ActivarAltaCausa: boolean = false;
	macroProceso: string | undefined;
	proceso: string | undefined;
	subproceso: string | undefined;
	idRiesgo: string | undefined;
	descripcion: string | undefined;
	//causa: string | undefined;
	consecuencia: string | undefined;
	tipoEvento: string | undefined;
	tipoRiesgo: string | undefined;
	iff: string | undefined;
	icc: string | undefined;
	ios: string | undefined;
	riesgoFraude: string | undefined;
	probabilidad: number | undefined;
	impacto: string | undefined;

	ngOnInit(): void {
		this.dtOptions = {
			pagingType: 'full_numbers',
			pageLength: 5,
			language: {
				url: '//cdn.datatables.net/plug-ins/1.12.1/i18n/es-ES.json'
			},
		};
		
		/*this.service.getRiesgoList().subscribe(data => {
			this.RiesgoList = data;
			this.dtTrigger.next(true);
		  });*/
		  this.service.getRiesgoList().subscribe(data => {
			this.RiesgoList = data;
			this.dtTrigger.next();
			console.log("Datos" + data);
		});
		this.refreshRiesgoList();
		this.macroProceso = this.riesgo.macroProceso;
		this.proceso = this.riesgo.proceso;
		this.subproceso = this.riesgo.subproceso;
		this.idRiesgo = this.riesgo.idRiesgo;
		this.descripcion = this.riesgo.descripcion;
		//this.causa = this.riesgo.causa;
		this.consecuencia = this.riesgo.consecuencia;
		this.tipoEvento = this.riesgo.tipoEvento;
		this.tipoRiesgo = this.riesgo.tipoRiesgo;
		this.iff = this.riesgo.iff;
		this.icc = this.riesgo.icc;
		this.ios = this.riesgo.ios;
		this.riesgoFraude = this.riesgo.riesgoFraude;
		this.probabilidad = this.riesgo.probabilidad;
		this.impacto = this.riesgo.impacto;
	}
	/*ngAfterViewInit():void{
		$('#myTable').DataTable();
		$(this.dataTable.nativeElement).DataTable();
	}*/
	ngOnDestroy(): void {
		// Do not forget to unsubscribe the event
		this.dtTrigger.unsubscribe();
	  }

	addClick() {
		this.ActivarAltaRiesgo = true;
		this.riesgo = {
			Anadir: 0,
			macroProceso: "",
			proceso: "",
			idRiesgo: "",
			descripcion: "",
			//causa: "",
			consecuencia: "",
			tipoEvento: "",
			tipoRiesgo: "",
			iff: "",
			icc: "",
			ios: "",
			riesgoFraude: "",
			probabilidad: 0,
			impacto: ""
		}
		console.log(this.riesgo.Anadir)
	}
	addControl() {
		this.ActivarAltaControl = true;
		this.control = {
			Anadir: 0,
		}
		console.log(this.control.Anadir)
	}
	addCausa() {
		this.ActivarAltaCausa = true;
		this.causa = {
			Anadir: 0,
		}
		console.log(this.causa.Anadir)
	}

	anadirRiesgo() {
		var val = {
			idRiesgo: this.idRiesgo,
			macroProceso: this.macroProceso,
			proceso: this.proceso,
			descripcion: this.descripcion,
			causa: this.causa,
			consecuencia: this.consecuencia,
			tipoEvento: this.tipoEvento,
			tipoRiesgo: this.tipoRiesgo,
			iff: this.iff,
			icc: this.icc,
			ios: this.ios,
			riesgoFraude: this.riesgoFraude,
			probabilidad: this.probabilidad,
			impacto: this.impacto
		};
		this.service.anadirRiesgo(val).subscribe(res => {
			alert(res.toString());
			console.log(res.toString());
		});
		


	}
	closeClick() {

		this.refreshRiesgoList();
	}

	refreshRiesgoList() {
		this.service.getRiesgoList().subscribe(data => {
			this.RiesgoList = data;
			console.log(this.RiesgoList);
		});
	}

}
