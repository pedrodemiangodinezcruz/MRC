import { Component, OnInit } from '@angular/core';
import {SharedService} from 'src/app/shared.service';

@Component({
  selector: 'app-matriz',
  templateUrl: './matriz.component.html',
  styleUrls: ['./matriz.component.css']
})
export class MatrizComponent {

	myScriptElement: HTMLScriptElement;
	
    constructor(private service:SharedService) { 
	
	this.myScriptElement = document.createElement('script');
	this.myScriptElement.src = '../../assets/js/matriz.js';
	document.body.appendChild(this.myScriptElement);
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
