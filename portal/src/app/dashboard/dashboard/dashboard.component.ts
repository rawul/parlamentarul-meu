import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ProfileModalComponent } from './profile-modal/profile-modal.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
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
