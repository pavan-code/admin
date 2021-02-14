import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { switchMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from './../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { config } from '../config.js';
import { Validators, FormArray, FormGroup, FormControl, FormBuilder } from '@angular/forms';
import * as _ from 'lodash';
import { ImageCropDialogComponent } from '../image-crop-dialog/image-crop-dialog.component';


@Component({
  selector: 'app-edit-product-details',
  templateUrl: './edit-product-details.component.html',
  styleUrls: ['./edit-product-details.component.css']
})
export class EditProductDetailsComponent implements OnInit {
  config: any;
  product: any;
  productForm : FormGroup;
  length: number = 0;
  Value: string = '';
  sizesArray: number[] = [];
  selectedColorNames: string[];
  images :string[]
  show = true;
  status = [0,0,0,0,0]
  isChanged = false;
  formData: any;
  resProduct:any = "";
  showForm = false
  categories = []
  constructor(private productService : ProductService, private route: ActivatedRoute,
     private fb: FormBuilder, private dialog: MatDialog, private snackbar: MatSnackBar ) { }

  ngOnInit(): void {
    this.productService.getAllCategories()
    .subscribe(res => {
      console.log(res);
      this.categories = res.data;
    })
    this.config = config.server
    this.status = [0,0,0,0,0]

    this.route.params.pipe(switchMap(params => {
      return this.productService.getProductByID(params['id'])
    }))
    .subscribe(product => {
        this.product = product.data;
        this.show = false;
        this.images = this.product.otherImages;
        this.createForm();
         
    }, err => {
      console.log(err);      
    })

  }

  formErrors = {
    title: '',
    category: '',
    shortDescription: '',
    weight: '',
    color: '',
    rating : '',
    size: '',
    quantity: '',
    price: '',
    longDescription: '',
  };
 
  validationMsgs = {
    title: {
      required: 'Product name required',
    },
    category: {
      required: 'Select a category',
    },
    shortDescription: {
      required: 'Description is required',
    },
    weight: {
      required: 'Weight is required',
    },
    color: {
      required: 'Enter the color',
    },
    rating : {
      required : 'Rating is required',
      min : 'Rating should be from 0-5',
      max : 'Rating should be from 0-5'
    },
    size: {
      required: 'Enter the size',
    },
    quantity: {
      required: 'Enter the quantity',
    },
    price: {
      required: 'Enter the price',
    },
    longDescription: {
      required: 'Description is required',
    },
  };
  myColors = [
    {
      name: 'Copper',
      value: 'copper',
    },
    {
      name: 'Copper with silver coat',
      value: 'copper with silver coating',
    },
  ];
  createForm() {
    // console.log(this.product);
    
    this.productForm = this.fb.group({
      title: [this.product.title, Validators.required],
      category: [this.product.category, Validators.required],
      shortDescription: [this.product.shortDescription, Validators.required],
      longDescription: [this.product.longDescription, Validators.required],
      specification: this.fb.array(this.renderSpec(), [Validators.required, Validators.minLength(1)]),
      rating : [this.product.rating, [Validators.required, Validators.min(0), Validators.max(5)]],
      color: this.createColors(this.myColors),
      subProducts: this.fb.array(this.renderSubProducts(), [Validators.required, Validators.minLength(1)]),
      tempProducts: this.fb.array([]),
      productImage: [this.product.productImage, Validators.required],
      otherImages: this.fb.array(this.product.otherImages,
        [Validators.required, Validators.minLength(5), Validators.maxLength(5)]
      ),
      status: [this.product.status]
    });
    // console.log('adsf:', this.productForm.value);
    
    this.getSelectedColors();
    this.calculateWords(this.product.shortDescription)
    this.productForm.valueChanges.subscribe((data) => this.onValueChanged(data));

  }
  renderSpec() {
    let specs = []
    
    for(let i=0; i<this.product.specification.length; i++) {
      specs.push(
        this.fb.group({
            key : [this.product.specification[i].key],
            value : [this.product.specification[i].value]
          })
      )}
      return specs
  }

  renderSubProducts() {
    let prods = [];
    for(let i=0; i<this.product.subProducts.length; i++) {
      prods.push(
        this.fb.group({
        color : [this.product.subProducts[i].color],
        size : [this.product.subProducts[i].size],
        quantity : [this.product.subProducts[i].quantity],
        price : [this.product.subProducts[i].price],
        isAvailable : [this.product.subProducts[i].isAvailable]
      }))
    }
    return prods;
  }
  createType(color, size, quantity, price, availability) {
    const control = <FormArray>this.productForm.controls['tempProducts'];
    control.push(
      this.fb.group({
        color: [color, Validators.required],
        size: [size, Validators.required],
        quantity: [quantity],
        price: [price],
        isAvailable: [availability],
      })
    );
  }

  createSpec() {
    return this.fb.group({
      key: ['', Validators.required],
      value: ['', Validators.required],
    });
  }
  createColors(colors) {
    const arr = colors.map((color) => {
      return new FormControl(color.selected || false);
    });
    return new FormArray(arr);
  }
  getSelectedColors() {
    this.selectedColorNames = _.map(
      this.productForm.controls.color['controls'],
      (color, i) => {
        return color.value && this.myColors[i].value;
      }
    );
    this.selectedColorNames = _.filter(this.selectedColorNames, (color) => {
      if (color !== false) return color;
    });
    this.findCombinations();
  }
  findCombinations() {
    this.productForm.setControl('tempProducts', this.fb.array([]));
    let subpro = []
    for(let i=0; i<this.product.subProducts.length; i++ ) {
      subpro.push(
        this.fb.group({
          color : [this.product.subProducts[i].color],
          size : [this.product.subProducts[i].size],
          quantity : [this.product.subProducts[i].quantity],
          price : [this.product.subProducts[i].price],
          isAvailable : [this.product.subProducts[i].isAvailable]
        })
      )
    }
    this.productForm.setControl('subProducts', this.fb.array(subpro));
    for (let i = 0; i < this.selectedColorNames.length; i++) {
      for (let j = 0; j < this.sizesArray.length; j++) {        
        this.createType(
          this.selectedColorNames[i],
          this.sizesArray[j],
          0,
          0,
          false
        );
      }
    }
    let a = this.productForm.controls['subProducts'] as FormArray
    let b = this.productForm.controls['tempProducts'] as FormArray

    b.controls.forEach(control => {
      a.push(control)
    })

    // console.log(this.productForm.value);
    
  }
  onValueChanged(data?: any) {
    if (!this.productForm) {
      return;
    }
    const form = this.productForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previuos error messages if any
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMsgs[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key];
            }
          }
        }
      }
    }
  }
  openSnackbar(message, duration: number) {
    this.snackbar.open(message, 'close', {
      duration: duration,
      verticalPosition: 'top',
      horizontalPosition: 'center',
    });
  }

  save(value) {
    this.showForm = true
    this.formData = value;
    delete this.formData.color;
    delete this.formData.tempProducts;
    this.formData._id = this.product._id;

    // console.log(this.formData);
    this.productService.updateProduct(this.formData)
    .subscribe(res => {
      
      setTimeout(() => {
        this.showForm = false
        if (res.status == 0) {
          
          this.resProduct = res.data;
          this.openSnackbar(res.message, 2000);
        }
      }, 1000);
      // console.log(res);
      
    }, err => {
      console.log('err', err);
      
    })
    
  }

  words: string[] = [];
  
  calculateWords(value) {
    let count = 0;
    value = value.replace(/\s/g, ' ');
    this.words = value.trim(' ').split(' ');
    for (let i = 0; i < this.words.length; ) {
      if (this.words[i] != '') {
        count += 1;
        i++;
      } else {
        this.words.splice(i, 1);
      }
    }
    this.length = count;
  }
  uploadMainImage() {
    this.dialog
      .open(ImageCropDialogComponent, {
        height: 'auto',
        width: '600px',
        disableClose: true,
      })
      .afterClosed()
      .subscribe((data) => {
        this.isChanged = true;
        this.productForm.controls['productImage'].patchValue(data);
      });
  }
  openDialog() {
  
  }
  imageCount = 5;
  openCrop(index) {
    // console.log(this.images)
    this.dialog
    .open(ImageCropDialogComponent, {
      height: 'auto',
      width: '600px',
      disableClose: true,
    })
    .afterClosed()
    .subscribe(data => {
      
      this.images[index] = data;
      this.status[index] = 1;
      this.imageCount = 0;
      for(let i=0; i<5; i++) {
        if(this.images[i] != "") {
          this.imageCount += 1;
        }
      }
      if(this.imageCount == 5) {
        this.productForm.setControl('otherImages', this.fb.array(this.images))
      }
    })

  }
  addSize(size) {
    this.Value = '';
    if(size != '') {
      if (this.sizesArray.includes(size) == false) {
        this.sizesArray.push(size);
        this.findCombinations();
      } else {
        alert('Size is already in the list');
      }
    }
  }
  removeSize(index) {
    this.sizesArray.splice(index, 1);
    this.findCombinations();
  }
  addSpec() {
    const control = <FormArray>this.productForm.controls['specification'];
    control.push(this.createSpec());
  }
  removeSpec(index) {
    const control = <FormArray>this.productForm.controls['specification'];
    control.removeAt(index);
  }
}
