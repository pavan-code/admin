import { Component, OnInit, ViewChild  } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/services/category.service';
import { ImageCropDialogComponent } from '../image-crop-dialog/image-crop-dialog.component';
@Component({
  selector: 'app-add-new-category',
  templateUrl: './add-new-category.component.html',
  styleUrls: ['./add-new-category.component.css']
})
export class AddNewCategoryComponent implements OnInit {

  isMobile:boolean=false;
  
  @ViewChild('f') signup : NgForm;
  
flag=0;
status:boolean=true
loader:boolean=false;
formData:any
details:any
resall=[];
dataLength=0
editsuccess:boolean=false
updateddata:any=""
image2:any
imagechange: boolean
openSnackbar(message, duration: number) {
  this.snackbar.open(message, 'close', {
    duration: duration,
    verticalPosition: 'top',
    horizontalPosition: 'center',
  });
}
  onSubmit(){
    var data ={
      _id : this.id,
      category : this.signup.value.name,
      status : this.signup.value.status,
      image : this.image
      
    };
    if(this.editing2){
      var data2 ={
        _id : this.id,
        category : this.signup.value.name,
        status : this.signup.value.status,
        image : this.image,
        
      };
      
      // console.log("data2",data2)
      this.categoryservice.updateCategory(data2).subscribe(res=>{
        // console.log("after updating",res)
        this.openSnackbar(res.message, 6000);
        this.editsuccess=true
        this.updateddata= res.data
        // this.updateddata.image = this.image
        if(this.image != this.image2)
        {
        this.imagechange = false
        this.updateddata.image = this.image
        }
        else{
          this.imagechange = true
        }
        // console.log("image",this.image)
        
    //  this.router.navigate(['/home/category-management/all-categories']);

      }); 

    }
     
    else{
      this.loader=true;
      this.categoryservice.addNewCategory(data).subscribe((res)=>{
        // console.log(res)
        // console.log("error message",res.message)
       
       if(res.status == 5){
          this.openSnackbar(res.message, 4000);

        }
        else if(res.status == 3)
        {
          this.openSnackbar(res.message, 4000);
        }
        else{
          // console.log("data added ")
          this.openSnackbar("Category Added Successfully", 4000);
        }
        
       },err => console.log(err));
       
      setTimeout(() => {
        this.loader=false;
      }, 2000);
      this.signup.resetForm();
      this.image='';
  
    }

  }
constructor(private dialog: MatDialog,private route:ActivatedRoute,private categoryservice:CategoryService,private router:Router, private snackbar: MatSnackBar){}
image:string='';
 editing2:boolean
  uploadMainImage() {
    this.dialog
      .open(ImageCropDialogComponent, {
        height: 'auto',
        width: '600px',
        disableClose: true,
      })
      .afterClosed()
      .subscribe((data) => {
        this.image=data;
        // console.log(this.image)
      });
  }
  
  deleteMainImage() {
   this.image='';
   this.editing=false
  }

  id:number
  userData:any
  editing:boolean=false;
  ngOnInit(){
    this.route.queryParams.subscribe(params=>{
      this.id = params['id'];
    });
    this.categoryservice.getCategoryByID(this.id).subscribe(res =>{
      this.userData=res.data.categoryData
      // console.log("userdata",this.userData)
      setTimeout(() => {
        this.status=true
        if(this.userData!=null){
          
          this.editing=true;
          this.editing2=true
          this.image = this.userData.image
          this.image2 = this.image
        this.signup.setValue({
          name : this.userData.category,
          status : this.userData.status
        
        })
        // console.log("signup",this.signup.value)
      }
      
      }, 500);
    });

     
  }

 
}
