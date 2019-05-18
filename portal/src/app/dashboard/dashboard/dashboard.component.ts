import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ProfileModalComponent } from './profile-modal/profile-modal.component';
import { Politician } from 'src/app/models/politician.model';
import { DashboardService } from '../dashboard.service';
import { trigger, transition, animate, style } from '@angular/animations'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations: [
    trigger('slideInOut', [
      transition(':leave', [
        style({ transform: 'translateX(-100%)' }),
        animate('500ms ease-in', style({ transform: 'translateX(0%)' }))
      ]),
      transition(':leave', [
        animate('500ms ease-in', style({ transform: 'translateX(-100%)' }))
      ])
    ])
  ]

})
export class DashboardComponent implements OnInit {
  judet = '';
  politicians: Politician[] = [];

  constructor(public dialog: MatDialog, private dashService: DashboardService) { }

  ngOnInit() {

  }

  loadPoliticians($event) {
    this.politicians = $event;
    console.log(this.politicians);
    this.judet = this.politicians[0].county;
    document.getElementById('panel2').scrollIntoView();
  }

  scrollTo(ev) {
    switch (ev) {
      case 1: {
        document.getElementById('panel1').scrollIntoView();
        break;
      }
      case 2: {
        document.getElementById('panel2').scrollIntoView();
        break;
      }
    }

  }
  openDialog(): void {
    const dialogRef = this.dialog.open(ProfileModalComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
