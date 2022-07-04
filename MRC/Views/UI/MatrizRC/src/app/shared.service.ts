import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class SharedService {
	readonly APIUrl = "http://localhost:5000/api";

	constructor(private http: HttpClient) { }

	getRiesgoList(): Observable<any[]> {
		return this.http.get<any>(this.APIUrl + '/Riesgo')
	}
	//Aquí ver como poner otro metodo get para los gráficos.

	anadirRiesgo(val: any) {
		return this.http.post<any>(this.APIUrl + '/Riesgo', val)
	}
	editarRiesgo(val: any) {
		return this.http.put<any>(this.APIUrl + '/Riesgo', val)
	}
	borrarRiesgo(val: any) {
		return this.http.delete<any>(this.APIUrl + '/Riesgo', val)
	}
	getControlesList(): Observable<any[]> {
		return this.http.get<any>(this.APIUrl + '/RiesgoControl')
	}

	anadirControl(val: any) {
		return this.http.post<any>(this.APIUrl + '/RiesgoControl', val)
	}
	editarControl(val: any) {
		return this.http.put<any>(this.APIUrl + '/RiesgoControl', val)
	}
	borrarControl(val: any) {
		return this.http.delete<any>(this.APIUrl + '/RiesgoControl', val)
	}
	getCausasList(): Observable<any[]> {
		return this.http.get<any>(this.APIUrl + '/Causa')
	}

	anadirCausa(val: any) {
		return this.http.post<any>(this.APIUrl + '/Causa', val)
	}
	editarCausa(val: any) {
		return this.http.put<any>(this.APIUrl + '/Causa', val)
	}
	borrarCausa(val: any) {
		return this.http.delete<any>(this.APIUrl + '/Causa', val)
	}
	getCriteriosList(): Observable<any[]> {
		return this.http.get<any>(this.APIUrl + '/Criterios')
	}

	anadirCriterio(val: any) {
		return this.http.post<any>(this.APIUrl + '/Criterios', val)
	}
	editarCriterio(val: any) {
		return this.http.put<any>(this.APIUrl + '/Criterios', val)
	}


}
