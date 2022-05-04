import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-instructivo',
  templateUrl: './instructivo.component.html',
  styleUrls: ['./instructivo.component.css']
})
export class InstructivoComponent  {
	myScriptElement: HTMLScriptElement;
	constructor() { 
	this.myScriptElement = document.createElement('script');
	this.myScriptElement.src = '../../assets/js/mostrar-tablas.js';
	document.body.appendChild(this.myScriptElement);
	}
 

}
