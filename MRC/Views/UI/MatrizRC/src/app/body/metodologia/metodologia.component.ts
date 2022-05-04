import { Component } from '@angular/core';


@Component({
  selector: 'app-metodologia',
  templateUrl: './metodologia.component.html',
  styleUrls: ['./metodologia.component.css']
})

export class MetodologiaComponent {
	myScriptElement: HTMLScriptElement;
    constructor() { 
	this.myScriptElement = document.createElement('script');
	this.myScriptElement.src = '../../assets/js/mostrar-tablas.js';
	document.body.appendChild(this.myScriptElement);
  
	}
}
