import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { UsersService } from './services/users.service';
import {
  HttpClient,
  HttpClientModule,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { GMapModule } from 'primeng/gmap';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { IvyCarouselModule } from 'angular-responsive-carousel';

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
import { AppRoutingModule } from './app-routing.module';
import { from } from 'rxjs';
import { ValidationDirective } from './directives/validation.directive';
import { ValidationCorrectDirective } from './directives/validation-correct.directive';
import { ValidationErrorDirective } from './directives/validation-error.directive';
import { PasswordErrorDirective } from './directives/password-error.directive';
import { ConfirmedComponent } from './components/confirmed/confirmed.component';
import { FailComponent } from './components/fail/fail.component';
import { ResetpasswordComponent } from './components/resetpassword/resetpassword.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StarRatingComponent } from './components/star-rating/star-rating.component';
import { ProductViewComponent } from './components/product-view/product-view.component';
import { FailedComponent } from './components/failed/failed.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { OrderCompletedComponent } from './components/order-completed/order-completed.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { ContactUsService } from './services/contactus.service';
import { ConfirmedRegisterComponent } from './components/confirmed-register/confirmed-register.component';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
// import{DefaultLayoutComponent} from './components/containers/default-layout/default-layout.component'

/* imports materialui */
import { MatSliderModule } from '@angular/material/slider';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './auth.guard';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { ConfirmRegisterComponent } from './components/confirm-register/confirm-register.component';
import { FormValidationDirective } from './directives/form-validation.directive';
import { FavouriteComponent } from './components/favourite/favourite.component';
import { FavouriteEmptyComponent } from './components/favourite-empty/favourite-empty.component';
import { ErrorComponent } from './components/error/error.component';
import { ForgetPwComponent } from './components/forget-pw/forget-pw.component';
import { ConfirmEmailComponent } from './components/confirm-email/confirm-email.component';
import { PwChangedSuccessfullyComponent } from './components/pw-changed-successfully/pw-changed-successfully.component';
import { ScrollToTopComponent } from './components/scroll-to-top/scroll-to-top.component';
import { MessageSentComponent } from './components/message-sent/message-sent.component';

const materialUi = [
  MatProgressSpinnerModule,
  MatGridListModule,
  MatSliderModule,
  MatExpansionModule,
  MatSelectModule,
  MatCheckboxModule,
  MatButtonModule,
  MatIconModule,
  MatDialogModule,
  MatSnackBarModule,
  MatFormFieldModule,
];

@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    ProfileEditComponent,
    ProfileOrdersComponent,
    ProfileViewComponent,
    ProfileOrderDetailComponent,
    FooterComponent,
    CartComponent,
    CartEmptyComponent,
    CartBuyComponent,
    ValidationDirective,
    ValidationCorrectDirective,
    ValidationErrorDirective,
    PasswordErrorDirective,
    ConfirmedComponent,
    FailComponent,
    ResetpasswordComponent,
    OrderCompletedComponent,
    ProductViewComponent,
    StarRatingComponent,
    FailedComponent,
    ProductCardComponent,
    ProductsListComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    HomeComponent,
    ConfirmRegisterComponent,
    FormValidationDirective,
    ContactUsComponent,
    FavouriteComponent,
    FavouriteEmptyComponent,
    ErrorComponent,
    ForgetPwComponent,
    ConfirmEmailComponent,
    ConfirmedRegisterComponent,
    PwChangedSuccessfullyComponent,
    ScrollToTopComponent,
    MessageSentComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    GMapModule,
    CarouselModule,
    IvyCarouselModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),

    ...materialUi,
  ],
  providers: [
    UsersService,
    AuthGuard,
    AuthService,
    ContactUsService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
