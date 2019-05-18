import { Component, OnInit, HostListener, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material';
import { LoginModalComponent } from '../login-modal/login-modal.component';
import { DashboardService } from '../../dashboard.service';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faSortDown } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  @Output() scrollTo = new EventEmitter<number>();
  isLoggedIn: boolean = false;
  faUser = faUser;
  faSortDown = faSortDown;
  pictureUrl: string = 'https://www.newmoney.ro/wp-content/uploads/2019/03/dragnea-mediafax-newmoney-2-840x600.jpg';
  constructor(
    private dialog: MatDialog,
    private service: DashboardService
  ) { }

  ngOnInit() {
    if (this.service.getToken()) {
      this.isLoggedIn = true;
    }
    if (localStorage.getItem('politician')) {
      this.pictureUrl = (JSON.parse(localStorage.getItem('politician'))).pictureUrl;
    }
  }

  scroll(i) {
    this.scrollTo.next(i);
  }

  showLoginModal() {
    let dialogRef = this.dialog.open(LoginModalComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'success') {
        if (this.service.getToken())
          this.isLoggedIn = true;
        this.pictureUrl = (JSON.parse(localStorage.getItem('politician'))).pictureUrl;
      }
      if (this.service.getToken())
        this.isLoggedIn = true;
    })
  }
  logout() {
    localStorage.clear();
    this.isLoggedIn = false;
  }

  // @HostListener("window:scroll", [])
  // onWindowScroll() {
  //   //we'll do some stuff here when the window is scrolled
  //   if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
  //     document.getElementById("navbar").style.top = "0";
  //   } else {
  //     document.getElementById("navbar").style.top = "-64px";
  //   }
  // }

}
