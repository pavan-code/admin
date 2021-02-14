import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductService } from './../../services/product.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { config } from '../config.js';

@Component({
  selector: 'app-our-all-products',
  templateUrl: './our-all-products.component.html',
  styleUrls: ['./our-all-products.component.css']
})
export class OurAllProductsComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('paginator', { static: false }) paginator: MatPaginator;
  
  constructor(private productService : ProductService, private snackbar: MatSnackBar) { }

  dataSource = new MatTableDataSource();
  config : string;
  show = true;
  datalength = 0;
  products = []
  categories = []
  displayedColumns : string[] = ['image', 'title', 'category', 'rating', 'availability', 'actions']
  ngOnInit(): void {
    this.productService.getAllCategories()
    .subscribe(res => {
      this.categories = res.data;
    })
    this.config = config.server;
    this.products = []
    this.productService.getAllOurProducts()
    .subscribe(res => {
      setTimeout(() => {
        this.show = false
      }, 1000);
      this.datalength = res.data.length;
      // console.log(res.data);
      for(let i=0; i<res.data.length; i++) {
        if(res.data[i].status == false) {
          res.data[i].availability = 'Temporarily unavailable'
        }
        else {
          this.products.push(res.data[i])

          let count = 0
          let available = 0
          for(let j=0; j<res.data[i].subProducts.length; j++) {
            if(res.data[i].subProducts[j].isAvailable == true) {
              available += 1
              if(res.data[i].subProducts[j].quantity > 0) {
                count += 1;   
              }
            }
          }         
          
          if(count == 0) {
            res.data[i].availability = 'Unavailable'
          }
          else if(count == available) {
            res.data[i].availability = 'Available'
          }
          else if(count < available) {
            res.data[i].availability = 'Partially out of stock'
          }
        }
      }
      setTimeout(() => {
        
        this.dataSource = new MatTableDataSource(this.products);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }, 1000);
        
    })

  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator; // For pagination
    this.dataSource.sort = this.sort; // For sort
  }

  applyFilter(event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  deleteItem(_id) {
    this.productService.removeFromAllProducts(_id)
    .subscribe(res =>{
      // console.log(res)
      this.snackbar.open(res.message, 'close', {
        duration: 1000,
        horizontalPosition: 'center',
        verticalPosition: 'top'
      })
      setTimeout(() => {
        
        this.ngOnInit()
      }, 1000);
    })
  }

  filterCategory(event) {
    if(event !== "All")
    this.dataSource.filter = event
    else
    this.dataSource.filter = ''
  }

  filterStatus(event) {
    if(event == 'Completely out of stock')
    this.dataSource.filter = 'Unavailable';
    else if(event == 'All')
    this.dataSource.filter = ''
    else
    this.dataSource.filter = event
  }

  status(event) {
    if(event == 'available')
    this.dataSource.filter = 'true'
    else if(event == 'temporarily unavailable')
    this.dataSource.filter = 'false'
    else
    this.dataSource.filter = ''
  }



}
