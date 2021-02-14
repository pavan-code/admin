import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { config } from '../app/config.js';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }
  addNewCategory(details):Observable<any> {
    
    return this.http.post(config.server + 'addNewCategory', details);
  }
  getAllCategories(): Observable<any> {
    return this.http.get(config.server + 'getAllCategories');
  }

  getCategoryByID(productID): Observable<any> {
    return this.http.get(config.server + 'getCategoryByID?categoryID=' + productID);
  }
  updateCategory(updatedetails):Observable<any> {
    
    return this.http.post(config.server + 'updateCategory', updatedetails);
  }
}
