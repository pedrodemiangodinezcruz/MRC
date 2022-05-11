import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
declare function getPointCategoryName(point: any, dimension: any): any;
declare var require: any;

let heatmap = require('highcharts/modules/heatmap');
let exporting = require('highcharts/modules/exporting');
let exportingData = require('highcharts/modules/export-data');
let accessibility = require('highcharts/modules/accessibility');


heatmap(Highcharts);
exporting(Highcharts);
exportingData(Highcharts);
accessibility(Highcharts);

@Component({
	selector: 'app-mapa-riesgo',
	templateUrl: './mapa-riesgo.component.html',
	styleUrls: ['./mapa-riesgo.component.css']
  })
  export class MapaRiesgoComponent implements OnInit {

	getPointCategoryName(point:any, dimension:any) {
    var series = point.series,
      isY = dimension === 'y',
      axis = series[isY ? 'yAxis' : 'xAxis'];
    return axis.categories[point[isY ? 'y' : 'x']];
  }

  public chartOptions: any = {

    chart: {
      type: 'heatmap',
      marginTop: 40,
      marginBottom: 80,
      plotBorderWidth: 1
    },


    title: {
      text: '<strong>MAPA DE CALOR - RIESGO INHERENTE</strong>'
    },

    xAxis: {
      categories: ['Marginal', 'Débil', 'Importante', 'Crítico', 'Catastrófico'],
      title: ['Impacto'],
    },

    yAxis: {
      categories: ['Muy Alto', 'Alto', 'Medio', 'Bajo', 'Muy Bajo'],
      title: ['Probabilidad'],
      reversed: true
    },

    accessibility: {
      point: {
        descriptionFormatter: function (point:any) {
          var ix = point.index + 1,
            xName = getPointCategoryName(point, 'x'),
            yName = getPointCategoryName(point, 'y'),
            val = point.value;
          return ix + '. ' + xName + ' sales ' + yName + ', ' + val + '.';
        }
      }
    },

    colorAxis: {
      linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
      stops: [
        [0, 'rgb(0,176,80)'], // start
        [0.5, 'rgb(255,255,0)'], // middle
        [1, 'rgb(255,0,0)'] // end
      ]
    },

    legend: {
      align: 'right',
      layout: 'vertical',
      margin: 0,
      verticalAlign: 'top',
      y: 25,
      symbolHeight: 280
    },

    tooltip: {
      formatter: function () {
        //return 'Impacto: <b>' + getPointCategoryName(this.point, 'x') + '</b> <br>ID de los riesgos: <b>' +
         // this.point.value + '</b><br> Con nivel de probabilidad: <b>' + getPointCategoryName(this.point, 'y') + '</b>';
      }
    },

    series: [{
      name: 'Riesgo Inherente',
      //Verificar si es el nombre correcto
      borderWidth: 1,
      data: [[0, 0, 75,], [0, 1, 50], [0, 2, 25], [0, 3, 25], [0, 4, 0], [1, 0, 75], [1, 1, 75], [1, 2, 50], [1, 3, 25], [1, 4, 25], [2, 0, 100], [2, 1, 75], [2, 2, 50], [2, 3, 50], [2, 4, 50], [3, 0, 100], [3, 1, 100], [3, 2, 100], [3, 3, 75], [3, 4, 75], [4, 0, 100], [4, 1, 100], [4, 2, 100], [4, 3, 100], [4, 4, 75]],
      dataLabels: {
        enabled: true,
        color: '#000000'
      }
    }],

    responsive: {
      rules: [{
        condition: {
          maxWidth: 500
        },
        chartOptions: {
          yAxis: {
        /*    labels: {
             formatter: function () {
              return this.value.charAt(0);
              }
		}*/
          }
        }
      }]
    }

  };

	constructor() { }
	
	  ngOnInit(){
		Highcharts.chart('container', this.chartOptions);
	  }
}
