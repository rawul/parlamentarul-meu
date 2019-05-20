import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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
    return this.http.get(`http://api.pm.dariuscostolas.me/api/v1/politician/${county.toLowerCase()}`);
  }

  sendMessage(message: any) {
    return this.http.post(`http://api.pm.dariuscostolas.me/api/v1/message`, message);
  }

  getTop10() {
    return this.http.get('http://api.pm.dariuscostolas.me/api/v1/politicians/top10');
  }

  getMostActive() {
    return this.http.get('http://api.pm.dariuscostolas.me/api/v1/politicians/active');
  }

  getChats(email) {
    let header = new HttpHeaders({ 'authorization': localStorage.getItem('token') });
    return this.http.get('http://api.pm.dariuscostolas.me/api/v1/chat/politician?email=' + email, { headers: header })
  }

  getChatByToken(token: string) {
    return this.http.get('http://api.pm.dariuscostolas.me/api/v1/chat/' + token);
  }

  postMessage(message: string, token: string, email: string) {
    return this.http.post('http://api.pm.dariuscostolas.me/api/v1/chat/' + token, { from: email, content: message })
  }

  getAll() {
    return this.http.get('http://api.pm.dariuscostolas.me/api/v1/politicians?page=0&size=8&name=')
  }

  getSearch(text: string) {
    return this.http.get('http://api.pm.dariuscostolas.me/api/v1/politicians?page=0&size=8&name=' + text);
  }

  postAnnouncement(content) {
    let header = new HttpHeaders({ 'authorization': localStorage.getItem('token') });
    return this.http.post('http://api.pm.dariuscostolas.me/api/v1/politician/announcement', { content }, { headers: header });
  }

  getAnnouncements() {
    return this.http.get('http://api.pm.dariuscostolas.me/api/v1/politician/announcement');
  }
  getMore(pageIndex) {
    return this.http.get('http://api.pm.dariuscostolas.me/api/v1/politicians?page=' + pageIndex + '&size=8&name=')
  }
}
