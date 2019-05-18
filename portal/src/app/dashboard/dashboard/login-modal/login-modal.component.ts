import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss']
})
export class LoginModalComponent implements OnInit {
  user = {
    email: '',
    password: ''
  }
  constructor(
    private loginService: LoginService,
    public dialogRef: MatDialogRef<LoginModalComponent>
  ) { }

  ngOnInit() {
  }

  submit() {
    console.log(this.user);
    this.loginService.getLogin(this.user.email, this.user.password).subscribe((response) => {
      console.log(response);
      localStorage.setItem('token', response.token)
      localStorage.setItem('politician', JSON.stringify(response.politician));
      this.dialogRef.close('success');
    }, err => {
      console.log(err);
    });
  }

}
