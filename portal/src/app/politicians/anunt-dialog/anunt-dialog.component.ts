import { Component, OnInit, Inject, Optional } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { DashboardService } from '../../dashboard/dashboard.service';

@Component({
  selector: 'app-anunt-dialog',
  templateUrl: './anunt-dialog.component.html',
  styleUrls: ['./anunt-dialog.component.scss']
})
export class AnuntDialogComponent implements OnInit {
  content: '';
  constructor(
    public dialogRef: MatDialogRef<AnuntDialogComponent>,
    private dashService: DashboardService
  ) {
    this.content = JSON.parse(localStorage.getItem('politician')).announcement ? JSON.parse(localStorage.getItem('politician')).announcement : '';
  }

  ngOnInit() {
  }

  save() {
    console.log(this.content);
    this.dashService.postAnnouncement(this.content).subscribe(x => {
      console.log(x);
      const z = JSON.parse(localStorage.getItem('politician'));
      z.announcement = this.content;
      localStorage.setItem('politician', JSON.stringify(z));
      this.dialogRef.close();
    }, err => {
      console.log(err);
      this.dialogRef.close();
    })
  }

}
