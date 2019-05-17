import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavBarComponent } from './dashboard/nav-bar/nav-bar.component';
import { InteractiveMapComponent } from './dashboard/interactive-map/interactive-map.component';
import { ProfileModalComponent } from './dashboard/profile-modal/profile-modal.component';

@NgModule({
  declarations: [DashboardComponent, NavBarComponent, InteractiveMapComponent, ProfileModalComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatDialogModule
  ],
  entryComponents: [
    ProfileModalComponent
  ]
})
export class DashboardModule { }
