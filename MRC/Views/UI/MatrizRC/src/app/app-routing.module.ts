import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MetodologiaComponent } from './body/metodologia/metodologia.component';
import { MatrizComponent } from './body/matriz/matriz.component';
import { MapaResidualComponent } from './body/mapa-residual/mapa-residual.component';
import { CriteriosComponent } from './body/criterios/criterios.component';
import { EstadisticasComponent } from './body/estadisticas/estadisticas.component';
import { MapaRiesgoComponent } from './body/mapa-riesgo/mapa-riesgo.component';
import { ParetoComponent } from './body/pareto/pareto.component';
import { CausasComponent } from './body/causas/causas.component';
import { ControlesComponent } from './body/controles/controles.component';
import { InstructivoComponent } from './body/instructivo/instructivo.component';

const routes: Routes = [
{path: 'metodologia', component: MetodologiaComponent},
{path: 'matriz', component: MatrizComponent},
{path: 'instructivo', component: InstructivoComponent},
{path: 'causas', component: CausasComponent},
{path: 'controles', component: ControlesComponent},
{path: 'criterios', component: CriteriosComponent},
{path: 'estadisticas', component: EstadisticasComponent},
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
