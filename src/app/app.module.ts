// import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { AuthGuardGuard } from './../guards/auth-guard.guard';
import { TokenInterceptorService } from './../services/token-interceptor.service';
import { MatPaginatorModule } from '@angular/material/paginator';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { AddNewProductComponent } from './add-new-product/add-new-product.component';
import { ShowAllProductsComponent } from './show-all-products/show-all-products.component';
import { LoginDialogComponent } from './login-dialog/login-dialog.component';
import { ProductsTableComponent } from './show-all-products/products-table/products-table.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ImageCropperModule } from 'ngx-image-cropper';
import { ChartsModule } from 'ng2-charts';
import { NgxDropzoneModule } from 'ngx-dropzone';


// material modules imports

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ImageCropDialogComponent } from './image-crop-dialog/image-crop-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatCardModule } from '@angular/material/card';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatDatepickerModule } from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
// import { MatMomentModule } from '@angular/material-moment-adapter'

import { NgxMatNativeDateModule , NgxMatDatetimePickerModule, NgxMatTimepickerModule } from '@angular-material-components/datetime-picker';

// import { MatMomentDateModule } from "@angular/material/MatMomentDateModule"

import { ShowProductDetailsComponent } from './show-product-details/show-product-details.component';




import { ViewAllUsersComponent } from './view-all-users/view-all-users.component';
import { AddUserComponent } from './add-user/add-user.component';

import { EditProductDetailsComponent } from './edit-product-details/edit-product-details.component';
import { AddNewCategoryComponent } from './add-new-category/add-new-category.component';
import { ShowAllCategoriesComponent } from './show-all-categories/show-all-categories.component';
import { CategoryDetailsComponent } from './category-details/category-details.component';
import { CreateCustomerComponent } from './create-customer/create-customer.component';
import { ViewAllCustomersComponent } from './view-all-customers/view-all-customers.component';
import { ViewCustomerComponent } from './view-customer/view-customer.component';
import { EditCustomerComponent } from './edit-customer/edit-customer.component';


import { UserDetailsComponent } from './user-details/user-details.component';
import { DealOfTheDayComponent } from './deal-of-the-day/deal-of-the-day.component';
import { TrendingProductsComponent } from './trending-products/trending-products.component';
import { ProductDialogComponent } from './product-dialog/product-dialog.component';
import { OurAllProductsComponent } from './our-all-products/our-all-products.component';
import { DeliveryManagementComponent } from './delivery-management/delivery-management.component';
import { DndDirective } from './dnd.directive';
import { ViewAllOrdersComponent } from './view-all-orders/view-all-orders.component';
import { ViewAllReviewsComponent } from './view-all-reviews/view-all-reviews.component';
import { ViewOrderDetailsComponent } from './view-order-details/view-order-details.component';
import { AddRefundComponent } from './add-refund/add-refund.component';
import { OrderApprovalComponent } from './order-approval/order-approval.component';
import { ChangeOrderStatusComponent } from './change-order-status/change-order-status.component';
@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    AddNewProductComponent,
    ImageCropDialogComponent,
    DashboardComponent,
    ShowAllProductsComponent,
    LoginDialogComponent,
    ProductsTableComponent,
    ShowProductDetailsComponent,
    ViewAllUsersComponent,
    EditProductDetailsComponent,
    AddUserComponent,
    EditProductDetailsComponent,
    AddNewCategoryComponent,
    ShowAllCategoriesComponent,
    CategoryDetailsComponent,

    CreateCustomerComponent,
    ViewAllCustomersComponent,
    ViewCustomerComponent,
    EditCustomerComponent,
    UserDetailsComponent,
    ShowAllProductsComponent,
    AddNewProductComponent,
    DealOfTheDayComponent,
    TrendingProductsComponent,
    ProductDialogComponent,
    OurAllProductsComponent,
    DeliveryManagementComponent,
    DndDirective,
    ViewAllOrdersComponent,
    ViewAllReviewsComponent,
    ViewOrderDetailsComponent,
    AddRefundComponent,
    OrderApprovalComponent,
    ChangeOrderStatusComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ImageCropperModule,
    HttpClientModule,
    ChartsModule,
    NgxDropzoneModule,
    CommonModule,
    FlexLayoutModule,
    MatSidenavModule,
    MatButtonModule,
    MatListModule,
    MatIconModule,
    MatExpansionModule,
    MatToolbarModule,
    MatMenuModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatChipsModule,
    MatCheckboxModule,
    MatDialogModule,
    MatCardModule,
    MatSlideToggleModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonToggleModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    // MatMomentModule
    NgxMatNativeDateModule


  ],
  providers: [
   
    { provide : HTTP_INTERCEPTORS, useClass : TokenInterceptorService, multi : true },
    AuthGuardGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
