import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Politician } from 'src/app/models/politician.model';

@Component({
  selector: 'app-profile-modal',
  templateUrl: './profile-modal.component.html',
  styleUrls: ['./profile-modal.component.scss']
})
export class ProfileModalComponent implements OnInit {
  message = {
    from: '',
    to: '',
    msg: '',
    letter: false
  };
  politician: Politician;
  showMessage = false;
  constructor(
    @Inject(MAT_DIALOG_DATA) public injectData: any
  ) {
    this.politician = injectData.politician;
    this.showMessage = injectData.showMsg;
  }

  ngOnInit() {
  }

  submit() {
    console.log(this.message);
  }
}
