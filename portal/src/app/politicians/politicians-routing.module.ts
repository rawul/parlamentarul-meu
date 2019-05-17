import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PoliticiansComponent } from './politicians/politicians.component';
import { PersonalProfileComponent } from './personal-profile/personal-profile.component';

const routes: Routes = [
  {
    path: '',
    component: PoliticiansComponent
  },
  {
    path: 'profile',
    component: PersonalProfileComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PoliticiansRoutingModule { }
