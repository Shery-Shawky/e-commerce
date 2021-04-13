import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router'
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ProfileEditComponent } from './components/profile-edit/profile-edit.component';
import { ProfileOrdersComponent } from './components/profile-orders/profile-orders.component';
import { ProfileViewComponent } from './components/profile-view/profile-view.component';
import { ProfileOrderDetailComponent } from './components/profile-order-detail/profile-order-detail.component';
import { FooterComponent } from './components/footer/footer.component';
import { CartComponent } from './components/cart/cart.component';
import { CartEmptyComponent } from './components/cart-empty/cart-empty.component';
import { CartBuyComponent } from './components/cart-buy/cart-buy.component';
import { FailComponent } from './components/fail/fail.component'
import { ResetpasswordComponent } from './components/resetpassword/resetpassword.component'
import { ProductViewComponent } from './components/product-view/product-view.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { ConfirmRegisterComponent } from './components/confirm-register/confirm-register.component';
import { AuthGuard } from './auth.guard';
import { FavouriteComponent } from './components/favourite/favourite.component';
import { FavouriteEmptyComponent } from './components/favourite-empty/favourite-empty.component';
import { ErrorComponent } from './components/error/error.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ConfirmedComponent } from './components/confirmed/confirmed.component';
import { ForgetPwComponent } from './components/forget-pw/forget-pw.component';
import { ConfirmEmailComponent } from './components/confirm-email/confirm-email.component';
import { PwChangedSuccessfullyComponent } from './components/pw-changed-successfully/pw-changed-successfully.component';
import { from } from 'rxjs';
import { ConfirmedRegisterComponent } from './components/confirmed-register/confirmed-register.component';
import { MessageSentComponent } from './components/message-sent/message-sent.component';



const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'confirmRegister', component: ConfirmRegisterComponent },
  {path:'failed', component:ErrorComponent},
  {
   path: 'profile', canActivate: [AuthGuard], component: ProfileComponent,
  },
  { path: 'profileEdit', component: ProfileEditComponent },
  { path: 'profileOrders', component: ProfileOrdersComponent },
  { path: 'profile/:id', component: ProfileOrderDetailComponent },
  { path: 'cart', component: CartComponent },
  { path: 'cartBuy', component: CartBuyComponent },
  { path: 'cartEmpty', component: CartEmptyComponent },
  { path: 'confirmed', component: ConfirmedComponent },
  { path: 'fail', component: FailComponent },
  { path: 'resetpassword/:usertoken', component: ResetpasswordComponent },
  { path: 'footer', component: FooterComponent },
  { path: 'productInfo/:_id', component: ProductViewComponent },
  { path: 'productList', component: ProductsListComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {path: 'favourite', component:FavouriteComponent},
  {path: 'favouriteEmpty', component:FavouriteEmptyComponent},
  {path: 'contactUs', component: ContactUsComponent},
  {path:'nav', component:NavbarComponent},
  {path: 'forgetPassword', component:ForgetPwComponent},
  {path: 'confirmEmail', component:ConfirmEmailComponent},
  {path: 'pwChangedSucc', component:PwChangedSuccessfullyComponent},
  {path:'a',component:AppComponent},
  {path:'confirmedRegister', component:ConfirmedRegisterComponent},
  {path:'message/sent', component:MessageSentComponent},
  {path:'**',redirectTo:'failed'},

]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
    HttpClientModule
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
