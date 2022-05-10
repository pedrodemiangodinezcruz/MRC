import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css']
})
export class EstadisticasComponent implements OnInit {

	riesgoInherente: boolean = true;
	residual: boolean = false;
	cobertura: boolean = false;

	irCobertura(){
		this.riesgoInherente = !this.riesgoInherente;
		this.cobertura = !this.cobertura;
	}
	regresarInherente(){
		this.riesgoInherente = !this.riesgoInherente;
		this.cobertura = !this.cobertura;
	}
	irResidual(){
		this.cobertura = false;
		this.residual = true;
	}
	regresarCobertura(){
		this.residual = false;
		this.cobertura = true;
		
	}

  constructor() { }

  ngOnInit(): void {
  }

}
