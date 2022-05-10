import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';import { withLatestFrom } from 'rxjs';
;;
import {SharedService} from 'src/app/shared.service';



@Component({
  selector: 'app-matriz',
  templateUrl: './matriz.component.html',
  styleUrls: ['./matriz.component.css']
})
export class MatrizComponent {

	ocultarBoton: boolean = true;
	mostarBoton: boolean = false;
	contenteditable = false;
	editable: string = '';
	esFomulado: boolean = false;
	

	editarRiesgo() {
		this.ocultarBoton= !this.ocultarBoton;
		this.mostarBoton= !this.mostarBoton;
		this.contenteditable = !this.contenteditable;
		this.esFomulado = !this.esFomulado;

	  }
	  guardarRiesgo() {
		this.mostarBoton= this.mostarBoton;
	  }


    constructor(private service:SharedService) { 		
		
	}
	
	RiesgoList:any=[];
	ControlList:any=[];
	ngOnInit():void {	
		this.refreshRiesgoList();
		this.refreshControlList();
	}
	refreshRiesgoList() {
		this.service.getRiesgoList().subscribe(data=> {
			this.RiesgoList = data;
			console.log(this.RiesgoList);
		});
	}
	refreshControlList(){
		this.service.getControlesList().subscribe(datos=> {
			this.ControlList = datos;
			console.log(this.ControlList);
		});
	}

}
