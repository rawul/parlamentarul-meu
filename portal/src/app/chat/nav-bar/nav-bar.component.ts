import { Component, OnInit, HostListener, Output, EventEmitter } from '@angular/core';
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
  ) { }

  ngOnInit() {
    if (localStorage.getItem('politician')) {
      this.pictureUrl = (JSON.parse(localStorage.getItem('politician'))).pictureUrl;
    }
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
