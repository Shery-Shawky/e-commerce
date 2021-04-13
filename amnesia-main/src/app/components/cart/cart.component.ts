import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';
import { shareReplay } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { UsersService } from 'src/app/services/users.service';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy {

  constructor(
    private myService: ProductsService,
    private myActivatedRoute: ActivatedRoute,
    private router: Router,
    private productsService: ProductsService,
    private userService : UsersService
    ) { }

  /*var*/
  products
  totalPrice: number = 0
  price: Array<any> = []
  subscriber
  productInfoArr: Array<any> = []
  productImgoArr: Array<any> = []
  order: Array<any> = []


  /* local storage*/
  mycart:any = localStorage.getItem('cart') || [];
  mycartObj = JSON.parse(this.mycart)

  /*set orders*/
  setProductOnCart() {
    if(this.mycartObj.length==0){
      this.router.navigate(['/cartEmpty']);
    }
    for (let i = 0; i < this.mycartObj.length; i++) {
      this.price.push(this.mycartObj[i].current_price * this.mycartObj[i].quantity)
      this.productImgoArr.push(`https://amnesia-skincare.herokuapp.com/api/images/show/${this.mycartObj[i].image}`)
      this.totalPrice += this.mycartObj[i].current_price * this.mycartObj[i].quantity
    }
  }

  /* add quantity */
  add(index) {
    this.mycartObj[index].quantity++
    this.totalPrice += this.mycartObj[index].current_price
    this.price[index] += this.mycartObj[index].current_price
    localStorage.setItem('cart', JSON.stringify(this.mycartObj))
  }

  /* minus quantity */
  minus(index) {
    if (this.mycartObj[index].quantity > 1) {
      this.mycartObj[index].quantity--
      this.totalPrice -= this.mycartObj[index].current_price
      this.price[index] -= this.mycartObj[index].current_price
      localStorage.setItem('cart', JSON.stringify(this.mycartObj))
    }
  }

  /*delete product from cart*/
  deleteProduct(index, e) {
    this.totalPrice -= this.mycartObj[index].current_price * this.mycartObj[index].quantity
    this.mycartObj.splice(index, 1)
    document.getElementsByTagName("tr")[parseInt(index) + 1].style.display = "none";
    localStorage.setItem('cart', JSON.stringify(this.mycartObj))
    this.myService.deleteProduct.next(-1)
  }

  /*onInt*/
  ngOnInit(): void {
    this.setProductOnCart()
  }
  goOrder(){
    console.log("check profile")
    this.userService.getProfile().subscribe(
      (res:any)=>{
        this.router.navigate(['cartBuy']);
      },
    (err)=>{
      console.log(err)
      this.router.navigate(['login'])
    })
  }
  /*onDestroy*/
  ngOnDestroy(): void { }
}
