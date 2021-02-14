import { ProductService } from './../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { config} from '../config.js'

@Component({
  selector: 'app-show-product-details',
  templateUrl: './show-product-details.component.html',
  styleUrls: ['./show-product-details.component.css']
})
export class ShowProductDetailsComponent implements OnInit {
  product: any;
  config: any;
  count = 0
  constructor(private productService : ProductService,
      private route : ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.config = config.server
    
    this.route.params.pipe(switchMap(params => {
      return this.productService.getProductByID(params['id'])
    }))
    .subscribe(res => {
      setTimeout(() => {        

          if(res.data.status == false) {
            res.data.availability = 'Temporarily unavailable'
          }
          else {
  
            this.count = 0
            let available = 0;
            for(let j=0; j<res.data.subProducts.length; j++) {
              if(res.data.subProducts[j].isAvailable == true ) {
                available += 1
                if(res.data.subProducts[j].quantity > 0) {
                  this.count += 1;   
                }
              }
            }         
            
            if(this.count ==  0) {
              res.data.availability = 'Unavailable'
            }
            else if(this.count == available) {
              res.data.availability = 'Available'
            }
            else if(this.count < available) {
              res.data.availability = 'Partially out of stock'
            }
          }
        this.product = res.data


      }, 1500);
    }, err => {
      console.log(err);      
    })
  }

}
