import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';

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
  constructor(private loginService: LoginService) { }

  ngOnInit() {
  }

  submit() {
    console.log(this.user);
    this.loginService.getLogin(this.user.email, this.user.password).subscribe(x => {
      console.log(x);
    }, err => {
      console.log(err);
    });
  }

}
