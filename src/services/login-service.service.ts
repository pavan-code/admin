import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { config } from '../app/config.js'


class user {
  username : string;
  password : string;
  data: any;
  status : number;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  constructor(private http: HttpClient) { }

  adminLogin(userDetails : user): Observable<user> {   
    
    return this.http.post<user>(config.server + 'login', userDetails)
  
  }

  adminLogout() {
    
    return this.http.post(config.server + 'logout', {})

  }
  loggedIn() {
    const item = JSON.parse(localStorage.getItem('Token'))
    // console.log(item);
    if(!item) {
      return false;
    }
    else {
      const now = new Date();
      if(now.getTime() > item.expiry) {
        return false;
      }
      else {
        return true;
      }
    }
    
  }

}
