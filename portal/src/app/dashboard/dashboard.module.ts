import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavBarComponent } from './dashboard/nav-bar/nav-bar.component';
import { InteractiveMapComponent } from './dashboard/interactive-map/interactive-map.component';

@NgModule({
  declarations: [DashboardComponent, NavBarComponent, InteractiveMapComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
