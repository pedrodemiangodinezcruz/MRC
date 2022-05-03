import { Component, OnInit } from '@angular/core';
declare const myFun:any;

@Component({
  selector: 'app-metodologia',
  templateUrl: './metodologia.component.html',
  styleUrls: ['./metodologia.component.css']
})
export class MetodologiaComponent implements OnInit {

	callfun(){
		myFun();
	}
    constructor() { }

  ngOnInit(): void {
  }

}
