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

  getUser(): string {
    return localStorage.getItem('user');
  }

  getAllByCounty(county: string) {
    return this.http.get(`http://192.168.6.203:2500/api/v1/politician/${county.toLowerCase()}`);
  }
  // getBrief(missionId: number): Observable<any> {
  //   return this.http.get<any>();
  // }
}
