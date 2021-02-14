import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { UserServiceService } from 'src/services/user-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-all-users',
  templateUrl: './view-all-users.component.html',
  styleUrls: ['./view-all-users.component.css']
})
export class ViewAllUsersComponent implements OnInit {

  @ViewChild('paginator', { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  users = [];
  dataSource = new MatTableDataSource();
  dataLength = 1;
  displayedColumns: string[] = ['Full Name', 'Username','role', 'Mobile', 'Email', 'Status'];
  activedata=[];
  active=[]
  loading = false;
  resall:any;
  resall2:any;
  res:any;
  admindata=[];
  admins=[];


  constructor(private userServe:UserServiceService,private router:Router) { }


  changeState(i:number){ 
   var state= this.userServe.res[i].status;
    if(state==0){
    this.userServe.res[i].status = 1;
    }
    else{
    this.userServe.res[i].status = 0; 
    }
  }



  userDetails(i:number){
    this.router.navigate(['userdetail'],{queryParams:{number: i, username : this.res[i].username} });
  }
  


  ngOnInit(): void {
    setTimeout(() => {
      this.userServe.getData().subscribe(data=>{
        this.res=data;
        this.res = this.res.data
        for(var i=0; i< this.res.length;i++){
          if(this.res[i].status == null){
            this.res[i].status=1;
          }
        }
        this.resall=this.res
        this.resall2=this.res
        this.dataSource = new MatTableDataSource(this.res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.dataLength = this.res.length;
      });
    
    }, 1000);
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
 


  admin(){
    this.admindata=this.resall2
    this.admins=this.admindata.filter((data)=>{
      if(data.role == 'admin')
       {

         return data;
       }
    });
    this.res=this.admins
    this.dataSource = new MatTableDataSource(this.res);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


  
  superadmin(){
    this.admindata=this.resall2
    this.admins=this.admindata.filter((data)=>{
      if(data.role == 'superadmin')
       {

         return data;
       }
    });
    this.res=this.admins
    this.dataSource = new MatTableDataSource(this.res);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
 
  
  user(){
    this.admindata=this.resall2
    this.admins=this.admindata.filter((data)=>{
      if(data.role == 'viewer')
       {

         return data;
       }
    });
    this.res=this.admins
    this.dataSource = new MatTableDataSource(this.res);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort; 
  }

  
  activestatus(){
    this.activedata=this.resall
    this.active=this.activedata.filter((data)=>{
      if(data.status == 1)
       {
      
         return data;
       }
    });
    this.res=this.active
    this.dataSource = new MatTableDataSource(this.res);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
}


  disabledstatus(){
    this.activedata=this.resall
    this.active=this.activedata.filter((data)=>{
      if(data.status == 0)
       {
         return data;
       }
    });
    this.res=this.active
    this.dataSource = new MatTableDataSource(this.res);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort; 
}




allstatus(){
  this.res=this.resall
   this.dataSource = new MatTableDataSource(this.res);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort; 
}
}
