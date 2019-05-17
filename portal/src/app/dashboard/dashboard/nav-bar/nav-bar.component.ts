import { Component, OnInit, HostListener, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material';
import { LoginModalComponent } from '../login-modal/login-modal.component';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  @Output() scrollTo = new EventEmitter<number>();
  constructor(
    private dialog: MatDialog
  ) { }

  ngOnInit() {
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
