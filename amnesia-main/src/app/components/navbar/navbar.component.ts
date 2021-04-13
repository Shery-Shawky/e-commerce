import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ProductsService } from 'src/app/services/products.service';
import { LoginComponent } from '../login/login.component';
import { UsersService } from '../../services/users.service';
import { Router } from '@angular/router';
// import { ProductService } from './../../services/product.service';
// import { Input } from '@material-ui/core';
import { from } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Component({
  providers: [LoginComponent],
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  constructor(
    public _authService: AuthService,
    private product: ProductsService,
    private _userService: UsersService,
    public logib: LoginComponent,
    private translate: TranslateService
  ) {
    translate.addLangs(['en', 'ar']);
    translate.setDefaultLang('en');
  }
  useLanguage(language: string) {
    this.translate.use(language);
  }
  /*var*/
  isOpen: boolean = false;
  heartCount: number = 0;
  cartCount: number = JSON.parse(localStorage.getItem('cart'))?.length || 0;
  count = JSON.parse(localStorage.getItem('cart'))?.length || 0;
  @Input() Data: any;
  subscriber: any;
  user: any = {
    firstname: '',
    lastname: '',
    profileImage: '',
  };
  profImage: string;

  /*toggle nav*/
  togglNavbar() {
    this.isOpen = !this.isOpen;
  }
  /*search*/

  search() {
    document.getElementById('search').classList.toggle('toggle');
  }

  /*active*/
  active(e) {
    // console.log(e.target);
    let links = document.getElementsByClassName('nav-link') || [];
    for (let i = 0; i < links.length; i++) {
      links[i].classList.remove('active');
    }
    e.target.classList.add('active');
  }

  /*getget*/
  getData() {
    if (localStorage.getItem('token')) {
      console.log('Getting profile info');
      this.subscriber = this._userService.getProfile().subscribe(
        (user) => {
          this.user = Object.values(user)[0];
          // console.log(user)
          // console.log(this.user.profileImage)
          this.user.profileImage =
            this.user.profileImage?.length > 10
            ? `https://amnesia-skincare.herokuapp.com/api/images/show/${this.user.profileImage}`
              : 'http://static1.squarespace.com/static/54b7b93ce4b0a3e130d5d232/54e20ebce4b014cdbc3fd71b/5a992947e2c48320418ae5e0/1519987239570/icon.png?format=1500w';
          this.profImage = this.user.profileImage;
          return this.user;
        },
        (err) => console.log(err)
      );
    }
  }
  /*oninit*/
  ngOnInit(): void {
    this.getData();
    /* addToHeart */
    this.product.addToHeart.subscribe((response) => {
      this.heartCount = this.heartCount + response;
    });
    if (localStorage.getItem('token')) {
      console.log('Getting profile info');
      this._userService.getProfile().subscribe(
        (response: any) => {
          this.heartCount = response.user?.favoriteProducts?.length ?? 0;
        },
        (err) => {
          console.log(err);
        }
      );
    }
    void this.product.addToCart.subscribe(() => {
      this.cartCount = this.cartCount + 1;
    });
    void this.product.deleteProduct.subscribe(() => {
      this.cartCount = this.cartCount - 1;
    });
    this.product.resetCart.subscribe(() => {
      this.cartCount = 0;
    });
  }
}
