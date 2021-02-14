import { OurAllProductsComponent } from './our-all-products/our-all-products.component';
import { TrendingProductsComponent } from './trending-products/trending-products.component';
import { DealOfTheDayComponent } from './deal-of-the-day/deal-of-the-day.component';
import { EditProductDetailsComponent } from './edit-product-details/edit-product-details.component';
import { EditCustomerComponent } from './edit-customer/edit-customer.component';
import { ViewCustomerComponent } from './view-customer/view-customer.component';
import { CreateCustomerComponent } from './create-customer/create-customer.component';
import { ViewAllUsersComponent } from './view-all-users/view-all-users.component';
import { ShowProductDetailsComponent } from './show-product-details/show-product-details.component';
import { AuthGuardGuard } from './../guards/auth-guard.guard';
import { LoginDialogComponent } from './login-dialog/login-dialog.component';
import { ShowAllProductsComponent } from './show-all-products/show-all-products.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddNewProductComponent } from './add-new-product/add-new-product.component';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddUserComponent } from './add-user/add-user.component';
import { AddNewCategoryComponent } from './add-new-category/add-new-category.component';
import { CategoryDetailsComponent } from './category-details/category-details.component';
import { ViewAllCustomersComponent } from './view-all-customers/view-all-customers.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { ShowAllCategoriesComponent } from './show-all-categories/show-all-categories.component';
import { ViewAllOrdersComponent } from './view-all-orders/view-all-orders.component';
import { DeliveryManagementComponent } from './delivery-management/delivery-management.component';
import { ViewOrderDetailsComponent } from './view-order-details/view-order-details.component';
import { ViewAllReviewsComponent } from './view-all-reviews/view-all-reviews.component';



const routes: Routes = [

  { path: 'login', component: LoginDialogComponent },
  { path: 'home/dashboard', component: DashboardComponent, canActivate: [] },

  // product management
  { path: 'home/product-management/add-new-product', component: AddNewProductComponent, canActivate: [] },
  { path: 'home/product-management/all-products', component: ShowAllProductsComponent, canActivate: [] },
  { path: 'home/product-management/product-detail/:id', component: ShowProductDetailsComponent, canActivate: [] },
  { path: 'home/product-management/edit-product-details/:id', component: EditProductDetailsComponent },

  // User management
  { path: 'home/user-management/add-user', component: AddUserComponent , canActivate: []},
  { path: 'home/user-management/all-users', component: ViewAllUsersComponent, canActivate: [] },
  {path: 'home/add-user', component: AddUserComponent, canActivate: []},
  {path:'userdetail',component:UserDetailsComponent, canActivate: [] },



  { path: 'home/product-management/all-products', component: ShowAllProductsComponent, canActivate : [] },
  { path: 'home/product-management/product-detail/:id', component: ShowProductDetailsComponent, canActivate : [] },
  {path: 'home/add-user', component: AddUserComponent},
{path: 'home/category-management/add-new-category', component: AddNewCategoryComponent, canActivate : []},
{path: 'home/category-management/all-categories', component: ShowAllCategoriesComponent , canActivate : [] },
{path: 'category-details', component: CategoryDetailsComponent, canActivate : []},
  // { path: '/login', redirectTo: 'login'}

 // Customer Management
  {path: 'home/customer-management/add-customer', component: CreateCustomerComponent, canActivate : [] },
  {path: 'home/customer-management/all-customers', component: ViewAllCustomersComponent, canActivate : [] },
  {path: 'home/customer-management/view-customer/:id', component: ViewCustomerComponent, canActivate : [] },

  {path: 'home/customer-management/edit-customer', component: EditCustomerComponent, canActivate : [] },
  { path: '', redirectTo: 'home/dashboard', pathMatch: 'full' },

  // page management
  { path: 'home/page-management/deal-of-the-day', component: DealOfTheDayComponent },
  { path: 'home/page-management/trending-products', component: TrendingProductsComponent },
  { path: 'home/page-management/our-all-products', component : OurAllProductsComponent },


  { path: 'home/delivery-management', component: DeliveryManagementComponent },

  // order management
  { path: 'home/order-management/view-all-orders', component: ViewAllOrdersComponent },
  { path: 'home/order-management/order-details/:orderID/:subOrderID', component: ViewOrderDetailsComponent },

  // review management
  { path: 'home/review-management/view-all-reviews', component: ViewAllReviewsComponent },
  




  // wild card route
  { path: '**', redirectTo: 'login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
