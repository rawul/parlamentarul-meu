import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ProfileModalComponent } from './profile-modal/profile-modal.component';
import { Politician, PoliticianType } from 'src/app/models/politician.model';
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  judet = '';
  politicians: Politician[] = [
    new Politician('bob', 'asd', 'usr', 'asda@asd.com', 'bogdanestilor nr 1230', 'omg', 'timis', PoliticianType.deputy)
  ];

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
  openDialog(politician: Politician, showMsg: boolean): void {
    const dialogRef = this.dialog.open(ProfileModalComponent, {
      data: {
        politician: politician,
        showMsg: showMsg
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
