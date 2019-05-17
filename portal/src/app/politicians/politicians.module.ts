import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';


import { PoliticiansRoutingModule } from './politicians-routing.module';
import { PoliticiansComponent } from './politicians/politicians.component';
import { PersonalProfileComponent } from './personal-profile/personal-profile.component';

@NgModule({
  declarations: [PoliticiansComponent, PersonalProfileComponent],
  imports: [
    CommonModule,
    PoliticiansRoutingModule,
    MatTabsModule
  ]
})
export class PoliticiansModule { }
