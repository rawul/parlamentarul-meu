import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PoliticiansComponent } from './politicians/politicians.component';

const routes: Routes = [
  {
    path: '',
    component: PoliticiansComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PoliticiansRoutingModule { }
