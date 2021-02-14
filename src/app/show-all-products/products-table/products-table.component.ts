import { MatDialog } from '@angular/material/dialog';
import { ProductDialogComponent } from './../../product-dialog/product-dialog.component';
import { ProductService } from './../../../services/product.service';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';


@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
  styleUrls: ['./products-table.component.css']
})


export class ProductsTableComponent implements OnInit, AfterViewInit {

  @ViewChild('paginator', { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private productService: ProductService, private dialog: MatDialog) { }

  dataSource = new MatTableDataSource();
  show = true;
  dataLength = 0

  displayedColumns: string[] = 
  ['productImage','title', 'category', 'rating', 'availability', 'actions'];
  categories = []
  ngOnInit(): void {
    this.productService.getAllCategories()
    .subscribe(res => {
      
      this.categories = res.data;
    })
    this.productService.getAllProducts()
    .subscribe(res => {
            setTimeout(() => {
              this.show = false
            }, 1000);
            this.dataLength = res.data.length;
      for(let i=0; i<res.data.length; i++) {
        if(res.data[i].status == false) {
          res.data[i].availability = 'Temporarily unavailable'
        }
        else {

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
        
        this.dataSource = new MatTableDataSource(res.data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort; // For sort
      }, 1000);

      
      
    })
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator; // For pagination
    this.dataSource.sort = this.sort; // For sort
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialog(product) {
    // console.log(product);
    
    this.dialog.open(ProductDialogComponent, {
      data: {
        _id : product._id,
        name : product.title,
        category : product.category,
        image : product.productImage
      },
      width: '450px',
      disableClose: true
      
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
