import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


import { PoliticiansRoutingModule } from './politicians-routing.module';
import { PoliticiansComponent } from './politicians/politicians.component';
import { PersonalProfileComponent } from './personal-profile/personal-profile.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { MatDialogModule, MatInputModule, MatButtonModule, MatMenuModule, MatCheckboxModule, MatTooltipModule } from '@angular/material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TextFieldModule } from '@angular/cdk/text-field';

@NgModule({
  declarations: [PoliticiansComponent, PersonalProfileComponent, NavBarComponent],
  imports: [
    CommonModule,
    PoliticiansRoutingModule,
    MatTabsModule,
    FontAwesomeModule,
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
    MatTooltipModule
  ]
})
export class PoliticiansModule { }
