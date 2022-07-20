import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MetodologiaComponent } from './body/metodologia/metodologia.component';
import { MatrizComponent } from './body/matriz/matriz.component';
import { MapaResidualComponent } from './body/mapa-residual/mapa-residual.component';
import { CriteriosComponent } from './body/criterios/criterios.component';
import { EstadisticasComponent } from './body/estadisticas/estadisticas.component';
import { EstadisticasCoberturaComponent } from './body/estadisticas-cobertura/estadisticas-cobertura.component';
import { EstadisticasRiesgoResidualComponent } from './body/estadisticas-riesgo-residual/estadisticas-riesgo-residual.component';
import { MapaRiesgoComponent } from './body/mapa-riesgo/mapa-riesgo.component';
import { ParetoComponent } from './body/pareto/pareto.component';
import { CausasComponent } from './body/causas/causas.component';
import { ControlesComponent } from './body/controles/controles.component';
import { InstructivoComponent } from './body/instructivo/instructivo.component';
import { ListaRiesgosComponent } from './body/lista-riesgos/lista-riesgos.component';
import { InicioComponent } from './body/inicio/inicio.component';

const routes: Routes = [
{path: '', component: InicioComponent},
{path: 'metodologia', component: MetodologiaComponent},
{path: 'matriz', component: MatrizComponent},
{path: 'instructivo', component: InstructivoComponent},
{path: 'listaRiesgos', component: ListaRiesgosComponent},
{path: 'causas', component: CausasComponent},
{path: 'controles', component: ControlesComponent},
{path: 'criterios', component: CriteriosComponent},
{path: 'estadisticas', component: EstadisticasComponent},
{path: 'estadisticasCobertura', component: EstadisticasCoberturaComponent},
{path: 'estadisticasCobertura/:macro', component: EstadisticasCoberturaComponent},
{path: 'estadisticasRiesgoResidual', component: EstadisticasRiesgoResidualComponent},
{path: 'estadisticasRiesgoResidual/:macro', component: EstadisticasRiesgoResidualComponent},
{path: 'estadisticas/:macro', component: EstadisticasComponent},
{path: 'mapaResidual', component: MapaResidualComponent},
{path: 'mapaResidual/:macro', component: MapaResidualComponent},
{path: 'mapaRiesgo', component: MapaRiesgoComponent},
{path: 'mapaRiesgo/:macro', component: MapaRiesgoComponent},
{path: 'pareto', component: ParetoComponent },
{path: 'pareto/:macro', component: ParetoComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
