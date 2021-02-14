import { OrderService } from './../../services/order.service';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { config } from '../../app/config.js'
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-view-all-orders',
  templateUrl: './view-all-orders.component.html',
  styleUrls: ['./view-all-orders.component.css']
})
export class ViewAllOrdersComponent implements OnInit {

  @ViewChild('paginator', { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  config: any;
  constructor(private orderService: OrderService,  private snackbar: MatSnackBar) { }
  
  dataSource = new MatTableDataSource();
  show = true;
  displayedColumns: string[] = 
  ['image', 'id', 'orderdate', 'details', 'category', 'adddetails', 'payment', 'status' ];

  ngOnInit(): void {
    this.config = config.server;
    this.orderService.getAllOrders()
    .subscribe(res => {
      // console.log(res);
      this.show = false;
      this.dataSource = new MatTableDataSource(res.data)
      this.dataSource.paginator = this.paginator; // For pagination
      this.dataSource.sort = this.sort; // For sort
    }, err => {
      this.show = false;
      this.openSnackbar('No network connection. Unable to retrieve products', 5000);
    })

  }
  openSnackbar(message, duration: number): any {
    this.snackbar.open(message, 'close', {
      duration,
      verticalPosition: 'top',
      horizontalPosition: 'center',
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator; // For pagination
    this.dataSource.sort = this.sort; // For sort
  }
  // applyFilter(event: Event) {
  //   console.log(event);
    
  //   const filterValue = (event.target as HTMLInputElement).value
  //   this.dataSource.filter = filterValue.trim().toLowerCase();
  // }

  filterStatus(value) {
    console.log(value);
    
    if(value == 'All')
      this.dataSource.filter = ''
    else  
      this.dataSource.filter = value
  }
  getDetails(id1, id2) {
    this.orderService.getOrder(id1, id2)
    .subscribe(res => {
      console.log(res);
      
    })
  }
}
