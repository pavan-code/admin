import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/services/category.service';
import { switchMap } from 'rxjs/operators';
import { config} from '../config.js'
@Component({
  selector: 'app-category-details',
  templateUrl: './category-details.component.html',
  styleUrls: ['./category-details.component.css']
})
export class CategoryDetailsComponent implements OnInit {

  constructor(private activeRoute : ActivatedRoute,private categoryservice:CategoryService,private router : Router) { }
  id:number;
  data:any;
  config:any;
  ngOnInit(): void {

    this.config = config.server
    this.activeRoute.queryParams.subscribe(param => {
      this.id = param['id'];
      // console.log("id",this.id)
      // var categorydata= param['data']
      // this.data=categorydata
      setTimeout(() => {        
      this.categoryservice.getCategoryByID(this.id).subscribe(response => {
        this.data=response.data.categoryData
    // console.log(this.data)
  }
  )
      }, 50);
    }, err => {
      console.log(err);      
    });
  }
  editing(){
    this.router.navigate(['home/category-management/add-new-category'],{queryParams:{ id: this.id }});
  }

}
