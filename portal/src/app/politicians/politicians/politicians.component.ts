import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-politicians',
  templateUrl: './politicians.component.html',
  styleUrls: ['./politicians.component.scss']
})
export class PoliticiansComponent implements OnInit {

  politicians : any[] =[
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
