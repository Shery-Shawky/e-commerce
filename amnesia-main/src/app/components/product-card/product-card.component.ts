
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { faStar, faCartPlus, faHeart } from '@fortawesome/free-solid-svg-icons';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {
  addToCartBtn = "Add To Cart"
  ids: string[] = [];
  cartId: string[] = [];
  faStar = faStar;
  faCartPlus = faCartPlus;
  faHeart = faHeart;
  heartIcon = "#CDCDCD";
  @Input() favorites;
  @Input() objectOfInputs: {
    name: string,
    current_price: string,
    old_price: string,
    rating: string,
    image: string,
    status: string,
    _id: string;
    isFavorite: boolean;
  };

  _id: string;
  image: string;
  star;
  current_price: string;
  old_price: string;
  product_name: string;
  status: string;
  classOfStatus: string="hide"
  options = "options-disappear";
  fav = "fav-disappear";
  appear() {
    this.options = "options-appear";
    this.fav = "fav-appear";
  }
  disappear() {
    this.options = "options-disappear";
    this.fav = "fav-disappear";
  }



  changeHeartColor(id) {

    if (!localStorage.getItem('token')) {
      this.router.navigate(['login']);
      return;
    }

    if (!this.ids.includes(id)) {
      
      this.myService.addToFav(id).subscribe(
        (response) => {
          this.myService.addToHeart.next(1);
          this.ids.push(id)
          this.heartIcon = "#F65B5F";
          
        },
        (error) => {
          console.log(error);
        }
      )
    }
    else {
      this.myService.subtractToFav(id).subscribe(

        () => {
          let index = this.ids.indexOf(id);
          if (index != -1) {//if id exist in array
            this.ids.splice(index, 1);
          }
          this.myService.addToHeart.next(-1);
        },
        //handle error 
        (error) => {
          console.log(error);
        },
      )
    }

    if (!this.objectOfInputs.isFavorite) {
      this.heartIcon = "#F65B5F";
    }
  }

  /* add to cart */
  cartProducts:any = localStorage.getItem('cart') || [];
  addToCart(event, id) {
    if (!this.cartId.includes(id)) {
      this.myService.addToCart.next();
      this.cartId.push(id)
    }

    let cart: any = JSON.parse(localStorage.getItem('cart')) || [];
    let found = cart.find(product => product.productId == this.objectOfInputs._id);
    if (!found) {
      cart.push({
        productId: this.objectOfInputs._id,
        name: this.objectOfInputs.name,
        quantity: 1,
        current_price: this.objectOfInputs.current_price,
        image: this.objectOfInputs.image
      })
      localStorage.setItem('cart', JSON.stringify(cart));
      this.addToCartBtn = "Added";
    }
  }
  
  
  constructor(
    private router: Router,
    private myService: ProductsService
    ) {
    }
    
    
    ngOnInit(): void {
      /* add to cart */
    // this.heartIcon = (this.objectOfInputs.isFavorite) ? "#F65B5F" : "#CDCDCD";
    let cart: any = JSON.parse(localStorage.getItem('cart')) || [];
    let found = cart.find(product => product.productId == this.objectOfInputs._id);
    if (found) {
      this.addToCartBtn = "Added";
    }

    this.star = getRating(Number(this.objectOfInputs.rating));
    this.status = this.objectOfInputs.status;
    this.classOfStatus = (this.objectOfInputs.status != "Sale") ? "hide" : "badge badge-danger py-3 p-2 rounded-circle";
    this.old_price = this.objectOfInputs.old_price;
    this.product_name = this.objectOfInputs.name;
    // this.image = this.objectOfInputs.image;
    this.image = (this.objectOfInputs.image.length < 10)?
    "https://icons-for-free.com/iconfiles/png/512/full+products+round+icon-1320165923168064523.png":
    `https://amnesia-skincare.herokuapp.com/api/images/show/${this.objectOfInputs.image}`;
    this.current_price = this.objectOfInputs.current_price;
    this._id = this.objectOfInputs._id;
    this.heartIcon = (this.objectOfInputs.isFavorite) ? "#F65B5F" : "#CDCDCD";

  }


  ///////////////////////
  gotoProdInfo() {
    this.router.navigate(['/productInfo/' + this._id])
  }
}
function getRating(rating: number) {
  let arr = ["grey", "grey", "grey", "grey", "grey"]
  for (let i = 0; i < rating; i++) {
    arr[i] = "#FFC622";
  }
  return arr;
}