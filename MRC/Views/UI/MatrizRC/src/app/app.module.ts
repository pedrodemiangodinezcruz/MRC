import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DataTablesModule } from "angular-datatables";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BodyComponent } from './body/body.component';
import { HeaderComponent } from './header/header.component';
import { MetodologiaComponent } from './body/metodologia/metodologia.component';
import{SharedService} from './shared.service';
import {AutosizeModule} from 'ngx-autosize';






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
import { RiesgoComponent } from './body/riesgo/riesgo.component';
import { ControlRiesgoComponent } from './body/control-riesgo/control-riesgo.component';
import { ControlesComponent } from './body/controles/controles.component';
import { TablaCausaComponent } from './body/tabla-causa/tabla-causa.component';
import { ListaRiesgosComponent } from './body/lista-riesgos/lista-riesgos.component';
import { InicioComponent } from './body/inicio/inicio.component';
import { CriteriosDefinicionComponent } from './body/criterios-definicion/criterios-definicion.component';
import { EstadisticasCoberturaComponent } from './body/estadisticas-cobertura/estadisticas-cobertura.component';
import { EstadisticasRiesgoResidualComponent } from './body/estadisticas-riesgo-residual/estadisticas-riesgo-residual.component';


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
    InstructivoComponent,
    RiesgoComponent,
    ControlRiesgoComponent,
    ControlesComponent,
    TablaCausaComponent,
    ListaRiesgosComponent,
    InicioComponent,
    CriteriosDefinicionComponent,
    EstadisticasCoberturaComponent,
    EstadisticasRiesgoResidualComponent
  ],
  imports: [
    BrowserModule,
	AppRoutingModule,
	FormsModule,
	ReactiveFormsModule,
	AutosizeModule,
	HttpClientModule,
	DataTablesModule
  ],
  
  providers: [SharedService],
  bootstrap: [AppComponent]
})
export class AppModule { }
