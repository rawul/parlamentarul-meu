import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/compiler/src/core';

@Component({
  selector: 'app-politicians',
  templateUrl: './politicians.component.html',
  styleUrls: ['./politicians.component.scss'],

})
export class PoliticiansComponent implements OnInit {

  politicians: any[] = [
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {}
  ]
  constructor() { }

  ngOnInit() {
  }

}
