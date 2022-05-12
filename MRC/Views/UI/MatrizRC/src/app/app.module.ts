import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HighchartsChartComponent } from 'highcharts-angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BodyComponent } from './body/body.component';
import { HeaderComponent } from './header/header.component';
import { MetodologiaComponent } from './body/metodologia/metodologia.component';
import{SharedService} from './shared.service';




import{HttpClientModule} from '@angular/common/http';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { MatrizComponent } from './body/matriz/matriz.component';
import { CausasComponent } from './body/causas/causas.component';
import { CriteriosComponent } from './body/criterios/criterios.component';
import { EstadisticasComponent } from './body/estadisticas/estadisticas.component';
import { MapaResidualComponent } from './body/mapa-residual/mapa-residual.component';
import { MapaRiesgoComponent } from './body/mapa-riesgo/mapa-riesgo.component';
import { ParetoComponent } from './body/pareto/pareto.component';
import { InstructivoComponent } from './body/instructivo/instructivo.component';


@NgModule({
  declarations: [
    AppComponent,
    BodyComponent,
    HeaderComponent,
    MetodologiaComponent,
    MatrizComponent,
    CausasComponent,
    CriteriosComponent,
    EstadisticasComponent,
    MapaResidualComponent,
    MapaRiesgoComponent,
    ParetoComponent,
    InstructivoComponent
  ],
  imports: [
    BrowserModule,
	AppRoutingModule,
	FormsModule,
	ReactiveFormsModule,
	HttpClientModule,
	
  ],
  
  providers: [SharedService],
  bootstrap: [AppComponent]
})
export class AppModule { }
