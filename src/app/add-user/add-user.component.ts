import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { UserServiceService } from 'src/services/user-service.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  id:number;
  userData : any;
  editing:boolean=false;
  username:any;
  status:boolean;
  isMobile:boolean=false;
  selectRole = "Select the role";
  @ViewChild('f') signup : NgForm;
  loader:boolean=false;
userdata:any;
message:string;
passwordChange2='password';
passwordChange='password';
  selectOption=[
    {
      id: 0,
      role:"Select the role"
    },
    {
    id: 1,
    role:"admin"
  }, {
    id: 2,
    role:"viewer"
  }, {
    id: 1,
    role:"superadmin"
  }
];

  onSubmit(){
    var check : boolean;
    this.loader=true;
    if(this.editing){
      var data = {
        email : this.signup.value.email,
        name : this.signup.value.name,
        username : this.username,
        role:this.signup.value.role,
        mobile:this.signup.value.number1,
        status: this.status
      };
      this.userData=data
     this.userSer.editItemData(data).subscribe(details=>{
       this.userdata = details
      if(this.userdata.status != 0 ){
        check = false;
         this.message = this.userdata.message
      }
     });
    
    }
    else{
      var data2 = {
        username : this.signup.value.username,
        name : this.signup.value.name,
        mobile:this.signup.value.number1,
        email : this.signup.value.email,
        role:this.signup.value.role,
        password : this.signup.value.pass,
        status: false
      };
   
    this.userSer.addData(data2).subscribe(adddata=>{
      this.userdata = adddata
      if(this.userData.status != 0 ){
        check = false;
         this.message = this.userdata.message
      }
    });
    
  }
  setTimeout(() => {
    this.loader=false;
    if(check==false){
      this.openSnackbar(this.message,10000)
      if(this.editing){
        setTimeout(() => {
          this.userSer.getItemData(this.username).subscribe(data=>{
            if(this.userData!=null){
              this.editing=true;
              this.status = this.userData.status 
            this.signup.setValue({
              email : this.userData.email,
              name : this.userData.name,
              username : this.userData.username,
              role:this.userData.role,
              pass:' ',
              pass2:' ',
              number1 : this.userData.mobile
            })
          }
          })
        }, 200);
     }
    }
    else{
      if(!this.editing)
      this.openSnackbar('User Added successfully',2000);
      else
      this.openSnackbar('Data Updated Successfully',2000);
    this.router.navigate(['home/user-management/all-users']);
    }
  }, 2000);   
  }


  openSnackbar(message: string, duration: number) {
    this.snackbar.open(message, 'close', {
      duration: duration,
      verticalPosition : 'top',
      horizontalPosition : 'center'
    })
  }
  changeInputNew2(){
    this.passwordChange2='password'
  }
  changeInputNew(){
    this.passwordChange='password'
  }
constructor(private route:ActivatedRoute,private userSer:UserServiceService,private router:Router,  private snackbar : MatSnackBar){}
  changeInput() {
    if(this.passwordChange=='password')
   this.passwordChange='text';
   else{
     this.passwordChange='password';
   }
  }

  changeInput2() {
    if(this.passwordChange2=='password')
   this.passwordChange2='text';
   else{
     this.passwordChange2='password';
   }
  }
  
  ngOnInit(){
    this.loader=true;
    this.route.queryParams.subscribe(params=>{
      this.username = params['username'];
    });
    setTimeout(() => {
      this.loader=false;
      this.userSer.getItemData(this.username).subscribe(data=>{
        this.userData = data
        this.userData = this.userData.data
       
        if(this.userData!=null){
          this.editing=true;
          this.passwordChange='text';
          this.passwordChange2='text';
          this.status = this.userData.status 
        this.signup.setValue({
          email : this.userData.email,
          name : this.userData.name,
          username : this.userData.username,
          role:this.userData.role,
          pass:' ',
          pass2:' ',
          number1 : this.userData.mobile
        })
      }
      })
    }, 1500);
  }
}
