import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
readonly APIUrl="http://localhost:5000/api";

  constructor(private http: HttpClient) { }

  getRiesgoList():Observable<any[]> {
	return this.http.get<any>(this.APIUrl+'/Riesgo')
  }

  añadirRiesgo(val: any){
	  return this.http.get<any>(this.APIUrl+'/Riesgo', val)
  }
  editarRiesgo(val: any){
	return this.http.put<any>(this.APIUrl+'/Riesgo', val)
}
borrarRiesgo(val: any){
	return this.http.delete<any>(this.APIUrl+'/Riesgo', val)
}
getControlesList():Observable<any[]> {
	return this.http.get<any>(this.APIUrl+'/RiesgoControl')
  }

  añadirControl(val: any){
	  return this.http.get<any>(this.APIUrl+'/RiesgoControl', val)
  }
  editarControl(val: any){
	return this.http.put<any>(this.APIUrl+'/RiesgoControl', val)
}
borrarControl(val: any){
	return this.http.delete<any>(this.APIUrl+'/RiesgoControl', val)
}

}
