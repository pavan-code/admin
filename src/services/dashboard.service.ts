import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { config } from '../app/config.js'
@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor( private http: HttpClient) { }
  
  getDashboardData(): Observable<any> {
    return this.http.get(config.server + 'dashboard/data')
  }

}
