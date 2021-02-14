import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductService } from './../../services/product.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { config } from '../config.js'

@Component({
  selector: 'app-product-dialog',
  templateUrl: './product-dialog.component.html',
  styleUrls: ['./product-dialog.component.css']
})
export class ProductDialogComponent implements OnInit {
  details : any
  deal : boolean = false;
  trending : boolean = false;
  all : boolean = false;

  constructor(@Inject(MAT_DIALOG_DATA) private data,
  private snackbar : MatSnackBar,
  private productService : ProductService) {
    this.details = data;
   }
   config: string
  ngOnInit(): void {
    this.config = config.server;     
  }
  openSnackbar(message, action, duration) {
    this.snackbar.open(message, action, {
      duration : duration,
      horizontalPosition: 'center',
      verticalPosition : 'top'
    })
  }

  changeDeal(event) {  
    this.deal = event.checked;
  }
  changeTrending(event) {
    this.trending = event.checked;
  }
  changeAll(event) {
    this.all = event.checked
  }
  saveDeal() {
    
    this.productService.addToDailyDeals(this.details._id)
    .subscribe(data =>{
        
      if(data.status == 0) {
        this.openSnackbar("Added to deal of the day", 'close', 2000)
      }
      else if(data.status == 5) {
        this.openSnackbar("Product is already in deal of the day", 'close', 2000)
      }
    })

  }
  saveTrending() {
    this.productService.addToTrending(this.details._id)
    .subscribe(data => {
      if(data.status == 0) {
        this.openSnackbar("Added to Trending products", 'close', 2000)
      }
      else if(data.status == 5) {
        this.openSnackbar("Product is already in Trending products", 'close', 2000)
      }
    })

  }
  saveAll() {
    this.productService.addToAllProducts(this.details._id)
    .subscribe(data => {
      
      if(data.status == 0) {
        this.openSnackbar("Added to Our all products", 'close', 2000)
      }
      else if(data.status == 5) {
        this.openSnackbar("Product is already in Our all products", 'close', 2000)
      }    
    })
  }
}
