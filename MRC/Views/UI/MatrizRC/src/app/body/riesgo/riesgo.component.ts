import { Component, OnInit, Input } from '@angular/core';
import { SharedService } from 'src/app/shared.service';


@Component({
	selector: 'app-riesgo',
	templateUrl: './riesgo.component.html',
	styleUrls: ['./riesgo.component.css']
})
export class RiesgoComponent implements OnInit {
	myScriptElement: HTMLScriptElement;


	constructor(private service: SharedService) { 
		this.myScriptElement = document.createElement('script');
		this.myScriptElement.src = '../..assets/js/selectsProcesos.js';
		document.head.appendChild(this.myScriptElement);
	}
	@Input() riesgo: any;
	@Input() causas: any;
	RiesgoList: any = [];
	CausasList: any = [];
	Anadir: number = 0;
	Id: number = 0;
	ActivarModal: boolean = false;
	macroProceso: string = "";
	proceso: string = "";
	subProceso: string = "";
	idRiesgo: string = "";
	descripcion: string = "";
	causa: string = "";
	consecuencia: string = "";
	tipoEvento: string = "";
	tipoRiesgo: string = "";
	iff: string = "";
	ic: string = "";
	ios: string = "";
	riesgoFraude: string = "";
	probabilidad: string = "";
	impacto: string = "";
	nivelRiesgo: string = "";
	mostarDiv: boolean = false;



	ngOnInit(): void {
		this.refreshRiesgoList();
		this.Id = this.riesgo.Id;
		this.Anadir = this.riesgo.Anadir;
		this.macroProceso = this.riesgo.macroProceso;
		this.proceso = this.riesgo.proceso;
		this.subProceso = this.riesgo.subProceso;
		this.idRiesgo = this.riesgo.idRiesgo;
		this.descripcion = this.riesgo.descripcion;
		this.causa = this.riesgo.causa;
		this.consecuencia = this.riesgo.consecuencia;
		this.tipoEvento = this.riesgo.tipoEvento;
		this.tipoRiesgo = this.riesgo.tipoRiesgo;
		this.iff = this.riesgo.iff;
		this.ic = this.riesgo.ic;
		this.ios = this.riesgo.ios;
		this.riesgoFraude = this.riesgo.riesgoFraude;
		this.probabilidad = this.riesgo.probabilidad;
		this.impacto = this.riesgo.impacto;
		this.nivelRiesgo = this.riesgo.nivelRiesgo;
		console.log("Id Riesgo a cambiar" + this.idRiesgo);
		console.log("Id Riesgo BD " + this.Id);
	}

	desplegarNuevaCausa() {
		this.mostarDiv = !this.mostarDiv;
	}
	anadirRiesgo() {
		var val = {
			idRiesgo: this.idRiesgo,
			macroProceso: this.macroProceso,
			proceso: this.proceso,
			subProceso: this.subProceso,
			descripcion: this.descripcion,
			causa: this.causa,
			consecuencia: this.consecuencia,
			tipoEvento: this.tipoEvento,
			tipoRiesgo: this.tipoRiesgo,
			iff: this.iff,
			ic: this.ic,
			ios: this.ios,
			riesgoFraude: this.riesgoFraude,
			probabilidad: this.probabilidad,
			impacto: this.impacto,
			nivelRiesgo: this.nivelRiesgo
		};
		console.log(this.idRiesgo);
		console.log(val);
		this.service.anadirRiesgo(val).subscribe(res => {
			//alert(res.toString());
		});
	}

