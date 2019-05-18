import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


import { PoliticiansRoutingModule } from './politicians-routing.module';
import { PoliticiansComponent } from './politicians/politicians.component';
import { PersonalProfileComponent } from './personal-profile/personal-profile.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';

@NgModule({
  declarations: [PoliticiansComponent, PersonalProfileComponent, NavBarComponent],
  imports: [
    CommonModule,
    PoliticiansRoutingModule,
    MatTabsModule,
    FontAwesomeModule
  ]
})
export class PoliticiansModule { }
