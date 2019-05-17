import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PoliticiansRoutingModule } from './politicians-routing.module';
import { PoliticiansComponent } from './politicians/politicians.component';

@NgModule({
  declarations: [PoliticiansComponent],
  imports: [
    CommonModule,
    PoliticiansRoutingModule
  ]
})
export class PoliticiansModule { }
