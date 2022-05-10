import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-causas',
  templateUrl: './causas.component.html',
  styleUrls: ['./causas.component.css']
})
export class CausasComponent {

	myScriptElement: HTMLScriptElement;
	ocultarBoton: boolean = true;
	mostarBoton: boolean = false;
	contenteditable = false;
	
	editarRiesgo() {
		this.ocultarBoton= !this.ocultarBoton;
		this.mostarBoton= !this.mostarBoton;
		this.contenteditable= !this.contenteditable;

	  }
	
    constructor() { 
	this.myScriptElement = document.createElement('script');
	this.myScriptElement.src = '../../assets/js/matriz.js';
	document.body.appendChild(this.myScriptElement);

  
	}


}
