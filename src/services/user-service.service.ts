import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { config } from '../app/config.js';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  res = [];
  log =[];
  getData(){
    return this.http.get(config.server + 'getAllUsers');
  }
  getItemData(userName:any){
    return this.http.get(config.server + 'getAdminDetails?username=' + userName );
  }
  editItemData(data:any){
    return this.http.post(config.server + 'changeUserBasicDetails', data)
  }
  addData(data:any){
    return this.http.post(config.server + 'newadmin',data);
  }
  
  editPassword(data:any){
    return this.http.post(config.server + 'changeUserPassword',data);
    
  }
  getlogs(username:string){
    return this.http.get(config.server + 'getAdminLogs?username=' + username);
  }
  constructor(private http:HttpClient) { }
}
