import { Component, OnInit } from '@angular/core';
import { Politician } from 'src/app/models/politician.model';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AnuntDialogComponent } from 'src/app/politicians/anunt-dialog/anunt-dialog.component';

@Component({
  selector: 'app-personal-profile',
  templateUrl: './personal-profile.component.html',
  styleUrls: ['./personal-profile.component.scss']
})

export class PersonalProfileComponent implements OnInit {
  politician: Politician;
  constructor(
    private router: Router,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    // if (!localStorage.getItem('token')) {
    //   this.router.navigateByUrl('/dashboard');
    // }
    document.getElementById('panel0').scrollIntoView();

    if (localStorage.getItem('politician')) {
      this.politician = (JSON.parse(localStorage.getItem('politician')));
    }

  }

  openAnuntDialog() {
    this.dialog.open(AnuntDialogComponent, { data: this.politician.announcement }).afterClosed().subscribe(x => {
      console.log(x);
    });
  }

}
