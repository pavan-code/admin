import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-refund',
  templateUrl: './add-refund.component.html',
  styleUrls: ['./add-refund.component.css']
})
export class AddRefundComponent implements OnInit {
  formValue: any;
  refundData: any;
  type : string;
  constructor(private fb: FormBuilder, private dialogRef : MatDialogRef<AddRefundComponent>,
      @Inject(MAT_DIALOG_DATA) public data
    ) {
      this.type = data.type;
      this.refundData = data.data
     }

  refundForm : FormGroup;
  checked =  false;
  ngOnInit(): void {
    if(this.type == 'add')      
      this.createForm();
    else {
      this.checked = true
        this.refundForm = this.fb.group({
        bankRefNum : [this.refundData.bankReferenceNumber, [Validators.required]],
        refAmount : [this.refundData.refundAmount, [Validators.required]],
        refundedTo : [this.refundData.refundedTo, [Validators.required]]
      })
    }
        
  }
  createForm() {
    this.refundForm = this.fb.group({      
      bankRefNum : ['', [Validators.required]],
      refAmount : ['', [Validators.required]],
      refundedTo : ['', [Validators.required]]
    })
  }
  call(event) {    
    this.checked = event.checked;
  }
  save() {
    if(this.type == 'add') {
      this.formValue = this.refundForm.value
      this.formValue.isRefund = this.checked
      this.dialogRef.close(this.formValue);
    } else {
      if(this.checked == false) {
        this.refundForm.reset();
        this.formValue = this.refundForm.value;
        this.formValue.isRefund = false;
        this.dialogRef.close(this.formValue)
      } else {
        this.formValue = this.refundForm.value
        this.formValue.isRefund = this.checked
        this.dialogRef.close(this.formValue);
      }
    }
  }

}
