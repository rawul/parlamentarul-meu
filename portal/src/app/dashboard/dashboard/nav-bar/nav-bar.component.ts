import { Component, OnInit, HostListener, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material';
import { LoginModalComponent } from '../login-modal/login-modal.component';
import { DashboardService } from '../../dashboard.service';
import { faUser } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  @Output() scrollTo = new EventEmitter<number>();
  isLoggedIn: boolean = false;
  faUser = faUser;
  constructor(
    private dialog: MatDialog,
    private service: DashboardService
  ) { }

  ngOnInit() {
    if (this.service.getUser()) {
      this.isLoggedIn = true;
    }
  }

  scroll(i) {
    this.scrollTo.next(i);
  }

  showLoginModal() {
    this.dialog.open(LoginModalComponent);
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
