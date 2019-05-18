import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor() { }

  getUser(): string {
    return localStorage.getItem('user');
  }
  // getBrief(missionId: number): Observable<any> {
  //   return this.http.get<any>();
  // }
}
