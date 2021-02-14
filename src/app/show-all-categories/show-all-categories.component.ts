import { Component, OnInit ,ViewChild} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CategoryService } from 'src/services/category.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-show-all-categories',
  templateUrl: './show-all-categories.component.html',
  styleUrls: ['./show-all-categories.component.css']
})
export class ShowAllCategoriesComponent implements OnInit {

  @ViewChild('paginator', { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  
  dataSource = new MatTableDataSource();
  dataLength = 0;
  displayedColumns: string[] = ['image', 'category', 'status'];
 
 
  loading = false;
  constructor(private categoryservice:CategoryService, private router:Router) { }
resall= [];
res:any;

categoryDetails(i:number){
  var id=this.resall[i].id
  this.router.navigate(['/category-details'],{queryParams:{id: id} });
  
}
  ngOnInit(): void {
    // this.dataLength = this.res.length;

    this.categoryservice.getAllCategories().subscribe( response => {
      this.dataLength = response.data.length;
      var data = response.data
      for(let n=0; n< this.dataLength; n++){
        this.resall.push({category:data[n].category, image:data[n].image, status:data[n].status, id:data[n]._id})


      }
      setTimeout(() => {
    
   
        this.res=this.resall;
        this.dataSource = new MatTableDataSource(this.res);
  
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort; // For sort
      }, 1000);

    });
        // window.location.reload()

    
  }
  
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    // this.dataSource.filter = filterValue.
  }
  // statusFilter(event: Event): void{
  //   const 
  // }
  activedata=[];
  active=[]
  activestatus(){
    this.activedata=this.resall
    this.active=this.activedata.filter((data)=>{
      if(data.status == 1)
       {
        //  console.log(data.status)
         return data;
       }
    });
    this.res=this.active
    // console.log(this.res)
    this.dataSource = new MatTableDataSource(this.res);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort; // For sort
}
disableddata=[];
  disabled=[]
  disabledstatus(){
    this.disableddata=this.resall
    this.disabled=this.disableddata.filter((data)=>{
      if(data.status == 0)
       {
        //  console.log(data.status)
         return data;
       }
    });
    // console.log(this.abc)
    this.res=this.disabled
    // console.log(this.res)
    this.dataSource = new MatTableDataSource(this.res);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort; // For sort
}
allstatus(){
  this.res=this.resall
   this.dataSource = new MatTableDataSource(this.res);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort; // For sort
}
}