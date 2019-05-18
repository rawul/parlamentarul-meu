import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(
    private http: HttpClient
  ) { }

  getToken(): string {
    return localStorage.getItem('token');
  }

  getAllByCounty(county: string) {
    return this.http.get(`http://192.168.6.203:2500/api/v1/politician/${county.toLowerCase()}`);
  }

  sendMessage(message: any) {
    return this.http.post(`http://192.168.6.203:2500/api/v1/message`, message);

  }

  // getBrief(missionId: number): Observable<any> {
  //   return this.http.get<any>();
  // }
  getChats(email) {
    return this.http.get('http://192.168.6.203:2500/api/v1/chat/politician?email=' + email)
  }
  getChatByToken(token: string) {
    return this.http.get('http://192.168.6.203:2500/api/v1/chat/' + token);
  }
  postMessage(message: string, token: string, email: string) {
    return this.http.post('http://192.168.6.203:2500/api/v1/chat/' + token, { from: email, content: message })
  }
  getAll() {
    return this.http.get('http://192.168.6.203:2500/api/v1/politicians')
  }
  getSearch(text: string) {
    return this.http.get('http://192.168.6.203:2500/api/v1/politicians?name=' + text);
  }
}
