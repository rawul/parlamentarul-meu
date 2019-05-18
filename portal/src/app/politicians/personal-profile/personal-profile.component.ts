import { Component, OnInit } from '@angular/core';
import { Politician } from 'src/app/models/politician.model';

@Component({
  selector: 'app-personal-profile',
  templateUrl: './personal-profile.component.html',
  styleUrls: ['./personal-profile.component.scss']
})

export class PersonalProfileComponent implements OnInit {
  politician: Politician;
  constructor(
  ) { }

  ngOnInit() {
    if (localStorage.getItem('politician')) {
      this.politician = (JSON.parse(localStorage.getItem('politician')));
    }
  }

}
