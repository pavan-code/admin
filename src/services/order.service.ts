import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { config } from '../app/config.js'
@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  getAllOrders():Observable<any> {
    return this.http.get(config.server + 'orders/get')
  }

  getOrder(orderID, subOrderID):Observable<any> {
    let obj = {
      orderID : orderID,
      subOrderID : subOrderID
    }       
    return this.http.post(config.server + 'order/get-details', obj)
  }

  updateRefundDetails(data): Observable<any> {
    let obj = {
      orderID : data.OID,
      subOrderID : data.SOID,
      refundDetails : {
        isRefund : data.isRefund,
        refundAmount : data.refAmount,
        bankReferenceNumber : data.bankRefNum,
        refundedTo : data.refundedTo
      }
    }
    // console.log('service:',obj);
    
    return this.http.post(config.server + 'order/update-refund', obj)
  }

  acceptOrder(oid, soid): Observable<any> {
    let obj = {
      orderID : oid,
      subOrderID : soid
    }
    console.log(obj);
    
    return this.http.post(config.server + 'orders/accept', obj)
  }

  rejectOrder(oid, soid): Observable<any> {
    let obj = {
      orderID : oid,
      subOrderID : soid
    }
    return this.http.post(config.server + 'order/reject', obj)
  }

  packOrder(oid, soid): Observable<any> {
    let obj = {
      orderID : oid,
      subOrderID : soid
    }
    return this.http.post(config.server + 'order/mark-packed', obj)
  }
  
  shipOrder(oid, soid, shipDetails): Observable<any> {
    let obj = {
      orderID : oid,
      subOrderID : soid,
      shippingDetails : {
        isDetails : shipDetails.isDetails,
        courierName : shipDetails.name,
        awb : shipDetails.awb,
        courierWebsite : shipDetails.website
      }
    }
    console.log(obj);
    
    return this.http.post(config.server + 'order/mark-shipped', obj)
  }

  deliverOrder(oid, soid, date): Observable<any> {
    let obj = {
      orderID : oid,
      subOrderID : soid,
      deliveryTime : date
    }

    return this.http.post(config.server + 'order/mark-delivered', obj)
  }

  updateShippingDetails(oid, soid, shipDetails): Observable<any> {
    let obj = {
      orderID : oid,
      subOrderID : soid,
      shippingDetails : {
        isDetails : true,
        courierName : shipDetails.name,
        awb : shipDetails.awb,
        courierWebsite : shipDetails.website
      }
    }
    console.log(obj);
    

    return this.http.post(config.server + 'order/update-shipping-details', obj)
  }
}
