import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit, Input } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

@Component({
	selector: 'app-lista-riesgos',
	templateUrl: './lista-riesgos.component.html',
	styleUrls: ['./lista-riesgos.component.css']
})
export class ListaRiesgosComponent implements OnInit {
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

	constructor(private service: SharedService) { }
	RiesgoList: any = [];
	ListaRiesgosSinFiltrado:any=[];
	ControlList: any = [];
	CausaList: any = [];
	riesgo: any;
	ActivarAltaRiesgo: boolean = false;
	ActivarEdicionRiesgo: boolean = false;
	filtroPorIdRiesgo: string="";
	filtroPorDescripcionRiesgo: string="";
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
		this.nivelRiesgo = this.riesgo.nivelRiesgo;
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
		//console.log(item);
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
			for(let i=0; i < this.RiesgoList.length; ++i){
				if(this.RiesgoList[i].tipoEvento == 'Gobierno, Político y Económico' || this.RiesgoList[i].tipoEvento == 'Modelo de Negocios y Estrategias'
				|| this.RiesgoList[i].tipoEvento == 'Mercado, Industria y Competidores'){
					this.RiesgoList[i].tipoRiesgo = "Estratégico";
				}
				else if (this.RiesgoList[i].tipoEvento == 'Riesgo de crédito' || this.RiesgoList[i].tipoEvento == 'Riesgo de liquidez' ||
				this.RiesgoList[i].tipoEvento  == 'Ingresos y Rentabilidad del Negocio' ||  this.RiesgoList[i].tipoEvento  == 'Información Contable y Financiera'){
					this.RiesgoList[i].tipoRiesgo = "Financiero";
				}
				else if (this.RiesgoList[i].tipoEvento == 'Normativo / Regulatorio' || this.RiesgoList[i].tipoEvento == 'Legal / Fiscal' ||
				this.RiesgoList[i].tipoEvento  == 'Tratados de Comercio Internaciones' ||  this.RiesgoList[i].tipoEvento  == 'Requisitos del Cliente'){
					this.RiesgoList[i].tipoRiesgo = "Cumplimiento";
				}
				else if (this.RiesgoList[i].tipoEvento == 'Fraude Interno' || this.RiesgoList[i].tipoEvento == 'Fraude Externo'){
					this.RiesgoList[i].tipoRiesgo = "Fraude";
				}
				else if (this.RiesgoList[i].tipoEvento == 'Eficiencia, Calidad y Productividad' || this.RiesgoList[i].tipoEvento == 'Clientes, Productos y Prácticas Empresariales' ||
				this.RiesgoList[i].tipoEvento  == 'Cadena de Suministro' ||  this.RiesgoList[i].tipoEvento  == 'Higiene, Seguridad y Medio Ambiente' ||
				this.RiesgoList[i].tipoEvento  == 'Estructura de la Compañía' ||  this.RiesgoList[i].tipoEvento  == 'Continuidad del Negocio'){
					this.RiesgoList[i].tipoRiesgo = "Operacional";
				}
				else if (this.RiesgoList[i].tipoEvento == 'Sistemas e Infraestructura de Comunicaciones' || this.RiesgoList[i].tipoEvento == 'Segregación de Funciones' ||
				this.RiesgoList[i].tipoEvento  == 'Calidad de la Información'){
					this.RiesgoList[i].tipoRiesgo = "Tecnológico";
				}
			}
			this.calcularNivelRiesgoInherente(this.RiesgoList, this.ListaRiesgosSinFiltrado, data);
			//console.log("Lista de riesgos");
			//console.log(this.RiesgoList);
		});
	}

	calcularNivelRiesgoInherente(RiesgoList: any, ListaRiesgosSinFiltrado: any, data: any) {
			for(let i=0; i < this.RiesgoList.length; ++i){
				if(this.RiesgoList[i].probabilidad == 'Muy Alta' && (this.RiesgoList[i].impacto == 'Marginal' || this.RiesgoList[i].impacto == 'Débil')){
					this.RiesgoList[i].nivelRiesgo = "A";
				}
				else if(this.RiesgoList[i].probabilidad == 'Muy Alta' && (this.RiesgoList[i].impacto == 'Importante' || this.RiesgoList[i].impacto == 'Crítico'|| this.RiesgoList[i].impacto == 'Catastrófico')){
					this.RiesgoList[i].nivelRiesgo = "MA";
				}
				else if(this.RiesgoList[i].probabilidad == 'Alta' && (this.RiesgoList[i].impacto == 'Marginal')){
					this.RiesgoList[i].nivelRiesgo = "M";
				}
				else if(this.RiesgoList[i].probabilidad == 'Alta' && (this.RiesgoList[i].impacto == 'Débil' || this.RiesgoList[i].impacto == 'Importante')){
					this.RiesgoList[i].nivelRiesgo = "A";
				}
				else if(this.RiesgoList[i].probabilidad == 'Alta' && (this.RiesgoList[i].impacto == 'Crítico' || this.RiesgoList[i].impacto == 'Catastrófico')){
					this.RiesgoList[i].nivelRiesgo = "MA";
				}
				else if(this.RiesgoList[i].probabilidad == 'Media' && (this.RiesgoList[i].impacto == 'Marginal')){
					this.RiesgoList[i].nivelRiesgo = "B";
				}
				else if(this.RiesgoList[i].probabilidad == 'Media' && (this.RiesgoList[i].impacto == 'Débil' || this.RiesgoList[i].impacto == 'Importante')){
					this.RiesgoList[i].nivelRiesgo = "M";
				}
				else if(this.RiesgoList[i].probabilidad == 'Media' && (this.RiesgoList[i].impacto == 'Crítico' || this.RiesgoList[i].impacto == 'Catastrófico')){
					this.RiesgoList[i].nivelRiesgo = "MA";
				}
				else if(this.RiesgoList[i].probabilidad == 'Baja' && (this.RiesgoList[i].impacto == 'Marginal' || this.RiesgoList[i].impacto == 'Débil')){
					this.RiesgoList[i].nivelRiesgo = "B";
				}
				else if(this.RiesgoList[i].probabilidad == 'Baja' && (this.RiesgoList[i].impacto == 'Importante')){
					this.RiesgoList[i].nivelRiesgo = "M";
				}
				else if(this.RiesgoList[i].probabilidad == 'Baja' && (this.RiesgoList[i].impacto == 'Crítico')){
					this.RiesgoList[i].nivelRiesgo = "A";
				}
				else if(this.RiesgoList[i].probabilidad == 'Baja' && (this.RiesgoList[i].impacto == 'Catastrófico')){
					this.RiesgoList[i].nivelRiesgo = "MA";
				}
				else if(this.RiesgoList[i].probabilidad == 'Muy Baja' && (this.RiesgoList[i].impacto == 'Marginal')){
					this.RiesgoList[i].nivelRiesgo = "MB";
				}
				else if(this.RiesgoList[i].probabilidad == 'Muy Baja' && (this.RiesgoList[i].impacto == 'Débil')){
					this.RiesgoList[i].nivelRiesgo = "B";
				}
				else if(this.RiesgoList[i].probabilidad == 'Muy Baja' && (this.RiesgoList[i].impacto == 'Importante')){
					this.RiesgoList[i].nivelRiesgo = "M";
				}
				else if(this.RiesgoList[i].probabilidad == 'Muy Baja' && (this.RiesgoList[i].impacto == 'Crítico' || this.RiesgoList[i].impacto == 'Catastrófico')){
					this.RiesgoList[i].nivelRiesgo = "A";
				}
				
			}
			this.RiesgoList = data;
			this.ListaRiesgosSinFiltrado = data;
			console.log("Lista de riesgos");
			console.log(this.RiesgoList);
		return RiesgoList + ListaRiesgosSinFiltrado + data;
	}

	
	FilterFn(){
		var filtroPorIdRiesgo = this.filtroPorIdRiesgo;
		var filtroPorDescripcionRiesgo = this.filtroPorDescripcionRiesgo;
	
		this.RiesgoList = this.ListaRiesgosSinFiltrado.filter(function (el:any){
			return el.idRiesgo.toString().toLowerCase().includes(
			  filtroPorIdRiesgo.toString().trim().toLowerCase()
			)&&
			el.descripcion.toString().toLowerCase().includes(
				filtroPorDescripcionRiesgo.toString().trim().toLowerCase()
			)
		});
	  }
	
	  sortResult(prop:any,asc:any){
		this.RiesgoList = this.ListaRiesgosSinFiltrado.sort(function(a:any,b:any){
		  if(asc){
			  return (a[prop]>b[prop])?1 : ((a[prop]<b[prop]) ?-1 :0);
		  }else{
			return (b[prop]>a[prop])?1 : ((b[prop]<a[prop]) ?-1 :0);
		  }
		})
	  }

}
