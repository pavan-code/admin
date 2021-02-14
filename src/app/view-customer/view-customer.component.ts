import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CustomerService } from './../../services/customer.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-view-customer',
  templateUrl: './view-customer.component.html',
  styleUrls: ['./view-customer.component.css']
})
export class ViewCustomerComponent implements OnInit {


  id: any = ' --- ';
  constructor( private activeroute: ActivatedRoute , private cs: CustomerService , private snackbar: MatSnackBar) {
  }
  loading = true;
  res: any;
  orders = [];
  addresses = [];
  ol = 0;
  al = 0;
  panelOpenState = false;

  customerData: any;

  ngOnInit(): void {
    this.loading = true;
    this.activeroute.params.subscribe((params) => {
      this.id = params.id;
      this.cs.GetCustomer(this.id).subscribe(result => {
        this.loading = false;
        if (result.status === 0) {
          this.res = result.data;
          this.customerData = this.res;
          this.orders = this.customerData.cart;
          this.addresses = this.customerData.addresses;
          this.ol = this.orders.length;
          this.al =  this.addresses.length;
          console.log(result.data);
         } else if (result.status === 3) {
          this.openSnackbar('Unauthorized to perform this action', 10000);
        }
        else{
          this.openSnackbar('Some error occured while retrieving', 10000);
        }

      }, err => {
        this.loading = false;
        this.openSnackbar('Some error occured while retrieving', 10000);
      });
      console.log(this.id);
    }, err => {
      this.loading = false;
      this.openSnackbar('Some error occured while retrieving', 10000);
    });
  }

  deleteAddress(add: any): any{
    this.loading = true;
    this.cs.deleteAddressById(this.id, add).subscribe(result => {
      console.log(result);
      this.loading = false;
      if (result.status === 0) {
        this.ngOnInit();
        this.openSnackbar('Address Deleted successfully', 10000);
       } else if (result.status === 3) {
        this.openSnackbar('Unauthorized to perform this action', 10000);
      }
      else{
        this.openSnackbar('Some error occured while deleting', 10000);
      }
    }, err => {
      this.loading = false;
      this.openSnackbar('Some error occured while deleting', 10000);
      console.log(err);
    });
  }

  openSnackbar(message, duration: number): any {
    this.snackbar.open(message, 'close', {
      duration,
      verticalPosition: 'top',
      horizontalPosition: 'center',
    });
  }

}
