import { Component, OnInit } from '@angular/core';
declare let HighchartsChartComponent: any ;
declare let Highcharts: any;

@Component({
  selector: 'app-pareto',
  templateUrl: './pareto.component.html',
  styleUrls: ['./pareto.component.css']
})
export class ParetoComponent {
	/*myScriptElement: HTMLScriptElement;
	myScriptElement2: HTMLScriptElement;
	myScriptElement3: HTMLScriptElement;
	myScriptElement4: HTMLScriptElement;
	myScriptElement5: HTMLScriptElement;
	myScriptElement6: HTMLScriptElement;*/
	
    constructor() { 
		//Highcharts.init();
		Highcharts.chart('container', {
			chart: {
				renderTo: 'container',
				type: 'column'
			},
			title: {
				text: 'Restaurants Complaints'
			},
			tooltip: {
				shared: true
			},
			xAxis: {
				categories: [
					'Overpriced',
					'Small portions',
					'Wait time',
					'Food is tasteless',
					'No atmosphere',
					'Not clean',
					'Too noisy',
					'Unfriendly staff'
				],
				crosshair: true
			},
			yAxis: [{
				title: {
					text: ''
				}
			}, {
				title: {
					text: ''
				},
				minPadding: 0,
				maxPadding: 0,
				max: 100,
				min: 0,
				opposite: true,
				labels: {
					format: "{value}%"
				}
			}],
			series: [{
				type: 'pareto',
				name: 'Pareto',
				yAxis: 1,
				zIndex: 10,
				baseSeries: 1,
				tooltip: {
					valueDecimals: 2,
					valueSuffix: '%'
				}
			}, {
				name: 'Complaints',
				type: 'column',
				zIndex: 2,
				data: [755, 222, 151, 86, 72, 51, 36, 10]
			}]
		});
	/*this.myScriptElement = document.createElement('script');
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
	document.body.appendChild(this.myScriptElement6);*/
		
  
	}

}
