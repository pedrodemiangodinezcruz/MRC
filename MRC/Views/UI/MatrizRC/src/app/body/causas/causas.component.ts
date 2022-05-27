import { Component, OnInit, Input } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

@Component({
	selector: 'app-causas',
	templateUrl: './causas.component.html',
	styleUrls: ['./causas.component.css']
})
export class CausasComponent implements OnInit {

	myScriptElement: HTMLScriptElement;
	ocultarBoton: boolean = true;
	mostarBoton: boolean = false;
	contenteditable = false;

	editarCausa() {
		this.ocultarBoton = !this.ocultarBoton;
		this.mostarBoton = !this.mostarBoton;
		this.contenteditable = !this.contenteditable;

	}

	constructor(private service: SharedService) {
		this.myScriptElement = document.createElement('script');
		this.myScriptElement.src = '../../assets/js/matriz.js';
		document.body.appendChild(this.myScriptElement);


	}
	CausasList: any = [];
	RiesgoList: any = [];
	causa : any;




	ngOnInit(): void {

	}







}
