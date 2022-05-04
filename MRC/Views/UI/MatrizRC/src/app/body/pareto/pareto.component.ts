import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pareto',
  templateUrl: './pareto.component.html',
  styleUrls: ['./pareto.component.css']
})
export class ParetoComponent {
	myScriptElement: HTMLScriptElement;
	myScriptElement2: HTMLScriptElement;
	myScriptElement3: HTMLScriptElement;
	myScriptElement4: HTMLScriptElement;
	myScriptElement5: HTMLScriptElement;
	myScriptElement6: HTMLScriptElement;
	
    constructor() { 
	this.myScriptElement = document.createElement('script');
	this.myScriptElement.src = '../../assets/js/pareto.js';
	document.body.appendChild(this.myScriptElement);
	this.myScriptElement2 = document.createElement('script');
	this.myScriptElement2.src = 'https://code.highcharts.com/highcharts.js';
	document.body.appendChild(this.myScriptElement2);
	this.myScriptElement3 = document.createElement('script');
	this.myScriptElement3.src = 'https://code.highcharts.com/modules/pareto.js';
	document.body.appendChild(this.myScriptElement3);
	this.myScriptElement4 = document.createElement('script');
	this.myScriptElement4.src = 'https://code.highcharts.com/modules/exporting.js';
	document.body.appendChild(this.myScriptElement4);
	this.myScriptElement5 = document.createElement('script');
	this.myScriptElement5.src = 'https://code.highcharts.com/modules/export-data.js';
	document.body.appendChild(this.myScriptElement5);
	this.myScriptElement6 = document.createElement('script');
	this.myScriptElement6.src = 'https://code.highcharts.com/modules/accessibility.js';
	document.body.appendChild(this.myScriptElement6);
		
  
	}

}
