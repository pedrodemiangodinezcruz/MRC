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
{path: 'causas', component: CausasComponent},
{path: 'controles', component: ControlesComponent},
{path: 'criterios', component: CriteriosComponent},
{path: 'estadisticas', component: EstadisticasComponent},
{path: 'mapaResidual', component: MapaResidualComponent},
{path: 'mapaRiesgo', component: MapaRiesgoComponent},
{path: 'pareto', component: ParetoComponent },
{path: 'Concepto al Producto', component: ParetoComponent },
{path: 'Compra al Pago', component: ParetoComponent },
{path: 'Demanda al Abasto', component: ParetoComponent },
{path: 'Pedido al Cobro', component: ParetoComponent },
{path: 'Mantenimiento a la Liquidación', component: ParetoComponent },
{path: 'Inversión a la Desinversión', component: ParetoComponent },
{path: 'Finanzas a la Administración', component: ParetoComponent },
{path: 'Contratación al Retiro', component: ParetoComponent },
{path: 'Procesos Criticos fuera de Macros', component: ParetoComponent },
{path: 'instructivo', component: InstructivoComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
