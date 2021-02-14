import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserServiceService } from 'src/services/user-service.service';
import { NgForm } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  constructor(private activeRoute :ActivatedRoute,private userServe:UserServiceService,private router:Router) { }
  id:number;
  data:any;
  @ViewChild('paginator', { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource = new MatTableDataSource();
  dataLength = 1;
  displayedColumns: string[] = ['SR No.', 'Login/Logout','timing'];
  
  editing(){
    this.router.navigate(['home/user-management/add-user'],{queryParams:{username:this.username }});
  }
  userLog:any;
  user:string='user';
  status:boolean=false;
  username='';
  @ViewChild('f') signUp : NgForm;
  ngOnInit(): void {
    this.activeRoute.queryParams.subscribe(param => {
      this.username = param['username']
      setTimeout(() => {
        this.data = this.userServe.getItemData(this.username).subscribe(data=>{
          this.data = data
          this.data = this.data.data
          this.status=this.data.status==1;
          this.user=this.data.role
          this.username = this.data.username
      
        })
        this.userServe.getlogs(this.username).subscribe(logdata=>{
          this.userLog = logdata;
          this.userLog = this.userLog.data
          this.dataSource = new MatTableDataSource(this.userLog);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.dataLength = this.userLog.length;
        })
        
      }, 500);
    }, err => {
      console.log(err);
    });
   
  }
  submitStatus(){
    var status = this.status;
    var stat = {
      username: this.username,
      status : status
    }
  this.userServe.editItemData(stat).subscribe(data=>{
    this.data.status = this.status
    this.status = status
    })    
  }
  button:string='none';
 activate(){
   this.button='block';
 }
 close(){
   this.button='none';
 }
 getdisplay(){
   if(this.button=='block'){
     return 'block';
   }
   else{
     return 'none'
   }
 }
 onSubmit(){
   var data = {
     username : this.username,
     password : this.signUp.value.password,
     confirmPassword : this.signUp.value.confirmPassword
   }
   this.userServe.editPassword(data).subscribe(change=>{
     this.router.navigate(['home/user-management/all-users'])
   })
 }
}
