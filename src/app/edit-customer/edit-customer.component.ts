import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from './../../services/customer.service';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import * as _ from 'lodash';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.css']
})
export class EditCustomerComponent implements OnInit {

  constructor(private cs: CustomerService,  private fb: FormBuilder ,
              private activeroute: ActivatedRoute,
              private route: Router, private snackbar: MatSnackBar
    ) {}

   customer: FormGroup;
   address: FormGroup;
   passwordform: FormGroup;
   length = 0;
   gender = ['male' , 'female' ];
   nameField = '[a-zA-Z ]*';
   phoneNumber = '^[1-9][0-9]*';
   res: any;
   customerData: any;
   id: any = ' ';
   loading = false;
   basic = true;
   addr = false;
   addAddr = false;
   passwordchange = false;
   edit = '';
   addno: any;
   isActive = 0;
   hide = true;
   hide1 = true;
   hide2 = true;
   selectedValue = 'home';
   data = [];
   addresses = [];
   currentAddress: any;

   selected = 'Male';

   ngOnInit(): any{
    this.activeroute.queryParams.subscribe((params) => {
      this.id = params.id;
      this.edit = params.edit;
      console.log(this.id, this.edit);
      this.loading = false;
      this.loading = true;
      this.cs.GetCustomer(this.id).
      subscribe(result => {
        this.loading = false;
        this.res = result.data;
        this.isActive = this.res.status;
        this.customerData = result.data;
        console.log(result);
        if (this.edit === 'basic'){
          this.customer = new FormGroup({
            name : new FormControl('', [Validators.required, Validators.minLength(3), Validators.pattern(this.nameField)]),
            lastname: new FormControl('', [Validators.minLength(3), Validators.pattern(this.nameField)]),
            status: new FormControl('', Validators.required),
            mobile : new FormControl('', [Validators.required, Validators.pattern(this.phoneNumber)]),
            email : new FormControl('', [Validators.required, Validators.email]),
            gender: new FormControl( null , Validators.required)
           });

          this.selected = this.res.gender;
          this.customer.setValue({
            name: this.res.firstName,
            mobile: this.res.mobile,
            email : this.res.email,
            status : this.res.status,
            lastname: this.res.lastName,
            gender: this.res.gender
          });
        }
        else if (this.edit === 'address'){
          this.basic = false;
          this.addr = true;
          this.passwordchange = false;
          this.addno = params.addno;
          console.log(this.addno);
          this.address = new FormGroup({
            adres : new FormControl('', [Validators.required, Validators.minLength(10)]),
            landmark : new FormControl('', Validators.required),
            city : new FormControl('', [Validators.required, Validators.minLength(3)]),
            postal : new FormControl('', [Validators.required, Validators.pattern(this.phoneNumber)]),
            state : new FormControl('', [Validators.required, Validators.minLength(3)]),
            addressType: new FormControl('', Validators.required)
          });
          this.addresses = this.res.addresses;
          this.currentAddress = this.addresses.filter((data) => {
            if (data._id === this.addno)
             {
               return data;
             }
          });
          // console.log(this.currentAddress);
          this.address.setValue({
            adres: this.currentAddress[0].address,
            landmark: this.currentAddress[0].landmark,
            city: this.currentAddress[0].city,
            postal: this.currentAddress[0].pincode,
            state: this.currentAddress[0].state,
            addressType: this.currentAddress[0].addressType,
          });
        }
        else if (this.edit === 'add-address'){
          this.basic = false;
          this.addr = false;
          this.addAddr = true;
          this.passwordchange = false;
          this.address = new FormGroup({
            adres : new FormControl('', [Validators.required, Validators.minLength(10)]),
            landmark : new FormControl('', Validators.required),
            city : new FormControl('', [Validators.required, Validators.minLength(3)]),
            postal : new FormControl('', [Validators.required, Validators.pattern(this.phoneNumber)]),
            state : new FormControl('', [Validators.required, Validators.minLength(3)]),
            addressType: new FormControl('', Validators.required)
          });
        }
        else if (this.edit === 'passwordchange'){
          this.basic = false;
          this.addr = false;
          this.addAddr = false;
          this.passwordchange = true;
          this.passwordform = new FormGroup({
            password : new FormControl('', [Validators.required, Validators.minLength(3)]),
            confirmpassword: new FormControl('', [Validators.required, Validators.minLength(3)])
          });
        }
      }, err => {
        console.log(err);
      });
    }, err => {
      console.log(err);
    });
   }

   save(data): any {
     console.log('basic',data);
     this.loading = true;
     this.cs.updateBasicData(this.id, data).subscribe( result => {
       console.log(result);
       this.loading = false;
       if (result.body.status === 0){
        this.openSnackbar('Basic Details Updated Successfully', 10000);
        this.route.navigate(['/home/customer-management/view-customer' , this.id]);
       }else if (result.body.status === 3){
        this.openSnackbar('unathorized access', 10000);
       }
       else{
        this.openSnackbar('Some error occured while updating', 10000);
       }

     } , err => {
       console.log(err);
       this.loading = false;
       this.openSnackbar('Some error occured while updating', 10000);
     });
   }

   saveAddress(data): any{
    console.log(data);
    this.loading = true;
    this.cs.editAddress(data, this.res._id , this.res.name, this.res.mobile, this.addno).subscribe(result => {
      console.log(result);
      this.loading = false;
      if (result.body.status === 0){
        this.openSnackbar('Address Updated Successfully', 10000);
        this.route.navigate(['/home/customer-management/view-customer' , this.id]);
       }else if (result.body.status === 3){
        this.openSnackbar('unathorized access', 10000);
       }
       else{
        this.openSnackbar('Some error occured while updating', 10000);
       }
    }, err => {
      console.log(err);
      this.loading = false;
      this.openSnackbar('Some error occured while retrieving', 10000);
    });
   }

   addAddress(data: any): any {
    console.log(data);
    this.loading = true;
    this.cs.addNewAddress(data, this.res._id , this.res.name, this.res.mobile).subscribe(result => {
      console.log(result);
      this.loading = false;
      if (result.body.status === 0){
        this.openSnackbar('Address Added Successfully', 10000);
        this.route.navigate(['/home/customer-management/view-customer' , this.id]);
       }else if (result.body.status === 3){
        this.openSnackbar('unathorized access', 10000);
       }
       else{
        this.openSnackbar('Some error occured while updating', 10000);
       }
    }, err => {
      console.log(err);
      this.loading = false;
      this.openSnackbar('Some error occured while retrieving', 10000);
    });
  }

  updatePassword(data: any): any{
    this.loading = true;
    this.cs.updatePassword(data, this.res._id).subscribe(result => {
      console.log(result);
      this.loading = false;
      if (result.body.status === 0){
        this.openSnackbar('Password Updated Successfully', 10000);
        this.route.navigate(['/home/customer-management/view-customer' , this.id]);
       }else if (result.body.status === 3){
        this.openSnackbar('unathorized access', 10000);
       }
       else{
        this.openSnackbar('Some error occured while updating', 10000);
       }
    }, err => {
      console.log(err);
      this.loading = false;
      this.openSnackbar('Some error occured while retrieving', 10000);
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
