import { Component, OnInit, Input } from '@angular/core';
import { SharedService } from 'src/app/shared.service';


@Component({
	selector: 'app-matriz',
	templateUrl: './matriz.component.html',
	styleUrls: ['./matriz.component.css']
})
export class MatrizComponent implements OnInit {

	ocultarBoton: boolean = true;
	mostarBoton: boolean = false;
	contenteditable = false;
	esFomulado: boolean = false;


	editarRiesgo() {
		this.ocultarBoton = !this.ocultarBoton;
		this.mostarBoton = !this.mostarBoton;
		this.contenteditable = !this.contenteditable;
		this.esFomulado = !this.esFomulado;

	}
	guardarRiesgo() {
		this.mostarBoton = this.mostarBoton;
	}
	//Show es matriz
	//app-edit es riesgo

	constructor(private service: SharedService) { }

	RiesgoList: any = [];
	ListaRiesgosSinFiltrado: any = [];
	ControlList: any = [];
	ListaControlSinFiltrado: any = [];
	CausaList: any = [];
	riesgo: any;
	filtroPorIdRiesgo: string = "";
	filtroPorIdControl: string = "";
	filtroPorDescripcionRiesgo: string = "";
	filtroPorDescripcionControl: string = "";
	filtroPorProbabilidadRiesgo: string = "";
	valorDiseñoDeControl: number = 0;
	ActivarAltaRiesgo: boolean = false;
	ActivarEdicionRiesgo: boolean = false;
	Id: string | undefined;
	macroProceso: string | undefined;
	proceso: string | undefined;
	idRiesgo: string | undefined;
	descripcion: string | undefined;
	causa: string | undefined;
	consecuencia: string | undefined;
	tipoEvento: string | undefined;
	tipoRiesgo: string | undefined;
	iff: string | undefined;
	icc: string | undefined;
	ios: string | undefined;
	riesgoFraude: string | undefined;
	probabilidad: number | undefined;
	impacto: string | undefined;
	nivelRiesgo: string | undefined;


	ngOnInit(): void {
		this.refreshRiesgoList();
		this.refreshControlList();
		this.refreshCausaList();
		this.Id = this.riesgo.Id;
		this.macroProceso = this.riesgo.macroProceso;
		this.proceso = this.riesgo.proceso;
		this.idRiesgo = this.riesgo.idRiesgo;
		this.descripcion = this.riesgo.descripcion;
		this.causa = this.riesgo.causa;
		this.consecuencia = this.riesgo.consecuencia;
		this.tipoEvento = this.riesgo.tipoEvento;
		this.tipoRiesgo = this.riesgo.tipoRiesgo;
		this.iff = this.riesgo.iff;
		this.icc = this.riesgo.icc;
		this.ios = this.riesgo.ios;
		this.riesgoFraude = this.riesgo.riesgoFraude;
		this.probabilidad = this.riesgo.probabilidad;
		this.impacto = this.riesgo.impacto;
		this, this.nivelRiesgo = this.riesgo.nivelRiesgo;
		console.log(this.riesgo.idRiesgo);

	}

	addClick() {
		this.ActivarAltaRiesgo = true;
		this.riesgo = {
			Anadir: 0,
			Id: 0,
			macroProceso: "",
			proceso: "",
			idRiesgo: "",
			descripcion: "",
			causa: "",
			consecuencia: "",
			tipoEvento: "",
			tipoRiesgo: "",
			iff: "",
			icc: "",
			ios: "",
			riesgoFraude: "",
			probabilidad: 0,
			impacto: "",
			nivelRiesgo: ""
		}
	}
	closeClick() {
		this.ActivarEdicionRiesgo = !this.ActivarEdicionRiesgo;
		this.refreshRiesgoList();
	}


	editClick(item: any) {
		this.riesgo = item;
		this.ActivarEdicionRiesgo = true;
		console.log(item.idRiesgo)
	}

