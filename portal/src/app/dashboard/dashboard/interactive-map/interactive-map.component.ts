import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DashboardService } from '../../dashboard.service';
import { Politician } from 'src/app/models/politician.model';

@Component({
  selector: 'app-interactive-map',
  templateUrl: './interactive-map.component.html',
  styleUrls: ['./interactive-map.component.scss']
})
export class InteractiveMapComponent implements OnInit {

  @Output() politicians = new EventEmitter<any>();

  constructor(
    private dashService: DashboardService
  ) { }

  ngOnInit() {
  }

  judetClicked(ev) {
    this.dashService.getAllByCounty(ev.target.attributes['name'].value).subscribe(x => {
      this.politicians.next(x);
    }, err => {
      console.log(err);
    });
  }

}
