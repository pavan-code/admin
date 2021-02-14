import { Injectable } from '@angular/core';
import { config } from '../app/config.js';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {


  constructor(private http: HttpClient) { }


  updateBasicData( id: any , data: any): Observable<any>{
    console.log(data);
    const Body = {
      _id : id,
      firstName : data.name,
      mobile : data.mobile,
      email : data.email,
      status : data.status,
      isMobileVerified : true,
      isEmailVerified : true,
      lastName: data.lastname,
      gender: data.gender
      };
    return this.http.post(config.server + 'customer/updateBasic' , Body , {
      observe: 'response'
    });
  }

  addNewCustomer(data: any): Observable<any> {
    const customer = {

      firstName : data.name,
      lastName: data.lastname,
      gender: data.gender,
      mobile : data.mobile,
      email : data.email,
      password : data.password,
      status : true,
      isMobileVerified : true,
      isEmailVerified : true

      };

    console.log(customer);
    return this.http.post(config.server + 'customer/new' , customer );
  }

  GetCustomerData(): Observable<any>{
    return this.http.get(config.server + 'customer/getAll');
  }

  GetCustomer(id: any): Observable<any>{
    return this.http.get(config.server + 'customer/getDetails?customerID=' + id);
  }

  addNewAddress(data: any, id: any, name: any, mobile: any): Observable<any>{
    console.log(data, id, name, mobile);
    const address = {
      _id : id,
      address: {
        name : name,
        mobile : mobile,
        address : data.adres,
        pincode : data.postal,
        city :  data.city,
        state : data.state,
        landmark : data.landmark,
        addressType : data.addressType
        }
    };
    return this.http.post(config.server + 'customer/addAddress' , address  ,{
      observe: 'response'
    });
  }

  editAddress(data: any, id: any, name: any, mobile: any , add_id: any): Observable<any>{
    console.log(data, id, name, mobile , add_id );
    const address = {
      _id : id,
      address: {
        _id: add_id,
        name : name,
        mobile : mobile,
        address : data.adres,
        pincode : data.postal,
        city :  data.city,
        state : data.state,
        landmark : data.landmark,
        addressType : data.addressType
        }
    };
    return this.http.post(config.server + 'customer/updateAddress' , address,  {
      observe: 'response'
    } );
  }

  deleteAddressById(customerId: any, addressId: any): Observable<any>{
    const body = {
      _id : customerId,
      addressID : addressId
    };
    return this.http.post(config.server + 'customer/removeAddress' , body);
  }

  updatePassword(data: any , id: any): Observable<any>{
    const body = {
      _id : id,
      password: data.password,
      confirmPassword: data.confirmpassword
    };
    return this.http.post(config.server + 'customer/updatePassword' , body ,  {
      observe: 'response'
    });
  }

}
