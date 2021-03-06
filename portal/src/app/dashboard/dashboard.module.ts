import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatTabsModule } from '@angular/material/tabs';

import { MatMenuModule } from '@angular/material/menu';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavBarComponent } from './dashboard/nav-bar/nav-bar.component';
import { InteractiveMapComponent } from './dashboard/interactive-map/interactive-map.component';
import { MatDialogModule, MatInputModule, MatButtonModule, MatCheckboxModule, MatTooltipModule } from '@angular/material';
import { LoginModalComponent } from './dashboard/login-modal/login-modal.component'
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginService } from './dashboard/login.service';
import { DashboardService } from './dashboard.service';
import { ProfileModalComponent } from './dashboard/profile-modal/profile-modal.component';
import { TextFieldModule } from '@angular/cdk/text-field';
import { PdfViewerModule } from 'ng2-pdf-viewer';

@NgModule({
  declarations: [DashboardComponent, NavBarComponent, InteractiveMapComponent, LoginModalComponent, ProfileModalComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatDialogModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
    HttpClientModule,
    FontAwesomeModule,
    MatMenuModule,
    MatCheckboxModule,
    TextFieldModule,
    FontAwesomeModule,
    MatTooltipModule,
    MatTabsModule,
    PdfViewerModule
  ],
  entryComponents: [LoginModalComponent, ProfileModalComponent],
  providers: [LoginService, DashboardService]
})
export class DashboardModule { }
