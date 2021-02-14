import { MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-approval',
  templateUrl: './order-approval.component.html',
  styleUrls: ['./order-approval.component.css']
})
export class OrderApprovalComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<OrderApprovalComponent>) { }

  ngOnInit(): void {
  }
  save(value) {    
    this.dialogRef.close(value)
  }
}
