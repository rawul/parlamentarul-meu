import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Politician } from 'src/app/models/politician.model';
import { DashboardService } from '../../dashboard.service';

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
    @Inject(MAT_DIALOG_DATA) public injectData: any,
    private service: DashboardService,
    private dialog: MatDialogRef<ProfileModalComponent>
  ) {
    this.politician = injectData.politician;
    this.showMessage = injectData.showMsg;
  }

  ngOnInit() {
  }

  submit() {
    console.log(this.message);
    this.service.sendMessage({
      from: this.message.from,
      to: this.politician.email,
      subject: 'New Message',
      content: this.message.msg
    }).subscribe(x => {
      console.log(x);
      this.dialog.close();
    }, err => {
      console.log(err);
    });
  }
}
