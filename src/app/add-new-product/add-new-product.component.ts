import { ProductService } from './../../services/product.service';
import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import * as _ from 'lodash';
import { MatDialog } from '@angular/material/dialog';
import { ImageCropDialogComponent } from '../image-crop-dialog/image-crop-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-new-product',
  templateUrl: './add-new-product.component.html',
  styleUrls: ['./add-new-product.component.css'],
})
export class AddNewProductComponent implements OnInit {
  product: FormGroup;
  show: boolean = false;
  formData: any;
  resProduct: any;
  categories = []
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
  selectedColorNames: string[];
  sizesArray: number[] = [];
  Value: string = '';

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private productService: ProductService,
    private snackbar: MatSnackBar
  ) {}
  ngOnInit(): void {
    this.productService.getAllCategories()
    .subscribe(res => {
      this.categories = res.data;
    })
    this.createForm();
    this.selectedColorNames = [];
    this.sizesArray = [];
    this.length = 0;
    this.resProduct = '';
  }
  formErrors = {
    title: '',
    category: '',
    shortDescription: '',
    weight: '',
    color: '',
    rating: '',
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
    rating: {
      required: 'Rating is required',
      min: 'Rating should be from 0-5',
      max: 'Rating should be from 0-5',
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

  createForm() {
    this.product = this.fb.group({
      title: ['', Validators.required],
      category: ['', Validators.required],
      shortDescription: ['', Validators.required],
      longDescription: ['', Validators.required],
      specification: this.fb.array(
        [this.createSpec()],
        [Validators.required, Validators.minLength(1)]
      ),
      rating: [0, [Validators.required, Validators.min(0), Validators.max(5)]],
      color: this.createColors(this.myColors),
      subProducts: this.fb.array(
        [],
        [Validators.required, Validators.minLength(1)]
      ),
      productImage: ['', Validators.required],
      otherImages: this.fb.array(
        [
          
        ],

        [Validators.required, Validators.minLength(5), Validators.maxLength(5)]
      ),
      status: [true],
    });
    this.getSelectedColors();
    this.product.valueChanges.subscribe((data) => this.onValueChanged(data));
  }
  createType(color, size, quantity, price, availability) {
    const control = <FormArray>this.product.controls['subProducts'];
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
      this.product.controls.color['controls'],
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
    this.product.setControl('subProducts', this.fb.array([]));
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
  }

  onValueChanged(data?: any) {
    if (!this.product) {
      return;
    }
    const form = this.product;
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

  selectedFile = null;
 
  length: number = 0;
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

  updateValue() {
    this.product.controls.shortDescription.setValue(this.words.join(' '));
  }

  addSpec() {
    const control = <FormArray>this.product.controls['specification'];
    control.push(this.createSpec());
  }

  addSize(size) {
    this.Value = '';
    if (size != '') {
      if (this.sizesArray.includes(size) == false) {
        this.sizesArray.push(size);
        this.findCombinations();
      } else {
        alert('Size is already in the list');
      }
    }
  }

  remove(index) {
    const control = <FormArray>this.product.controls['subProducts'];
    control.removeAt(index);
  }

  removeSpec(index) {
    const control = <FormArray>this.product.controls['specification'];
    control.removeAt(index);
  }

  removeSize(index) {
    this.sizesArray.splice(index, 1);
    this.findCombinations();
  }

  openSnackbar(message, duration: number) {
    this.snackbar.open(message, 'close', {
      duration: duration,
      verticalPosition: 'top',
      horizontalPosition: 'center',
    });
  }

  refresh() {
    this.ngOnInit();
    // location.reload()
  }

  save(value) {
    this.show = true;
    this.formData = value;
    delete this.formData.color;
    console.log('product details: \n', this.formData);
    this.productService.addNewProduct(this.formData).subscribe(
      (res) => {
        this.show = false;
        // console.log(res);

        if (res.status == 0) {
          this.resProduct = res.data;
          this.openSnackbar('Product Added Successfully', 2000);
        } else if (res.status == 2) {
          this.openSnackbar('Product is already added', 2000);
        } else if (res.status == 3) {
          this.openSnackbar('Unauthorized to perform this action', 2000);
        }
      },
      (err) => {
        console.log(err);
      }
    );
    // this.ngOnInit();
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
        this.product.controls['productImage'].patchValue(data);
      });
  }
  deleteMainImage() {
    this.product.controls['productImage'].setValue('');
  }
  
  images = ['','','','','']
  imagecount = 0;
  openCrop(index) {
    console.log(index);
    this.dialog
      .open(ImageCropDialogComponent, {
        height: 'auto',
        width: '600px',
        disableClose: true,
      })
      .afterClosed()
      .subscribe((data) => {
        this.images[index] = data;
        this.imagecount = 0;
        for(let i=0; i<5; i++) {
          if(this.images[i] != "") {
            this.imagecount += 1;
          }
        }
        if(this.imagecount == 5) {
          this.product.setControl('otherImages', this.fb.array(this.images))
        }
        console.log(this.product.value);
      });
  }

  fileChange(event) {
    const files = event.target.files;
    const control = <FormArray>this.product.controls['otherImages'];
    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64 = reader.result + '';
        control.push(this.fb.control(base64));
      };
      reader.readAsDataURL(files[i]);
    }
    event.srcElement.value = null;
  }

  removeImage(ind) {
    const control = <FormArray>this.product.controls['otherImages'];
    control.removeAt(ind);
  }
}
