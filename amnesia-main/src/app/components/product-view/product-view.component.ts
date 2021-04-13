import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {ServiceMainService} from '../../services/service-main.service';
import { faStar, faCartPlus, faHeart } from '@fortawesome/free-solid-svg-icons';
import {Router,ActivatedRoute, ParamMap} from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';
@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.css'],
  providers:[ServiceMainService]
})
export class ProductViewComponent implements OnInit {
  faStar = faStar;
  faCartPlus = faCartPlus;
  faHeart = faHeart;
  addToFavBtn = "Add To Favorite";
  addToCartBtn = "Add To Cart";
  user:any;
  product: any={
    name:"Product 1",
    image:"",
    description:"",
    old_price:"",
    current_price:"",
    reviews:[],
    rating:3,
    status:"normal"
  };
  rate = 3;
  star = ["grey","grey","grey","grey","grey"];
  reviews =12;
  id;
  constructor(
    private service:ServiceMainService,
     private router: Router,
     private route: ActivatedRoute,
     private myService: ProductsService) { 
    this.id = this.route.snapshot.paramMap.get('_id') || "";

    this.getProductInfo()
    let token = localStorage.getItem('token') || 'empty token';
    this.service.getProfile(token).subscribe(
      (user:any)=>{
        this.user = user.user;
        let found = this.user.favoriteProducts.find((product)=>product._id == this.id);
        if(found){
          this.addToFavBtn = "Added";
        }
      },
      err=>{
        console.log(err);
      }
    )
    let cart:any = JSON.parse(localStorage.getItem('cart'))|| [];
    let found = cart.find(product=> product.productId == this.id);
    if(found){
      this.addToCartBtn = "Added";
    }
  }
  ngOnInit(): void {
  }
  
  getProductInfo(): void{
    this.service.getProductById(this.id).subscribe((product:any)=>{
      this.product=product.product;
      
      this.star =  getRating(Number(this.product.rating));
    })
  }

  addToFavorites(){
    let token = localStorage.getItem('token') || 'empty token';
    this.service.getProfile(token).subscribe(
      (user:any)=>{
        this.service.addFavorite(token,this.id).subscribe(()=>{
          this.addToFavBtn="Added";
          this.myService.addToHeart.next(1);
        })
      },
      err=>{
        this.router.navigate(['/login'])
      })
  }
  addToCart(){
    let cart:any = JSON.parse(localStorage.getItem('cart'))|| [];
    let found = cart.find(product=> product.productId == this.id);
    if(!found){
      cart.push({
        productId:this.id,
        name:this.product.name,
        quantity:1,
        current_price:this.product.current_price,
        image:this.product.image
      })
      localStorage.setItem('cart',JSON.stringify(cart));
      this.addToCartBtn="Added";
    }
  }
  postRating(rating): void{
    this.rate = rating;
    let token = localStorage.getItem('token') || 'empty token';
    this.service.getProfile(token).subscribe(
      (user:any)=>{
        console.log(rating)
        this.service.postRatingById(token,rating,this.id).subscribe((product: any)=>{
          console.log(product,rating,this.id)
          this.product=product.product;
          if(product.product.reviews.length==0){
            this.product.rating/=2;
          }
          console.log(this.product.rating)
          this.star =  getRating(Number(this.product.rating));
        },
        err=>{
          console.log(err)
        })
    },
    (err)=>{
      console.log(err);
      this.router.navigate(['']);
    })
  }
}
function getRating(rating:number) {
  let arr = ["grey","grey","grey","grey","grey"]
  for(let i = 0; i < rating; i++){
    arr[i] = "#FFC622";
  }
  return arr
}
