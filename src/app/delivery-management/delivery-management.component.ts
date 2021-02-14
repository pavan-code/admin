import { DeliveryService } from './../../services/delivery.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-delivery-management',
  templateUrl: './delivery-management.component.html',
  styleUrls: ['./delivery-management.component.css']
})
export class DeliveryManagementComponent implements OnInit {
  file: string | ArrayBuffer;
  

  constructor(private deliveryService: DeliveryService) { }

  ngOnInit(): void {
    this.show = false;
    this.text = "Please wait.."
  }
  show: boolean = false;

  files: File[] = [];
  text: string = "Please wait.."
	onSelect(event) {
    this.files = [];
		// console.log(event);
    this.files.push(...event.addedFiles);
    const file = event.addedFiles[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        // console.log(reader.result);
        this.file = reader.result;
        // console.log('got data');
        // console.log(this.file);
        
        
    };
	}

	onRemove(event) {
		// console.log(event);
		this.files.splice(this.files.indexOf(event), 1);
  }
  upload() {
    this.show = true;
    // setTimeout(() => {
    //     this.text = "It's taking longer time than usual.."
    //     setTimeout(() => {
    //       this.text = "Seems like the file is too large to upload.."
    //       setTimeout(() => {
    //         alert("Failed to upload the document")
    //         this.ngOnInit()            
    //       }, 3000);
    //     }, 7000);
    // }, 5000);
    // alert('file uploaded')
    this.deliveryService.updateLocations(this.file)
    .subscribe(res => {
      this.show = false;
      this.text = "Please wait.. "
      this.files = [];
      console.log(res);
      
    })
  }

}
