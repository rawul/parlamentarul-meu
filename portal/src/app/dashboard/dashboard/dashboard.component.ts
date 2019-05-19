import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ProfileModalComponent } from './profile-modal/profile-modal.component';
import { Politician, PoliticianType } from 'src/app/models/politician.model';
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
  searchText: string;
  politicians: Politician[] = [];
  top10;

  constructor(public dialog: MatDialog, private dashService: DashboardService) { }

  ngOnInit() {
    this.dashService.getAll().subscribe((x: any) => {
      this.politicians = x;
      console.log(this.politicians);
    })
    this.dashService.getTop10().subscribe(x => {
      console.log(x);
      this.top10 = x;
    });
    this.dashService.getMostActive().subscribe((x: Politician[]) => {
      console.log(x);
      this.politicians = x;
    });
  }

  loadPoliticians($event) {
    this.politicians = $event;
    console.log(this.politicians);
    this.judet = this.politicians[0].county;
    document.getElementById('panel2').scrollIntoView();
  }

  seeAll() {
    this.dashService.getAll().subscribe((x: any) => {
      this.politicians = x;
    })
    document.getElementById('panel2').scrollIntoView();
  }

  scrollTo(ev) {
    switch (ev) {
      case 0: {
        document.getElementById('panel0').scrollIntoView();
        break;
      }
      case 1: {
        document.getElementById('panel1').scrollIntoView();
        break;
      }
      case 2: {
        document.getElementById('panel2').scrollIntoView();
        break;
      }
      case 3: {
        document.getElementById('panel3').scrollIntoView();
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
    });
  }
  search() {
    this.dashService.getSearch(this.searchText).subscribe((x: any) => {
      this.politicians = x;
    })
  }
}
