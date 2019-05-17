import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
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
