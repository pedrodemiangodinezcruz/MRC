import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-matriz',
  templateUrl: './matriz.component.html',
  styleUrls: ['./matriz.component.css']
})
export class MatrizComponent {

	myScriptElement: HTMLScriptElement;
	//myScriptElementJQuery: HTMLScriptElement;
    constructor() { 
	this.myScriptElement = document.createElement('script');
	this.myScriptElement.src = '../../assets/js/matriz.js';
	document.body.appendChild(this.myScriptElement);

  
	}

}
