import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
declare function getPointCategoryName(point: any, dimension: any): any;


@Component({
  selector: 'app-mapa-residual',
  templateUrl: './mapa-residual.component.html',
  styleUrls: ['./mapa-residual.component.css']
})
export class MapaResidualComponent implements OnInit {

	
/*
  public chartOptions: any = {
    chart: {
      type: 'heatmap',
      marginTop: 40,
      marginBottom: 90,
      plotBorderWidth: 1
    },


    title: {
      text: '<strong>MAPA DE CALOR - RIESGO RESIDUAL</strong>'
    },

    xAxis: {
      categories: ['Total', 'Alto', 'Medio', 'Bajo', 'Ausencia de control'],
      title: ['COBERTURA DELC ONJUNTO DE CONTROLES'],
    },

    yAxis: {
      categories: ['MA', 'A', 'M', 'B', 'MB'],
      title: ['RIESGO RESIDUAL'],
      reversed: true
    },

    accessibility: {
      point: {
        descriptionFormatter: function (point: any) {
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
      formatter: function (): any {
        return 'Cobertura: <b>' + getPointCategoryName(this.point, 'x') + '</b> <br>ID de los riesgos: <b>' +
          this.point.value + '</b><br> Con un riesgo residual: <b>' + getPointCategoryName(this.point, 'y') + '</b>';
      }
    },

    series: [{
      name: 'Riesgo Inherente',
      //Verificar si es el nombre correcto
      borderWidth: 1,
      data: [[0, 0, 0], [0, 1, 0], [0, 2, 0], [0, 3, 0], [0, 4, 0], [1, 0, 50], [1, 1, 25], [1, 2, 0], [1, 3, 0], [1, 4, 0], [2, 0, 75], [2, 1, 50], [2, 2, 25], [2, 3, 0], [2, 4, 0], [3, 0, 100], [3, 1, 75], [3, 2, 50], [3, 3, 25], [3, 4, 0], [4, 0, 100], [4, 1, 75], [4, 2, 50], [4, 3, 25,], [4, 4, 0]],
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
            labels: {
              formatter: function (): any {
                return this.value.charAt(0);
              }
            }
          }
        }
      }]
    }

  };
*/
	
constructor() { }
	
	  ngOnInit(){
		//Highcharts.chart('container', this.chartOptions);
	  }
}

