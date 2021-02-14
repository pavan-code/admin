import { ChangeOrderStatusComponent } from './../change-order-status/change-order-status.component';
import { OrderApprovalComponent } from './../order-approval/order-approval.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddRefundComponent } from './../add-refund/add-refund.component';
import { MatDialog } from '@angular/material/dialog';
import { OrderService } from './../../services/order.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { config } from '../config.js';

@Component({
  selector: 'app-view-order-details',
  templateUrl: './view-order-details.component.html',
  styleUrls: ['./view-order-details.component.css'],
})
export class ViewOrderDetailsComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService,
    private dialog : MatDialog,
    private snackbar: MatSnackBar,
    
  ) {}
  details: any;
  config: string;
  public counts = [
    'placed',
    'confirmed',
    'packed',
    'shipped',    
    'delivered',
  ];
  suborders = [];
  show = true;
  OID: string;
  SOID: string;
  public orderStatus = '';
  ngOnInit(): void {
    this.config = config.server;
    this.route.params.subscribe((params) => {
      this.OID = params['orderID'];
      this.SOID = params['subOrderID'];
      this.orderService.getOrder(this.OID, this.SOID).subscribe((res) => {
        // console.log(res.data);
        this.suborders = res.data.otherOrderItems;
        this.show = false
        this.details = res.data;
        // this.details.itemStatus = 20        
        switch (this.details.itemStatus) {
          case 1:
            this.orderStatus = 'placed';
            break;
          case 2:
            this.orderStatus = 'confirmed';
            break;
          case 3:
            this.orderStatus = 'packed';
            break;
          case 4:
            this.orderStatus = 'shipped';
            break;         
          case 20:
            this.orderStatus = 'delivered';
            break;
        }
      });
    });
  }
  openSnackbar(message) {
    this.snackbar.open(message, '', {
      duration: 2000,
      verticalPosition: 'top',
      horizontalPosition: 'center'
    })     
    location.reload();
  }
  openDialog() {
    this.dialog.open(AddRefundComponent, {
      width: '500px',
      height: 'auto',
      disableClose: true,
      data: {
        type: 'add'
      }
    }).afterClosed().subscribe(res => {
      // console.log('after closed',res);
      
      res.OID = this.OID
      res.SOID = this.SOID
      this.orderService.updateRefundDetails(res)
      .subscribe(res => {
        // console.log(res);   
        if(res.status == 0) {
          this.openSnackbar(res.message)
        }
      })      
    })
  }

  openDialogUpdate() {
    this.dialog.open(AddRefundComponent, {
      width: '500px',
      height: 'auto',
      disableClose: true,
      data :  {
        type : 'edit',
        data : this.details.refundDetails
      }
    }).afterClosed().subscribe(res => {
      // console.log('after update', res);
      res.OID = this.OID
      res.SOID = this.SOID
      this.orderService.updateRefundDetails(res)
      .subscribe(res => {
        // console.log(res);   
        if(res.status == 0) {
          this.openSnackbar(res.message)
        }
      })  
    })
  }

  approve() {
    this.dialog.open(OrderApprovalComponent, {
      width: '300px',
      height: 'auto',
      disableClose: true
    }).afterClosed().subscribe(res => {
      console.log(res);
      if(res == 'confirm') {
        this.orderService.acceptOrder(this.OID, this.SOID)
        .subscribe(res => {
          console.log(res);   
          if(res.status == 0) {
            this.openSnackbar(res.message)
          }
        })
      } else {
        this.orderService.rejectOrder(this.OID, this.SOID)
        .subscribe(res => {
          console.log(res);   
          if(res.status == 0) {
            this.openSnackbar(res.message)
          }
        })
      }      
    })
  }

  changeStatus() {
    this.dialog.open(ChangeOrderStatusComponent, {
      width: '500px',
      height: 'auto',
      disableClose: false,
      data : {
        currentStatus : this.details.itemStatus,
        OID : this.OID,
        SOID : this.SOID,
        shippingDetails : false
      }
    }).afterClosed().subscribe(res => {
      
      if(res.status == 0) {
        this.openSnackbar(res.message)
      }
    })
  }

  updateShipping() {
    this.dialog.open(ChangeOrderStatusComponent, {
      width: '500px',
      height: 'auto',
      disableClose: false,
      data : {
        currentStatus : this.details.itemStatus,
        OID : this.OID,
        SOID : this.SOID,
        
        shippingDetails : this.details.shippingDetails
      }
    }).afterClosed().subscribe(res => {
      // console.log(res);

      if(res.status == 0) {
        this.openSnackbar(res.message)
      }
      
    })
  }
}
