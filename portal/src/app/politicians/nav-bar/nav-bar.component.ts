import { Component, OnInit } from '@angular/core';
import { faUser, faPowerOff } from '@fortawesome/free-solid-svg-icons';
import { MatDialog } from '@angular/material';
import { DashboardService } from 'src/app/dashboard/dashboard.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  faUser = faUser;
  faPowerOff = faPowerOff;
  pictureUrl: string = 'https://www.newmoney.ro/wp-content/uploads/2019/03/dragnea-mediafax-newmoney-2-840x600.jpg';

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    if (localStorage.getItem('politician')) {
      this.pictureUrl = (JSON.parse(localStorage.getItem('politician'))).pictureUrl;
    }
  }
  logout() {
    localStorage.clear();
    this.router.navigateByUrl('/dashboard');
  }

}
