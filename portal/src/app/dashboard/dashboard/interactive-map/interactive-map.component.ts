import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-interactive-map',
  templateUrl: './interactive-map.component.html',
  styleUrls: ['./interactive-map.component.scss']
})
export class InteractiveMapComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  judetClicked(ev) {
    console.log(ev.target.attributes['name'].value);
  }

}
