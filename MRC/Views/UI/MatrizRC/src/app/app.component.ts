import { Component, OnInit, Input } from '@angular/core';;
import * as Highcharts from 'highcharts';
import { SharedService } from 'src/app/shared.service';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';


@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
	dtOptions: DataTables.Settings = {};
	RiesgoList: any = [];
	ControlList: any = [];
	title = 'MatrizRC';
	dtTrigger: Subject<any> = new Subject<any>();


	constructor(private service: SharedService, private httpClient: HttpClient) {
	}
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

	ngOnInit():void {
		
		this.dtOptions = {
			pagingType: 'full_numbers',
			pageLength: 2
		};
		this.service.getRiesgoList().subscribe(data => {
			this.RiesgoList = data;
			// Calling the DT trigger to manually render the table
			this.dtTrigger.next({});
			console.log("Valores: " + data)
		});
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
		this.refreshRiesgoList();
	}
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
		});
	}

}
