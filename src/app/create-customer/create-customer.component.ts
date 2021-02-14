import { Router } from '@angular/router';
import { CustomerService } from './../../services/customer.service';
import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import * as _ from 'lodash';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.css']
})
export class CreateCustomerComponent implements OnInit {

  constructor(private dialog: MatDialog, private fb: FormBuilder, private cs: CustomerService ,
              private route: Router, private snackbar: MatSnackBar) {}

   customer: FormGroup;
   address: FormGroup;
   length = 0;
   words = [];
   gender = ['male' , 'female' ];
   nameField = '[a-zA-Z ]*';
   phoneNumber = '^[1-9][0-9]*';
   loading = false;
   hide = true;
   selectedValue = 'Male';

   ngOnInit(): void{
     this.customer = new FormGroup({
      name : new FormControl('', [Validators.required, Validators.minLength(3), Validators.pattern(this.nameField)]),
      lastname: new FormControl('', [Validators.minLength(3), Validators.pattern(this.nameField)]),
      password : new FormControl('', [Validators.required, Validators.minLength(8)]),
      mobile : new FormControl('', [Validators.required, Validators.pattern(this.phoneNumber)]),
      email : new FormControl('', [Validators.required, Validators.email]),
      gender: new FormControl( '', Validators.required)
     });
   }



  openSnackbar(message, duration: number): any {
    this.snackbar.open(message, 'close', {
      duration,
      verticalPosition: 'top',
      horizontalPosition: 'center',
    });
  }
   save(data): void {
     this.loading = true;
     console.log(data , this.customer);
     this.cs.addNewCustomer(data).subscribe(res => {
       console.log(res);
       this.loading = false;
       if (res.status === 0) {
        this.openSnackbar('Customer Added Successfully', 10000);
       } else if (res.status === 2) {
        this.openSnackbar('Customer is already added', 10000);
      } else if (res.status === 3) {
        this.openSnackbar('Unauthorized to perform this action', 10000);
      }
      else{
        this.openSnackbar('Some error occured while adding', 10000);
      }
     }, err => {
       console.log(err);
       this.loading = false;
       this.openSnackbar('Some error occured while adding', 10000);
     });
     // this.route.navigate(['/home/all-customers']);
   }

}

