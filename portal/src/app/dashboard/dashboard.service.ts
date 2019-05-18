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
  // getBrief(missionId: number): Observable<any> {
  //   return this.http.get<any>();
  // }
  getChats(email) {
    return this.http.get('http://192.168.6.203:2500/api/v1/chat/politician?email=' + email)
  }
  postMessage(message: string) {
    return this.http.post('http://192.168.6.203:2500/api/v1/chat/995f82bd-ce01-4a67-816b-b44eae9a7e77f993e908-0476-4ca2-9a0d-73833a776334', { from: 'raulgherasim@gmail.com', content: message })
  }
}