	updateRiesgo() {
		var val = {
			Id: this.Id,
			idRiesgo: this.idRiesgo,
			macroProceso: this.macroProceso,
			proceso: this.proceso,
			subProceso: this.subProceso,
			descripcion: this.descripcion,
			causa: this.causa,
			consecuencia: this.consecuencia,
			tipoEvento: this.tipoEvento,
			tipoRiesgo: this.tipoRiesgo,
			iff: this.iff,
			ic: this.ic,
			ios: this.ios,
			riesgoFraude: this.riesgoFraude,
			probabilidad: this.probabilidad,
			impacto: this.impacto,
			nivelRiesgo: this.nivelRiesgo
		};
		console.log(this.idRiesgo);
		console.log("Id a cambiar" + this.Id);
		console.log(val);
		this.service.editarRiesgo(val).subscribe(res => {
			//alert(res.toString());
		});
		this.refreshRiesgoList();
	}



	closeClick() {
		this.ActivarModal = false;
		this.refreshRiesgoList();
		//this.ngOnInit();
	}
	refreshRiesgoList() {
		this.calcularTipoRiesgo();
	}
	calcularTipoRiesgo() {
		this.service.getRiesgoList().subscribe(data => {
			this.RiesgoList = data;
			for (let i = 0; i < this.RiesgoList.length; ++i) {
				if (this.RiesgoList[i].tipoEvento == 'Gobierno, Político y Económico' || this.RiesgoList[i].tipoEvento == 'Modelo de Negocios y Estrategias'
					|| this.RiesgoList[i].tipoEvento == 'Mercado, Industria y Competidores') {
					this.RiesgoList[i].tipoRiesgo = "Estratégico";
				}
				else if (this.RiesgoList[i].tipoEvento == 'Riesgo de crédito' || this.RiesgoList[i].tipoEvento == 'Riesgo de liquidez' ||
					this.RiesgoList[i].tipoEvento == 'Ingresos y Rentabilidad del Negocio' || this.RiesgoList[i].tipoEvento == 'Información Contable y Financiera') {
					this.RiesgoList[i].tipoRiesgo = "Financiero";
				}
				else if (this.RiesgoList[i].tipoEvento == 'Normativo / Regulatorio' || this.RiesgoList[i].tipoEvento == 'Legal / Fiscal' ||
					this.RiesgoList[i].tipoEvento == 'Tratados de Comercio Internaciones' || this.RiesgoList[i].tipoEvento == 'Requisitos del Cliente') {
					this.RiesgoList[i].tipoRiesgo = "Cumplimiento";
				}
				else if (this.RiesgoList[i].tipoEvento == 'Fraude Interno' || this.RiesgoList[i].tipoEvento == 'Fraude Externo') {
					this.RiesgoList[i].tipoRiesgo = "Fraude";
				}
				else if (this.RiesgoList[i].tipoEvento == 'Eficiencia, Calidad y Productividad' || this.RiesgoList[i].tipoEvento == 'Clientes, Productos y Prácticas Empresariales' ||
					this.RiesgoList[i].tipoEvento == 'Cadena de Suministro' || this.RiesgoList[i].tipoEvento == 'Higiene, Seguridad y Medio Ambiente' ||
					this.RiesgoList[i].tipoEvento == 'Estructura de la Compañía' || this.RiesgoList[i].tipoEvento == 'Continuidad del Negocio') {
					this.RiesgoList[i].tipoRiesgo = "Operacional";
				}
				else if (this.RiesgoList[i].tipoEvento == 'Sistemas e Infraestructura de Comunicaciones' || this.RiesgoList[i].tipoEvento == 'Segregación de Funciones' ||
					this.RiesgoList[i].tipoEvento == 'Calidad de la Información') {
					this.RiesgoList[i].tipoRiesgo = "Tecnológico";
				}
			}
			this.RiesgoList = data;
			this.calcularNivelRiesgoInherente(this.RiesgoList, data);
			//console.log("Lista de riesgos");
			//console.log(this.RiesgoList);
		});
	}
	/*VER CÓMO ACTUALIZAR LOS VALORES EN TIEMPO REAL */
	calcularNivelRiesgoInherente(RiesgoList: any, data: any) {
		for (let i = 0; i < this.RiesgoList.length; ++i) {
			if (this.RiesgoList[i].probabilidad == 'Muy Alta' && (this.RiesgoList[i].impacto == 'Marginal' || this.RiesgoList[i].impacto == 'Débil')) {
				this.RiesgoList[i].nivelRiesgo = "A";
			}
			else if (this.RiesgoList[i].probabilidad == 'Muy Alta' && (this.RiesgoList[i].impacto == 'Importante' || this.RiesgoList[i].impacto == 'Crítico' || this.RiesgoList[i].impacto == 'Catastrófico')) {
				this.RiesgoList[i].nivelRiesgo = "MA";
			}
			else if (this.RiesgoList[i].probabilidad == 'Alta' && (this.RiesgoList[i].impacto == 'Marginal')) {
				this.RiesgoList[i].nivelRiesgo = "M";
			}
			else if (this.RiesgoList[i].probabilidad == 'Alta' && (this.RiesgoList[i].impacto == 'Débil' || this.RiesgoList[i].impacto == 'Importante')) {
				this.RiesgoList[i].nivelRiesgo = "A";
			}
			else if (this.RiesgoList[i].probabilidad == 'Alta' && (this.RiesgoList[i].impacto == 'Crítico' || this.RiesgoList[i].impacto == 'Catastrófico')) {
				this.RiesgoList[i].nivelRiesgo = "MA";
			}
			else if (this.RiesgoList[i].probabilidad == 'Media' && (this.RiesgoList[i].impacto == 'Marginal')) {
				this.RiesgoList[i].nivelRiesgo = "B";
			}
			else if (this.RiesgoList[i].probabilidad == 'Media' && (this.RiesgoList[i].impacto == 'Débil' || this.RiesgoList[i].impacto == 'Importante')) {
				this.RiesgoList[i].nivelRiesgo = "M";
			}
			else if (this.RiesgoList[i].probabilidad == 'Media' && (this.RiesgoList[i].impacto == 'Crítico' || this.RiesgoList[i].impacto == 'Catastrófico')) {
				this.RiesgoList[i].nivelRiesgo = "MA";
			}
			else if (this.RiesgoList[i].probabilidad == 'Baja' && (this.RiesgoList[i].impacto == 'Marginal' || this.RiesgoList[i].impacto == 'Débil')) {
				this.RiesgoList[i].nivelRiesgo = "B";
			}
			else if (this.RiesgoList[i].probabilidad == 'Baja' && (this.RiesgoList[i].impacto == 'Importante')) {
				this.RiesgoList[i].nivelRiesgo = "M";
			}
			else if (this.RiesgoList[i].probabilidad == 'Baja' && (this.RiesgoList[i].impacto == 'Crítico')) {
				this.RiesgoList[i].nivelRiesgo = "A";
			}
			else if (this.RiesgoList[i].probabilidad == 'Baja' && (this.RiesgoList[i].impacto == 'Catastrófico')) {
				this.RiesgoList[i].nivelRiesgo = "MA";
			}
			else if (this.RiesgoList[i].probabilidad == 'Muy Baja' && (this.RiesgoList[i].impacto == 'Marginal')) {
				this.RiesgoList[i].nivelRiesgo = "MB";
			}
			else if (this.RiesgoList[i].probabilidad == 'Muy Baja' && (this.RiesgoList[i].impacto == 'Débil')) {
				this.RiesgoList[i].nivelRiesgo = "B";
			}
			else if (this.RiesgoList[i].probabilidad == 'Muy Baja' && (this.RiesgoList[i].impacto == 'Importante')) {
				this.RiesgoList[i].nivelRiesgo = "M";
			}
			else if (this.RiesgoList[i].probabilidad == 'Muy Baja' && (this.RiesgoList[i].impacto == 'Crítico' || this.RiesgoList[i].impacto == 'Catastrófico')) {
				this.RiesgoList[i].nivelRiesgo = "A";
			}

		}
		this.RiesgoList = data;
		console.log("Lista de riesgos");
		console.log(this.RiesgoList);
		return RiesgoList + data;
	}

}
