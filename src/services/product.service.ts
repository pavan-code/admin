import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { config } from '../app/config.js';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  addNewProduct(productDetails):Observable<any> {
    
    return this.http.post(config.server + 'addProduct', productDetails);
  }

  getAllProducts(): Observable<any> {
    return this.http.get(config.server + 'getAllProducts');
  }

  getProductByID(productID): Observable<any> {
    return this.http.get(config.server + 'getProductByID?productID=' + productID);
  }

  updateProduct(productDetails): Observable<any> {
    return this.http.post(config.server + 'updateProduct', productDetails);
  }

  addToDailyDeals(id): Observable<any> {  
    let obj = {
      "productID" : id
    }     
    return this.http.post(config.server + 'dailydeals/add', obj)    
  }

  removeFromDailyDeals(id): Observable<any> {
    let obj = {
      "productID" : id
    }  
    return this.http.post(config.server + 'dailydeals/remove', obj)
  }

  getAllDialyDeals(): Observable<any> {
    return this.http.get(config.server + 'dailydeals/get')
  }

  addToTrending(id): Observable<any> {
    let obj = {
      "productID" : id
    }  
    return this.http.post(config.server + 'trendingproducts/add', obj)
  }

  removeFromTrending(id): Observable<any> {
    let obj = {
      "productID" : id
    }  
    return this.http.post(config.server + 'trendingproducts/remove', obj)
  }

  getAllTrending(): Observable<any> {
    return this.http.get(config.server + 'trendingproducts/get')
  }

  addToAllProducts(id): Observable<any> {
    let obj = {
      "productID" : id
    }  
    return this.http.post(config.server + 'ourallproducts/add', obj)
  }

  removeFromAllProducts(id): Observable<any> {
    let obj = {
      "productID" : id
    }  
    return this.http.post(config.server + 'ourallproducts/remove', obj)
  }

  getAllOurProducts(): Observable<any> {
    return this.http.get(config.server + 'ourallproducts/get')
  }

  getAllCategories(): Observable<any> {
    return this.http.get(config.server + 'getAllCategoryList')
  }
}
