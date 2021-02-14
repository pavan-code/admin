import { CustomerService } from './../../services/customer.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-view-all-customers',
  templateUrl: './view-all-customers.component.html',
  styleUrls: ['./view-all-customers.component.css']
})
export class ViewAllCustomersComponent implements OnInit {

  @ViewChild('paginator', { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  users = [];
  dataSource = new MatTableDataSource();
  dataLength = 0;
  selected = 'All';
  displayedColumns: string[] = [ 'Full Name', 'Mobile', 'Email' , 'status'];
  res = [];

  loading = false;
  activedata = [];
  active = [];

  constructor(private cs: CustomerService, private snackbar: MatSnackBar) { }

  ngOnInit(): void {
    this.loading = true;
    this.cs.GetCustomerData().subscribe(result => {
      console.log(result);
      this.res = result.data;
      this.loading = false;
      if (result.data.status === 5) {

        this.openSnackbar('Some error occured while retrieving', 10000);
      } else if (result.data.status === 2) {
        this.openSnackbar('Some error occured while retrieving', 10000);
      } else if (result.data.status === 3) {
        this.openSnackbar('Unauthorized to perform this action', 10000);
      }
      else{
        this.loading = false;
        this.dataSource = new MatTableDataSource(this.res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }

    }, err => {
      this.loading = false;
      this.openSnackbar('Some error occured while retrieving', 10000);
    });
  }


  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openSnackbar(message, duration: number): any {
    this.snackbar.open(message, 'close', {
      duration,
      verticalPosition: 'top',
      horizontalPosition: 'center',
    });
  }

  activestatus(): any{
    this.active = [];
    this.activedata = [];
    this.activedata = this.res;
    this.active = this.activedata.filter((data) => {
      if (data.status)
       {
         return data;
       }
    });
    this.dataSource = new MatTableDataSource(this.active);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort; // For sort
  }

  allStatus(): any{
    this.dataSource = new MatTableDataSource(this.res);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  disableStatus(): any{
    this.active = [];
    this.activedata = [];
    this.activedata = this.res;
    this.active = this.activedata.filter((data) => {
      if (!data.status)
       {
         console.log(data.status);
         return data;
       }
    });
    this.dataSource = new MatTableDataSource(this.active);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort; // For sort
  }

  click(data: any): any {
    console.log('pagechanged', data);
  }
}
