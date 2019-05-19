import { Component, OnInit, Inject, Sanitizer } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Politician } from 'src/app/models/politician.model';
import { DashboardService } from '../../dashboard.service';
import { DomSanitizer } from '@angular/platform-browser';

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
  activeTab = 0;
  politician: Politician;
  showMessage = false;
  constructor(
    @Inject(MAT_DIALOG_DATA) public injectData: any,
    private service: DashboardService,
    private dialog: MatDialogRef<ProfileModalComponent>,
    private sanitizer: DomSanitizer
  ) {
    this.politician = injectData.politician;
    console.log(this.politician);
    if (this.politician.wealthDeclaration)
      this.politician.wealthDeclaration = this.sanitizer.bypassSecurityTrustResourceUrl(this.politician.wealthDeclaration)
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
  selectTab(index) {
    if (index == 1 && !this.politician.wealthDeclaration)
      return;
    if (index == 2 && !this.politician.announcements)
      return;
    this.activeTab = index;
  }
  photoURL(data) {
    console.log(this.sanitizer.bypassSecurityTrustUrl(data));
    return this.sanitizer.bypassSecurityTrustUrl(data);
  }
}