	anadirRiesgo() {
		var val = {
			Id: this.Id,
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
			impacto: this.impacto,
			nivelRiesgo: this.nivelRiesgo
		};
		this.service.anadirRiesgo(val).subscribe(res => {
			alert(res.toString());
			console.log(res.toString());
		});
	}


	eliminarRiesgo(item: any) {
		console.log(item);
		console.log("ID BD del riesgo a eliminar " + item.Id);
		this.service.borrarRiesgo(item.Id).subscribe(data => {
			alert(data.toString());
			this.refreshRiesgoList();
		})
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
	refreshControlList() {
		this.calcularDiseñoControl();
	}

	calcularDiseñoControl() {
		this.service.getControlesList().subscribe(data => {
			this.ControlList = data;
			for (let i = 0; i < this.ControlList.length; ++i) {
				if (this.ControlList[i].evaluacionFuncionalidad == 0) {
					this.ControlList[i].disenoControl = "No se identifico control";
				}
				else if (this.ControlList[i].segregacion == 'Sí') {
					++this.valorDiseñoDeControl;
					//console.log("Coincidencia " + i + ": " + this.valorDiseñoDeControl);
				}
				if (this.ControlList[i].documentacion == 'Sí') {
					++this.valorDiseñoDeControl;
				}
				if (this.ControlList[i].naturalezaAdecuada == 'Sí') {
					++this.valorDiseñoDeControl;
				}
				if (this.ControlList[i].tipoAdecuado == 'Sí') {
					++this.valorDiseñoDeControl;
				}
				if (this.ControlList[i].frecuenciaAdecuada == 'Sí') {
					++this.valorDiseñoDeControl;
				}
				if (this.ControlList[i].responsabilidadControl == 'Sí') {
					++this.valorDiseñoDeControl;
				}
				if (this.ControlList[i].generacionEvidencia == 'Sí') {
					++this.valorDiseñoDeControl;
				}
				//console.log("Número de 'SÍ' en: " + this.ControlList[i].idControl + ": " + this.valorDiseñoDeControl);
				//Switch para todos los casos del diseño de control
				switch (this.valorDiseñoDeControl) {
					case 0:
						this.ControlList[i].disenoControl = "No Efectivo";
						break;
					case 1:
						this.ControlList[i].disenoControl = "No Efectivo";
						break;
					case 2:
						this.ControlList[i].disenoControl = "No Efectivo";
						break;
					case 3:
						this.ControlList[i].disenoControl = "No Efectivo";
						break;
					case 4:
						this.ControlList[i].disenoControl = "No Efectivo";
						break;
					case 5:
						this.ControlList[i].disenoControl = "No Efectivo";
						break;
					case 6:
						this.ControlList[i].disenoControl = "Requiere Mejora";
						break;
					case 7:
						this.ControlList[i].disenoControl = "Efectivo";
				}
				//Resetear el valor a 0 para evaluar el siguiente control
				this.valorDiseñoDeControl = 0;
			}
			this.ControlList = data;
			this.ListaControlSinFiltrado = data;
			this.calcularEstrategiaMonitoreo(this.ControlList, this.ListaControlSinFiltrado);
		});
	}
	calcularEstrategiaMonitoreo(ControlList: any, ListaControlSinFiltrado: any) {
		for (let i = 0; i < ControlList.length; ++i) {
			if (ControlList[i].disenoControl == 'No Efectivo' || ControlList[i].disenoControl == 'Requiere Mejora'
				|| ControlList[i].disenoControl == 'No se identifico control') {
				ControlList[i].estrategiaMonitoreo = "Hasta que concluya plan de acción";
			}
			else if (ControlList[i].disenoControl == 'Efectivo' && ControlList[i].controlClave == 'Sí') {
				ControlList[i].estrategiaMonitoreo = "Pruebas de funcionalidad";
			}
			else if (ControlList[i].disenoControl == 'Efectivo' && ControlList[i].controlClave == 'No') {
				ControlList[i].estrategiaMonitoreo = "Hasta recorrido";
			}
		}
		this.calcularCoberturaPonderadaPorControl(this.ControlList , this.ListaControlSinFiltrado);
		//console.log("Lista de controles despues de calcular estrategia de monitoreo: ");
		//console.log(ControlList);
	}

	calcularCoberturaPonderadaPorControl(ControlList: any, ListaControlSinFiltrado: any) {
		for (let i = 0; i < ControlList.length; ++i) {
			if (ControlList[i].evaluacionFuncionalidad == 'No efectivo') {
				ControlList[i].coberturaPonderada = (Math.ceil((ControlList[i].calificacionControl * ControlList[i].cobertura * 0.5)/100));
			}
			else  {
				ControlList[i].coberturaPonderada = (Math.ceil((ControlList[i].calificacionControl * ControlList[i].cobertura)/100));
			}
		}
		//console.log("Lista de controles despues de calcular coberturaPonderada: ");
		//console.log(ControlList);
		this.calcularCoberturaTotalControles(ControlList, ListaControlSinFiltrado);
	}
	calcularCoberturaTotalControles(ControlList: any, ListaControlSinFiltrado: any) {
		for (let i = 0; i < ControlList.length; ++i) {
				ControlList[i].coberturaTotal = ControlList[i].coberturaPonderada;
		//console.log("Lista de controles despues de calcular coberturaPonderada: ");
		//console.log(ControlList);
	}
}

	refreshCausaList() {
		this.service.getCausasList().subscribe(datos => {
			this.CausaList = datos;
			console.log("Lista de causas");
			console.log(this.CausaList);
		});
	}

	FilterFn() {
		var filtroPorIdRiesgo = this.filtroPorIdRiesgo;
		var filtroPorDescripcionRiesgo = this.filtroPorDescripcionRiesgo;
		var filtroPorProbabilidadRiesgo = this.filtroPorProbabilidadRiesgo;
		var filtroPorControl = this.filtroPorIdControl;
		var filtroPorDescripcionControl = this.filtroPorDescripcionControl;

		this.RiesgoList = this.ListaRiesgosSinFiltrado.filter(function (el: any) {
			return el.idRiesgo.toString().toLowerCase().includes(
				filtroPorIdRiesgo.toString().trim().toLowerCase()
			) &&
				el.descripcion.toString().toLowerCase().includes(
					filtroPorDescripcionRiesgo.toString().trim().toLowerCase()
				) &&
				el.probabilidad.toString().toLowerCase().includes(
					filtroPorProbabilidadRiesgo.toString().trim().toLowerCase()
				)
		});
		this.ControlList = this.ListaControlSinFiltrado.filter(function (el: any) {
			return el.idControl.toString().toLowerCase().includes(
				filtroPorControl.toString().trim().toLowerCase()
			) &&
				el.descripcion.toString().toLowerCase().includes(
					filtroPorDescripcionControl.toString().trim().toLowerCase()
				)
		});
	}

	sortResult(prop: any, asc: any) {
		this.RiesgoList = this.ListaRiesgosSinFiltrado.sort(function (a: any, b: any) {
			if (asc) {
				return (a[prop] > b[prop]) ? 1 : ((a[prop] < b[prop]) ? -1 : 0);
			} else {
				return (b[prop] > a[prop]) ? 1 : ((b[prop] < a[prop]) ? -1 : 0);
			}
		})
	}
	sortResultControl(prop: any, asc: any) {
		this.ControlList = this.ListaControlSinFiltrado.sort(function (a: any, b: any) {
			if (asc) {
				return (a[prop] > b[prop]) ? 1 : ((a[prop] < b[prop]) ? -1 : 0);
			} else {
				return (b[prop] > a[prop]) ? 1 : ((b[prop] < a[prop]) ? -1 : 0);
			}
		})
	}

}
