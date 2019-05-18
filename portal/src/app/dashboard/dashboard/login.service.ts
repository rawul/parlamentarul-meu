import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private http: HttpClient
  ) { }

  login(email, password) {
    return this.http.post('/api/auth', {
      email, password
    });
  }
  getLogin(username, password): Observable<any> {
    return this.http.post('http://192.168.6.203:2500/api/v1/login', { username: username, password: password });
  }
}
