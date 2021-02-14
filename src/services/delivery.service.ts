import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { config } from '../app/config.js'
@Injectable({
  providedIn: 'root'
})
export class DeliveryService {

  constructor(private http: HttpClient) { }

  updateLocations(file):Observable<any> {
    let obj = {
      "file" : file
    }
    return this.http.post(config.server + 'delivery/updateLocations', obj)
  }
}
