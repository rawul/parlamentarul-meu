import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavBarComponent } from './dashboard/nav-bar/nav-bar.component';
import { InteractiveMapComponent } from './dashboard/interactive-map/interactive-map.component';
import { MatDialogModule, MatInputModule, MatButtonModule } from '@angular/material';
import { LoginModalComponent } from './dashboard/login-modal/login-modal.component'
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginService } from './dashboard/login.service';
@NgModule({
  declarations: [DashboardComponent, NavBarComponent, InteractiveMapComponent, LoginModalComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatDialogModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
    HttpClientModule
  ],
  entryComponents: [LoginModalComponent],
  providers:[LoginService]
})
export class DashboardModule { }
