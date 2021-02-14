import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OrderService } from './../../services/order.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import * as moment from 'moment';


@Component({
  selector: 'app-change-order-status',
  templateUrl: './change-order-status.component.html',
  styleUrls: ['./change-order-status.component.css']
})
export class ChangeOrderStatusComponent implements OnInit {
  formGroup: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data, 
  private snackbar : MatSnackBar,
  private dialogRef : MatDialogRef<ChangeOrderStatusComponent>,
  private fb: FormBuilder,
  private orderService: OrderService) { 
    this.currStatNum = data.currentStatus;
    // console.log(this.currStatNum);
    this.OID = data.OID,
    this.SOID = data.SOID,
    this.shippingDetails = data.shippingDetails
    // console.log(this.shippingDetails);
    
  }

  shippingDetails : any;
  OID : any;
  SOID : any;
  currStatNum: any;
  currStat: any;
  formFlag = false
  disableFlag = true
  shipForm : FormGroup
  delFlag = true
  currDate : string

  ngOnInit(): void {
    
    this.createForm();
    switch (this.currStatNum) {
      case 1:
        this.currStat = 'placed';
        break;
      case 2:
        this.currStat = 'confirmed';
        break;
      case 3:
        this.currStat = 'packed';
        break;
      case 4:
        this.currStat = 'shipped';
        break;         
      case 20:
        this.currStat = 'delivered';
        break;
    }
    // console.log(this.currStat);
    
  }
  createForm() {
    if(this.shippingDetails == false)
      this.shipForm = this.fb.group({
        isDetails : [true],
        name : ['', [Validators.required]],
        awb : ['', [Validators.required]],
        website : ['', [Validators.required]]

      })
    else
      this.shipForm = this.fb.group({
        isDetails : [true],
        name : [this.shippingDetails.courierName, [Validators.required]],
        awb : [this.shippingDetails.awb, [Validators.required]],
        website : [this.shippingDetails.courierWebsite, [Validators.required]]

      })
    this.formGroup = this.fb.group({
      date : ['', [Validators.required]]
    })
  }
  update(event) {
    this.disableFlag = !event.checked;
  }

  packIt() {
    this.orderService.packOrder(this.OID, this.SOID)
    .subscribe(res => {
      // console.log(res);
      this.dialogRef.close(res);
      
    })
  }
  updateShip(event) {
    this.formFlag = event.checked
  }
  shipIt() {
    this.orderService.shipOrder(this.OID, this.SOID, this.shipForm.value)
    .subscribe(res => {
      // console.log(res);
      this.dialogRef.close(res);
    })
  }

  updateDel(event) {
    this.currDate = moment(new Date()).format('YYYY-MM-DD')
    // console.log(this.currDate);
    
    this.delFlag = !event.checked
  }
  deliverIt() {
    let date = this.formGroup.get('date').value?.toLocaleString()
    // console.log(this.formGroup.get('date').value?.toLocaleString());
    this.orderService.deliverOrder(this.OID, this.SOID, date )
    .subscribe(res => {
      // console.log(res);
      
      this.dialogRef.close(res)
    })
  }

  updateShipDetails() {
    this.orderService.updateShippingDetails(this.OID, this.SOID, this.shipForm.value)
    .subscribe(res => {
      // console.log(res);
      this.dialogRef.close(res)
      
    })
  }
}
