import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MetodologiaComponent } from './body/metodologia/metodologia.component';
import { MatrizComponent } from './body/matriz/matriz.component';

const routes: Routes = [
{path: 'metodologia', component: MetodologiaComponent},
{path: 'matriz', component: MatrizComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
